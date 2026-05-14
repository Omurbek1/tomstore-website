"use client";

import dayjs, { type Dayjs } from "dayjs";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { IconCamera } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Hidden from "@component/hidden";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import User from "@models/user.model";

type ProfileFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  birth_date: Dayjs | null;
};

export default function ProfileEditForm({ user }: { user: User }) {
  const t = useTranslations("dashboard");
  const birthDate = dayjs(user.dateOfBirth);
  const initialValues: ProfileFormValues = {
    first_name: user.name.firstName || "",
    last_name: user.name.lastName || "",
    email: user.email || "",
    contact: user.phone || "",
    birth_date: birthDate.isValid() ? birthDate : null
  };

  const handleFormSubmit = async (values: ProfileFormValues) => {
    console.log({
      ...values,
      birth_date: values.birth_date?.format("YYYY-MM-DD") || ""
    });
  };

  return (
    <>
      <FlexBox alignItems="flex-end" mb="22px">
        <Avatar src="/assets/images/faces/ralph.webp" size={64} borderRadius={12} />

        <Box ml="-20px" zIndex={1}>
          <label htmlFor="profile-image">
            <Button
              size="small"
              shape="circle"
              type="primary"
              icon={<IconCamera size={16} />}
              aria-label={t("buttons.changePhoto")}
              title={t("buttons.changePhoto")}
            />
          </label>
        </Box>

        <Hidden>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-image"
            onChange={(e) => console.log(e.target.files)}
          />
        </Hidden>
      </FlexBox>

      <Form<ProfileFormValues>
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
        onFinish={handleFormSubmit}>
        <Box mb="30px">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="first_name"
                label={t("profile.firstName")}
                rules={[{ required: true, message: t("validation.required") }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="last_name"
                label={t("profile.lastName")}
                rules={[{ required: true, message: t("validation.required") }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label={t("profile.email")}
                rules={[
                  { required: true, message: t("validation.required") },
                  { type: "email", message: t("validation.invalidEmail") }
                ]}>
                <Input type="email" />
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
                name="birth_date"
                label={t("profile.birthDate")}
                rules={[{ required: true, message: t("validation.invalidDate") }]}>
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>
        </Box>

        <Button htmlType="submit" type="primary">
          {t("buttons.saveChanges")}
        </Button>
      </Form>
    </>
  );
}
