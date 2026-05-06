"use client";

import { Button, Col, Divider, Form, Input, Radio, Row } from "antd";
import { Fragment } from "react";
import { useTranslations } from "next-intl";

import { Card1 } from "@component/Card1";
import Typography from "@component/Typography";
import { useRouter } from "@i18n/navigation";

type PaymentFormValues = {
  payment_method: "credit-card" | "paypal" | "cod";
  card_no: string;
  name: string;
  exp_date: string;
  cvc: string;
  paypal_email: string;
};

const initialValues: PaymentFormValues = {
  payment_method: "credit-card",
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
  paypal_email: ""
};

export default function PaymentForm() {
  const [form] = Form.useForm<PaymentFormValues>();
  const router = useRouter();
  const t = useTranslations("checkout.paymentForm");
  const paymentMethod = Form.useWatch("payment_method", form) ?? "credit-card";

  const handleFormSubmit = async (values: PaymentFormValues) => {
    console.log(values);
    router.push("/orders");
  };

  return (
    <Fragment>
      <Form<PaymentFormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
        onFinish={handleFormSubmit}>
        <Card1 mb="2rem">
          <Form.Item name="payment_method" style={{ marginBottom: 0 }}>
            <Radio.Group style={{ width: "100%" }}>
              <div>
                <Radio value="credit-card">
                  <Typography ml="6px" fontWeight="600" fontSize="18px">
                    {t("methods.creditCard")}
                  </Typography>
                </Radio>
              </div>

              <Divider style={{ margin: "20px -32px" }} />

              {paymentMethod === "credit-card" && (
                <Row gutter={[24, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="card_no"
                      label={t("fields.cardNumber")}
                      rules={[{ required: true, message: t("validation.required") }]}>
                      <Input placeholder={t("fields.cardNumber")} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="exp_date"
                      label={t("fields.expDate")}
                      rules={[{ required: true, message: t("validation.required") }]}>
                      <Input placeholder="MM/YY" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label={t("fields.nameOnCard")}
                      rules={[{ required: true, message: t("validation.required") }]}>
                      <Input placeholder={t("fields.nameOnCard")} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="cvc"
                      label={t("fields.cvc")}
                      rules={[{ required: true, message: t("validation.required") }]}>
                      <Input placeholder="CVC" />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              <Divider style={{ margin: "20px -32px" }} />

              <div>
                <Radio value="paypal">
                  <Typography ml="6px" fontWeight="600" fontSize="18px">
                    {t("methods.paypal")}
                  </Typography>
                </Radio>
              </div>

              {paymentMethod === "paypal" && (
                <Fragment>
                  <Divider style={{ margin: "20px -32px" }} />
                  <Form.Item
                    name="paypal_email"
                    label={t("fields.paypalEmail")}
                    rules={[
                      { required: true, message: t("validation.required") },
                      { type: "email", message: t("validation.invalidEmail") }
                    ]}>
                    <Input type="email" placeholder={t("fields.paypalEmail")} />
                  </Form.Item>
                </Fragment>
              )}

              <Divider style={{ margin: "20px -32px" }} />

              <div>
                <Radio value="cod">
                  <Typography ml="6px" fontWeight="600" fontSize="18px">
                    {t("methods.cod")}
                  </Typography>
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>
        </Card1>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Button block onClick={() => router.push("/checkout")}>
              {t("buttons.backToCheckout")}
            </Button>
          </Col>

          <Col xs={24} sm={12}>
            <Button htmlType="submit" type="primary" block>
              {t("buttons.review")}
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
}
