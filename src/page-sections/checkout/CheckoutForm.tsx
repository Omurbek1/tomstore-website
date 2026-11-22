"use client";

import { useState } from "react";
import { Alert, Button, Form, Input, Radio, Result, Select } from "antd";
import { useTranslations } from "next-intl";

import { Card1 } from "@component/Card1";
import Typography from "@component/Typography";
import { Link } from "@i18n/navigation";
import { useBranch } from "@context/BranchContext";
import { useCartItems, useCartTotal, useClearCart } from "@hook/useCart";
import useCurrency from "@hook/useCurrency";
import { useStoreWhatsAppPhone } from "@hook/useStoreWhatsAppPhone";
import { StorefrontRequestError, submitStorefrontRequest } from "@utils/__api__/storefront";
import { formatKgPhone, isValidKgPhone, toKgE164 } from "@utils/phoneKg";
import { buildCartWhatsAppOrderUrl } from "@utils/whatsappOrder";

type CheckoutValues = {
  name: string;
  phone: string;
  comment: string;
  deliveryType: "pickup" | "delivery";
  address: string;
  /** Ловушка для ботов: скрыто от людей, должно остаться пустым. */
  website: string;
};

const initialValues: CheckoutValues = {
  name: "",
  phone: "",
  comment: "",
  deliveryType: "pickup",
  address: "",
  website: "",
};

const newIdempotencyKey = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

const shortNumber = (id: string) => id.replace(/-/g, "").slice(0, 8).toUpperCase();

export default function CheckoutForm() {
  const [form] = Form.useForm<CheckoutValues>();
  const t = useTranslations("checkout.order");
  const cart = useCartItems();
  const cartTotal = useCartTotal();
  const clearCart = useClearCart();
  const formatCurrency = useCurrency();
  const whatsappPhone = useStoreWhatsAppPhone();
  const { activeBranch, branches, locked, selectBranch } = useBranch();
  const deliveryType = Form.useWatch("deliveryType", form) ?? "pickup";
  const comment = Form.useWatch("comment", form) ?? "";

  // Один ключ на попытку оформления: повтор после сбоя/двойной клик — тот же заказ.
  const [idempotencyKey, setIdempotencyKey] = useState(newIdempotencyKey);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ number: string } | null>(null);

  const canPickStore = branches.length > 1 && !locked;
  const whatsappOrderHref = buildCartWhatsAppOrderUrl({
    items: cart,
    totalLabel: formatCurrency(cartTotal),
    comment,
    branchName: branches.length > 1 ? activeBranch?.name : undefined,
    phone: whatsappPhone,
  });

  const handleSubmit = async (values: CheckoutValues) => {
    if (submitting || !cart.length) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitStorefrontRequest(
        {
          type: "order",
          items: cart.map((item) => ({
            productId: item.productId || String(item.id),
            variantId: item.variantId ?? null,
            qty: item.qty,
          })),
          branchId: activeBranch?.id,
          name: values.name.trim(),
          phone: toKgE164(values.phone),
          comment: values.comment.trim(),
          deliveryType: values.deliveryType,
          address: values.deliveryType === "delivery" ? values.address.trim() : "",
          source: "website",
          website: values.website || "",
        },
        { idempotencyKey },
      );
      clearCart();
      setDone({ number: result.requestId ? shortNumber(result.requestId) : "" });
      setIdempotencyKey(newIdempotencyKey());
    } catch (e) {
      const status = e instanceof StorefrontRequestError ? e.status : 0;
      if (status === 429) setError(t("errors.tooMany"));
      else if (status === 404) setError(t("errors.unavailable"));
      else if (status === 409) setError(t("errors.busy"));
      else if (status === 400 && e instanceof Error && e.message) setError(e.message);
      else setError(t("errors.generic"));
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <Card1>
        <Result
          status="success"
          title={t("successTitle")}
          subTitle={
            <>
              {done.number ? <div>{t("successNumber", { number: done.number })}</div> : null}
              <div>{t("successText")}</div>
            </>
          }
          extra={
            <Link href="/">
              <Button type="primary">{t("continueShopping")}</Button>
            </Link>
          }
        />
      </Card1>
    );
  }

  if (!cart.length) {
    return (
      <Card1>
        <Typography mb="1rem">{t("emptyCart")}</Typography>
        <Link href="/">
          <Button type="primary">{t("continueShopping")}</Button>
        </Link>
      </Card1>
    );
  }

  return (
    <Form<CheckoutValues>
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
      requiredMark={false}>
      <Card1 mb="2rem">
        <Typography fontWeight="600" mb="1rem">
          {t("contacts")}
        </Typography>

        <Form.Item
          name="name"
          label={t("name")}
          rules={[{ required: true, whitespace: true, message: t("errors.required") }]}>
          <Input placeholder={t("namePlaceholder")} autoComplete="name" maxLength={100} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t("phone")}
          getValueFromEvent={(event: React.ChangeEvent<HTMLInputElement>) =>
            formatKgPhone(event.target.value)
          }
          rules={[
            { required: true, message: t("errors.required") },
            {
              validator: (_rule, value: string) =>
                !value || isValidKgPhone(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("errors.phone"))),
            },
          ]}>
          <Input placeholder="+996 555 123 456" inputMode="tel" autoComplete="tel" />
        </Form.Item>

        {/* Ловушка для ботов: вне экрана, без фокуса и автозаполнения. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <Form.Item name="website" noStyle>
            <Input tabIndex={-1} autoComplete="off" />
          </Form.Item>
        </div>

        <Form.Item name="comment" label={t("comment")}>
          <Input.TextArea rows={3} placeholder={t("commentPlaceholder")} maxLength={1000} />
        </Form.Item>
      </Card1>

      <Card1 mb="2rem">
        <Typography fontWeight="600" mb="1rem">
          {t("receive")}
        </Typography>

        <Form.Item name="deliveryType">
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={[
              { label: t("pickup"), value: "pickup" },
              { label: t("delivery"), value: "delivery" },
            ]}
          />
        </Form.Item>

        {canPickStore ? (
          <Form.Item label={t("store")}>
            <Select
              value={activeBranch?.id}
              onChange={(id: string) => selectBranch(id)}
              options={branches.map((branch) => ({ label: branch.name, value: branch.id }))}
            />
          </Form.Item>
        ) : activeBranch ? (
          <Typography fontWeight="600" mb="0.25rem">
            {activeBranch.name}
          </Typography>
        ) : null}

        {deliveryType === "pickup" && activeBranch?.address ? (
          <Typography color="text.muted" mb="1rem">
            {t("storeAddress", { address: activeBranch.address })}
          </Typography>
        ) : null}

        {deliveryType === "delivery" ? (
          <Form.Item
            name="address"
            label={t("address")}
            rules={[{ required: true, whitespace: true, message: t("errors.address") }]}>
            <Input placeholder={t("addressPlaceholder")} autoComplete="street-address" maxLength={300} />
          </Form.Item>
        ) : null}

        <Typography fontSize="13px" color="text.muted">
          {activeBranch && branches.length > 1
            ? t("pricesNote", { store: activeBranch.name })
            : t("confirmNote")}
        </Typography>
      </Card1>

      {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} /> : null}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Button type="primary" htmlType="submit" size="large" loading={submitting} style={{ flex: "1 1 220px" }}>
          {t("submit")} · {formatCurrency(cartTotal)}
        </Button>
        <Button
          size="large"
          href={whatsappOrderHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: "1 1 220px" }}>
          {t("orWhatsApp")}
        </Button>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link href="/cart">{t("backToCart")}</Link>
      </div>
    </Form>
  );
}
