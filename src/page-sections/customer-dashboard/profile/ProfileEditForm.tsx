"use client";

import * as yup from "yup";
import { Formik } from "formik";
import { format } from "date-fns/format";
import { IconCamera } from "@tabler/icons-react";

import Box from "@component/Box";
import Hidden from "@component/hidden";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import User from "@models/user.model";

const VALIDATION_SCHEMA = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().required("required"),
  birth_date: yup.date().required("invalid date")
});

export default function ProfileEditForm({ user }: { user: User }) {
  const INITIAL_VALUES = {
    first_name: user.name.firstName || "",
    last_name: user.name.lastName || "",
    email: user.email || "",
    contact: user.phone || "",
    birth_date: format(new Date(user.dateOfBirth), "yyyy-MM-dd") || ""
  };

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    console.log(values);
  };

  return (
    <>
      <FlexBox alignItems="flex-end" mb="22px">
        <Avatar src="/assets/images/faces/ralph.png" size={64} borderRadius={12} />

        <Box ml="-20px" zIndex={1}>
          <label htmlFor="profile-image">
            <Button p="6px" as="span" size="small" height="auto" color="primary" borderRadius="50%">
              <IconCamera size={18} />
            </Button>
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

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box mb="30px">
              <Grid container horizontal_spacing={6} vertical_spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="first_name"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    errorText={touched.first_name && errors.first_name}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    errorText={touched.last_name && errors.last_name}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    errorText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="contact"
                    onBlur={handleBlur}
                    value={values.contact}
                    onChange={handleChange}
                    errorText={touched.contact && errors.contact}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    name="birth_date"
                    label="Birth Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.birth_date}
                    errorText={touched.birth_date && errors.birth_date}
                  />
                </Grid>
              </Grid>
            </Box>

            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}
