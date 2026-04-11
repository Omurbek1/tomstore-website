"use client";

import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { useTranslations } from "next-intl";

import { Card1 } from "@component/Card1";
import countryList from "@data/countryList";
import Typography from "@component/Typography";
import { useRouter } from "i18n/navigation";

type CheckoutFormValues = {
  shipping_name: string;
  shipping_email: string;
  shipping_contact: string;
  shipping_company: string;
  shipping_zip: string;
  shipping_country: string;
  shipping_address1: string;
  shipping_address2: string;
  billing_name: string;
  billing_email: string;
  billing_contact: string;
  billing_company: string;
  billing_zip: string;
  billing_country: string;
  billing_address1: string;
  billing_address2: string;
  same_as_shipping: boolean;
};

const COUNTRY_OPTIONS = countryList.map((item) => ({ label: item.label, value: item.value }));

const initialValues: CheckoutFormValues = {
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_zip: "",
  shipping_country: "US",
  shipping_address1: "",
  shipping_address2: "",

  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "US",
  billing_address1: "",
  billing_address2: "",
  same_as_shipping: false
};

export default function CheckoutForm() {
  const [form] = Form.useForm<CheckoutFormValues>();
  const router = useRouter();
  const t = useTranslations("checkout.form");
  const sameAsShipping = Form.useWatch("same_as_shipping", form) ?? false;

  const handleFormSubmit = async (values: CheckoutFormValues) => {
    const normalizedValues = values.same_as_shipping
      ? {
          ...values,
          billing_name: values.shipping_name,
          billing_email: values.shipping_email,
          billing_contact: values.shipping_contact,
          billing_company: values.shipping_company,
          billing_zip: values.shipping_zip,
          billing_country: values.shipping_country,
          billing_address1: values.shipping_address1,
          billing_address2: values.shipping_address2
        }
      : values;

    console.log(normalizedValues);
    router.push("/payment");
  };

  const renderAddressFields = (prefix: "shipping" | "billing") => (
    <Row gutter={[24, 0]}>
      <Col xs={24} sm={12}>
        <Form.Item
          name={`${prefix}_name`}
          label={t("fullName")}
          rules={[{ required: true, message: t("validation.required") }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name={`${prefix}_contact`}
          label={t("phoneNumber")}
          rules={[{ required: true, message: t("validation.required") }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name={`${prefix}_zip`}
          label={t("zipCode")}
          rules={[{ required: true, message: t("validation.required") }]}>
          <Input inputMode="numeric" />
        </Form.Item>

        <Form.Item
          name={`${prefix}_address1`}
          label={t("address1")}
          rules={[{ required: true, message: t("validation.required") }]}>
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12}>
        <Form.Item
          name={`${prefix}_email`}
          label={t("emailAddress")}
          rules={[
            { required: true, message: t("validation.required") },
            { type: "email", message: t("validation.invalidEmail") }
          ]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item name={`${prefix}_company`} label={t("company")}>
          <Input />
        </Form.Item>

        <Form.Item
          name={`${prefix}_country`}
          label={t("country")}
          rules={[{ required: true, message: t("validation.required") }]}>
          <Select
            showSearch
            options={COUNTRY_OPTIONS}
            optionFilterProp="label"
            placeholder={t("country")}
          />
        </Form.Item>

        <Form.Item name={`${prefix}_address2`} label={t("address2")}>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );

  return (
    <Form<CheckoutFormValues>
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={initialValues}
      onFinish={handleFormSubmit}>
      <Card1 mb="2rem">
        <Typography fontWeight="600" mb="1rem">
          {t("shippingAddress")}
        </Typography>

        {renderAddressFields("shipping")}
      </Card1>

      <Card1 mb="2rem">
        <Typography fontWeight="600" mb="1rem">
          {t("billingAddress")}
        </Typography>

        <Form.Item name="same_as_shipping" valuePropName="checked" style={{ marginBottom: 16 }}>
          <Checkbox>{t("sameAsShipping")}</Checkbox>
        </Form.Item>

        {!sameAsShipping && renderAddressFields("billing")}
      </Card1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Button block onClick={() => router.push("/cart")}>
            {t("backToCart")}
          </Button>
        </Col>

        <Col xs={24} sm={12}>
          <Button htmlType="submit" type="primary" block>
            {t("proceedToPayment")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
