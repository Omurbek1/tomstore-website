"use client";

import NextImage from "next/image";
import { useMemo, useState } from "react";
import { Button, Card as AntCard, Col, Form, Input, Row, Select } from "antd";
import { useLocale, useTranslations } from "next-intl";

import Box from "@component/Box";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import { Card1 } from "@component/Card1";
import Typography, { H6, Paragraph } from "@component/Typography";
import { useRouter } from "i18n/navigation";

type CheckoutAlternativeValues = {
  address: string;
  contact: string;
  card: string;
  date: string;
  time: string;
  voucher: string;
};

const initialValues: CheckoutAlternativeValues = {
  address: "",
  contact: "",
  card: "",
  date: "",
  time: "",
  voucher: ""
};

export default function CheckoutForm2() {
  const [form] = Form.useForm<CheckoutAlternativeValues>();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("checkout.alternative");
  const [hasVoucher, setHasVoucher] = useState(false);
  const selectedAddress = Form.useWatch("address", form);
  const selectedContact = Form.useWatch("contact", form);
  const selectedCard = Form.useWatch("card", form);

  const dateList = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
      day: "2-digit",
      month: "long"
    });
    const today = new Date();
    return Array.from({ length: 10 }, (_, index) => {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + index);
      return {
        label: formatter.format(nextDate),
        value: nextDate.toISOString()
      };
    });
  }, [locale]);

  const handleFormSubmit = async (values: CheckoutAlternativeValues) => {
    console.log(values);
    router.push("/payment");
  };

  const toggleHasVoucher = () => setHasVoucher((has) => !has);

  return (
    <Form<CheckoutAlternativeValues>
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={initialValues}
      onFinish={handleFormSubmit}>
          <Card1 mb="1.5rem" borderRadius={8}>
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="primary.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                1
              </Avatar>
              <Typography fontSize="20px">{t("sections.deliveryDetails")}</Typography>
            </FlexBox>

            <Box mb="1.75rem">
              <Row gutter={[24, 0]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="date"
                    label={t("fields.deliveryDate")}
                    rules={[{ required: true, message: t("validation.required") }]}>
                    <Select options={dateList} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="time"
                    label={t("fields.deliveryTime")}
                    rules={[{ required: true, message: t("validation.required") }]}>
                    <Select options={TIME_OPTIONS.map((item) => ({ label: t(`timeSlots.${item.key}`), value: item.value }))} />
                  </Form.Item>
                </Col>
              </Row>
            </Box>

            <Typography mb="0.75rem">{t("sections.deliveryAddress")}</Typography>
            <Form.Item
              name="address"
              rules={[{ required: true, message: t("validation.required") }]}>
              <Row gutter={[24, 24]}>
                {ADDRESS_LIST.map((item) => {
                  const selected = selectedAddress === item.address;
                  return (
                    <Col md={8} sm={12} xs={24} key={item.address}>
                      <AntCard
                        hoverable
                        styles={{ body: { padding: 16 } }}
                        style={{
                          borderColor: selected ? "#E94560" : "transparent",
                          background: "#F6F9FC"
                        }}
                        onClick={() => form.setFieldValue("address", item.address)}>
                        <H6 mb="0.25rem">{t(`addressTypes.${item.addressTypeKey}`)}</H6>
                        <Paragraph color="gray.700">{item.address}</Paragraph>
                      </AntCard>
                    </Col>
                  );
                })}
              </Row>
            </Form.Item>
          </Card1>

          <Card1 mb="1.5rem" borderRadius={8}>
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="primary.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                2
              </Avatar>
              <Typography fontSize="20px">{t("sections.personalDetails")}</Typography>
            </FlexBox>

            <Typography mb="0.75rem">{t("sections.contactInformation")}</Typography>

            <Form.Item
              name="contact"
              rules={[{ required: true, message: t("validation.required") }]}>
              <Row gutter={[24, 24]}>
                {CONTACT_LIST.map((item) => {
                  const selected = selectedContact === item.contact;
                  return (
                    <Col md={8} sm={12} xs={24} key={item.contact}>
                      <AntCard
                        hoverable
                        styles={{ body: { padding: 16 } }}
                        style={{
                          borderColor: selected ? "#E94560" : "transparent",
                          background: "#F6F9FC"
                        }}
                        onClick={() => form.setFieldValue("contact", item.contact)}>
                        <H6 mb="0.25rem">{t(`contactTypes.${item.contactTypeKey}`)}</H6>
                        <Paragraph color="gray.700">{item.contact}</Paragraph>
                      </AntCard>
                    </Col>
                  );
                })}
              </Row>
            </Form.Item>
          </Card1>

          <Card1 mb="1.5rem" borderRadius={8}>
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="primary.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                3
              </Avatar>
              <Typography fontSize="20px">{t("sections.paymentDetails")}</Typography>
            </FlexBox>

            <Typography mb="0.75rem">{t("sections.savedPaymentMethods")}</Typography>

            <Form.Item
              name="card"
              rules={[{ required: true, message: t("validation.required") }]}>
              <Row gutter={[24, 24]}>
                {PAYMENT_METHOD_LIST.map((item) => {
                  const selected = selectedCard === item.last4Digits;
                  return (
                    <Col md={8} sm={12} xs={24} key={item.last4Digits}>
                      <AntCard
                        hoverable
                        styles={{ body: { padding: 16 } }}
                        style={{
                          borderColor: selected ? "#E94560" : "transparent",
                          background: "#F6F9FC"
                        }}
                        onClick={() => form.setFieldValue("card", item.last4Digits)}>
                        <Box
                          height="24px"
                          width="36px"
                          position="relative"
                          mb="0.5rem"
                        >
                          <NextImage
                            fill
                            alt="payment"
                            src={`/assets/images/payment-methods/${item.cardType}.svg`}
                          />
                        </Box>

                        <Paragraph color="gray.700">
                          **** **** **** {item.last4Digits}
                        </Paragraph>
                        <Paragraph color="gray.700">{item.name}</Paragraph>
                      </AntCard>
                    </Col>
                  );
                })}
              </Row>
            </Form.Item>

            <Button type="link" style={{ paddingLeft: 0, marginTop: 16 }} onClick={toggleHasVoucher}>
              {t("buttons.haveVoucher")}
            </Button>

            {hasVoucher && (
              <Row gutter={[16, 16]} style={{ maxWidth: 420, marginTop: 12 }}>
                <Col flex="auto">
                  <Form.Item name="voucher" style={{ marginBottom: 0 }}>
                    <Input placeholder={t("fields.voucherPlaceholder")} />
                  </Form.Item>
                </Col>
                <Col>
                  <Button type="default">{t("buttons.applyVoucher")}</Button>
                </Col>
              </Row>
            )}

            <Button
              htmlType="submit"
              type="primary"
              block
              style={{ marginTop: 24 }}>
              {t("buttons.placeOrder")}
            </Button>
          </Card1>
    </Form>
  );
}

const ADDRESS_LIST = [
  { addressTypeKey: "home", address: "435 Bristol Avenue, Abington MA 2351" },
  { addressTypeKey: "office", address: "777 Brockton Avenue, Abington MA 2351" },
  { addressTypeKey: "office2", address: "777 Kazi Avenue, Abington MA 2351" }
];

const CONTACT_LIST = [
  { contactTypeKey: "primary", contact: "+1-202-555-0119" },
  { contactTypeKey: "secondary", contact: "+1-202-555-0222" }
];

const PAYMENT_METHOD_LIST = [
  { cardType: "Amex", last4Digits: "4765", name: "Jaslynn Land" },
  { cardType: "Mastercard", last4Digits: "5432", name: "Jaslynn Land" },
  { cardType: "Visa", last4Digits: "4543", name: "Jaslynn Land" },
];

const TIME_OPTIONS = [
  { key: "morning", value: "9AM - 11AM" },
  { key: "midday", value: "11AM - 1PM" },
  { key: "afternoon", value: "3PM - 5PM" },
  { key: "evening", value: "5PM - 7PM" }
];
