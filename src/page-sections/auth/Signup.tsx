"use client";

import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslations } from "next-intl";

import useVisibility from "./useVisibility";

import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan } from "@component/Typography";
import { Link } from "@i18n/navigation";

import Divide from "./components/Divide";
import SocialLinks from "./components/SocialLinks";
// STYLED COMPONENT
import { StyledRoot } from "./styles";

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};
type FormValues = {
  name: string;
  email: string;
  password: string;
  re_password: string;
  agreement: boolean;
};

export default function Signup() {
  const t = useTranslations("auth");
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();
  const formSchema = yup.object().shape({
    name: yup.string().required(t("validation.fullNameRequired")),
    email: yup
      .string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    password: yup.string().required(t("validation.passwordRequired")),
    re_password: yup
      .string()
      .oneOf([yup.ref("password")], t("validation.passwordsMustMatch"))
      .required(t("validation.confirmPasswordRequired")),
    agreement: yup
      .bool()
      .test("agreement", t("validation.agreementRequired"), (value) => value === true)
      .required(t("validation.agreementRequired"))
  });

  const handleFormSubmit = async (values: FormValues) => {
    console.log(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          {t("signup.title")}
        </H3>

        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          {t("signup.subtitle")}
        </H5>

        <TextField
          fullWidth
          name="name"
          mb="0.75rem"
          label={t("signup.fullNameLabel")}
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder={t("signup.fullNamePlaceholder")}
          errorText={touched.name && errors.name ? errors.name : undefined}
        />

        <TextField
          fullWidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          placeholder={t("signup.emailPlaceholder")}
          label={t("signup.emailLabel")}
          errorText={touched.email && errors.email ? errors.email : undefined}
        />

        <TextField
          fullWidth
          mb="0.75rem"
          name="password"
          label={t("signup.passwordLabel")}
          placeholder={t("signup.passwordPlaceholder")}
          onBlur={handleBlur}
          value={values.password}
          onChange={handleChange}
          errorText={touched.password && errors.password ? errors.password : undefined}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              mr="0.25rem"
              type="button"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultColor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />
        <TextField
          mb="1rem"
          fullWidth
          name="re_password"
          placeholder={t("signup.confirmPasswordPlaceholder")}
          label={t("signup.confirmPasswordLabel")}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          errorText={touched.re_password && errors.re_password ? errors.re_password : undefined}
          endAdornment={
            <IconButton
              p="0.25rem"
              size="small"
              mr="0.25rem"
              type="button"
              onClick={togglePasswordVisibility}
              color={passwordVisibility ? "gray.700" : "gray.600"}
            >
              <Icon variant="small" defaultColor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        <CheckBox
          mb="1.75rem"
          name="agreement"
          color="secondary"
          onChange={handleChange}
          checked={values.agreement}
          label={
            <FlexBox>
              <SemiSpan>{t("signup.agreementPrefix")}</SemiSpan>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  {t("signup.agreementLink")}
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {t("signup.submit")}
        </Button>

        <Divide />

        <SocialLinks />
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>{t("signup.alreadyHaveAccount")}</SemiSpan>
        <Link href="/login">
          <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
            {t("signup.login")}
          </H6>
        </Link>
      </FlexBox>
    </StyledRoot>
  );
}
