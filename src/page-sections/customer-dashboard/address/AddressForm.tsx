"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import countryList from "@data/countryList";
import Address from "@models/address.model";

const COUNTRY_OPTIONS = countryList.map((item) => ({ label: item.label, value: item.label }));

type FormValues = {
  name: string;
  street: string;
  city: string;
  country: string;
  contact: string;
};

// ===========================================================
type AddressFormProps = { address?: Address };
// ===========================================================

export default function AddressForm({ address }: AddressFormProps) {
  const t = useTranslations("dashboard");
  const initialValues: FormValues = {
    name: address?.title || "",
    contact: address?.phone || "",
    city: address?.city || "",
    street: address?.street || "",
    country: address?.country || ""
  };

  const handleFormSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form<FormValues>
      layout="vertical"
      requiredMark={false}
      initialValues={initialValues}
      onFinish={handleFormSubmit}>
      <Box mb="30px">
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label={t("forms.addressTitle")}
              rules={[{ required: true, message: t("validation.required") }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="contact"
              label={t("profile.phone")}
              rules={[{ required: true, message: t("validation.required") }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="street"
              label={t("forms.street")}
              rules={[{ required: true, message: t("validation.required") }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="city"
              label={t("forms.city")}
              rules={[{ required: true, message: t("validation.required") }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="country"
              label={t("forms.country")}
              rules={[{ required: true, message: t("validation.required") }]}>
              <Select
                showSearch
                options={COUNTRY_OPTIONS}
                optionFilterProp="label"
                placeholder={t("forms.country")}
              />
            </Form.Item>
          </Col>
        </Row>
      </Box>

      <Button htmlType="submit" type="primary">
        {t("buttons.saveChanges")}
      </Button>
    </Form>
  );
}
