"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import * as yup from "yup";
import { Formik } from "formik";

import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import CheckBox from "@component/CheckBox";
import countryList from "@data/countryList";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { Link, useRouter } from "i18n/navigation";

const initialValues = {
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",

  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: ""
};

const checkoutSchema = yup.object({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default function CheckoutForm() {
  const router = useRouter();
  const t = useTranslations("checkout.form");
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleFormSubmit = async (values: typeof initialValues) => {
    console.log(values);
    router.push("/payment");
  };

  const handleCheckboxChange =
    (values: typeof initialValues, setFieldValue: any) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setSameAsShipping(checked);
      setFieldValue("same_as_shipping", checked);
      setFieldValue("billing_name", checked ? values.shipping_name : "");
    };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              {t("shippingAddress")}
            </Typography>

            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  mb="1rem"
                  label={t("fullName")}
                  name="shipping_name"
                  placeholder={t("fullName")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_name}
                  errorText={touched.shipping_name && errors.shipping_name ? errors.shipping_name : undefined}
                />

                <TextField
                  fullWidth
                  mb="1rem"
                  label={t("phoneNumber")}
                  placeholder={t("phoneNumber")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_contact"
                  value={values.shipping_contact}
                  errorText={touched.shipping_contact && errors.shipping_contact ? errors.shipping_contact : undefined}
                />

                <TextField
                  fullWidth
                  mb="1rem"
                  type="number"
                  label={t("zipCode")}
                  placeholder={t("zipCode")}
                  onBlur={handleBlur}
                  name="shipping_zip"
                  onChange={handleChange}
                  value={values.shipping_zip}
                  errorText={touched.shipping_zip && errors.shipping_zip ? errors.shipping_zip : undefined}
                />

                <TextField
                  fullWidth
                  label={t("address1")}
                  placeholder={t("address1")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address1"
                  value={values.shipping_address1}
                  errorText={touched.shipping_address1 && errors.shipping_address1 ? errors.shipping_address1 : undefined}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  mb="1rem"
                  type="email"
                  placeholder={t("emailAddress")}
                  onBlur={handleBlur}
                  label={t("emailAddress")}
                  name="shipping_email"
                  onChange={handleChange}
                  value={values.shipping_email}
                  errorText={touched.shipping_email && errors.shipping_email ? errors.shipping_email : undefined}
                />

                <TextField
                  fullWidth
                  mb="1rem"
                  label={t("company")}
                  placeholder={t("company")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_company"
                  value={values.shipping_company}
                  errorText={touched.shipping_company && errors.shipping_company ? errors.shipping_company : undefined}
                />

                <Select
                  mb="1rem"
                  label={t("country")}
                  options={countryList}
                  value={values.shipping_country || "US"}
                  errorText={touched.shipping_country && errors.shipping_country ? errors.shipping_country : undefined}
                  onChange={(country) => setFieldValue("shipping_country", country)}
                />

                <TextField
                  fullWidth
                  label={t("address2")}
                  placeholder={t("address2")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address2"
                  value={values.shipping_address2}
                  errorText={touched.shipping_address2 && errors.shipping_address2 ? errors.shipping_address2 : undefined}
                />
              </Grid>
            </Grid>
          </Card1>

          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              {t("billingAddress")}
            </Typography>

            <CheckBox
              color="secondary"
              label={t("sameAsShipping")}
              mb={sameAsShipping ? "" : "1rem"}
              onChange={handleCheckboxChange(values, setFieldValue)}
            />

            {!sameAsShipping && (
              <Grid container spacing={7}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    mb="1rem"
                    label={t("fullName")}
                    placeholder={t("fullName")}
                    name="billing_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_name}
                    errorText={touched.billing_name && errors.billing_name ? errors.billing_name : undefined}
                  />

                  <TextField
                    fullWidth
                    mb="1rem"
                    label={t("phoneNumber")}
                    placeholder={t("phoneNumber")}
                    onBlur={handleBlur}
                    name="billing_contact"
                    onChange={handleChange}
                    value={values.billing_contact}
                    errorText={touched.billing_contact && errors.billing_contact ? errors.billing_contact : undefined}
                  />

                  <TextField
                    fullWidth
                    mb="1rem"
                    type="number"
                    label={t("zipCode")}
                    placeholder={t("zipCode")}
                    name="billing_zip"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_zip}
                    errorText={touched.billing_zip && errors.billing_zip ? errors.billing_zip : undefined}
                  />

                  <TextField
                    fullWidth
                    label={t("address1")}
                    placeholder={t("address1")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="billing_address1"
                    value={values.billing_address1}
                    errorText={touched.billing_address1 && errors.billing_address1 ? errors.billing_address1 : undefined}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    mb="1rem"
                    type="email"
                    placeholder={t("emailAddress")}
                    onBlur={handleBlur}
                    name="billing_email"
                    label={t("emailAddress")}
                    onChange={handleChange}
                    value={values.billing_email}
                    errorText={touched.billing_email && errors.billing_email ? errors.billing_email : undefined}
                  />

                  <TextField
                    fullWidth
                    mb="1rem"
                    label={t("company")}
                    placeholder={t("company")}
                    onBlur={handleBlur}
                    name="billing_company"
                    onChange={handleChange}
                    value={values.billing_company}
                    errorText={touched.billing_company && errors.billing_company ? errors.billing_company : undefined}
                  />

                  <Select
                    mb="1rem"
                    label={t("country")}
                    options={countryList}
                    value={values.billing_country || "US"}
                    errorText={touched.billing_country && errors.billing_country ? errors.billing_country : undefined}
                    onChange={(country) => setFieldValue("billing_country", country)}
                  />

                  <TextField
                    fullWidth
                    label={t("address2")}
                    placeholder={t("address2")}
                    onBlur={handleBlur}
                    name="billing_address2"
                    onChange={handleChange}
                    value={values.billing_address2}
                    errorText={touched.billing_address2 && errors.billing_address2 ? errors.billing_address2 : undefined}
                  />
                </Grid>
              </Grid>
            )}
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button variant="outlined" color="primary" type="button" fullWidth>
                  {t("backToCart")}
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {t("proceedToPayment")}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
