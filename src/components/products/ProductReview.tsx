import * as yup from "yup";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import { H2, H5 } from "@component/Typography";
import ProductComment from "./ProductComment";
type FormValues = { rating: number; comment: string; date: string };

export default function ProductReview() {
  const t = useTranslations("product");
  const initialValues: FormValues = {
    rating: 5,
    comment: "",
    date: new Date().toISOString()
  };
  const validationSchema = yup.object().shape({
    rating: yup.number().required(t("validation.ratingRequired")),
    comment: yup.string().required(t("validation.commentRequired")),
    date: yup.string().required(t("validation.dateRequired"))
  });

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: FormValues) => {
      console.log(values);
      // resetForm();
    }
  });

  return (
    <div>
      {commentList.map((item, ind) => (
        <ProductComment {...item} key={ind} />
      ))}

      <H2 fontWeight="600" mt="55px" mb="20">
        {t("writeReview")}
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb="20px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              {t("yourRating")}
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            outof={5}
            color="warn"
            size="medium"
            readOnly={false}
            value={values.rating || 0}
            onChange={(value) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb="24px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              {t("yourReview")}
            </H5>

            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextArea
            fullWidth
            rows={8}
            name="comment"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.comment || ""}
            placeholder={t("reviewPlaceholder")}
            errorText={touched.comment ? errors.comment : undefined}
          />
        </Box>

        <Button
          size="small"
          type="submit"
          color="primary"
          variant="contained"
          disabled={!(dirty && isValid)}>
          {t("submitReview")}
        </Button>
      </form>
    </div>
  );
}

const commentList = [
  {
    name: "Jannie Schumm",
    imgUrl: "",
    rating: 4.7,
    date: "2021-02-14",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
  },
  {
    name: "Joe Kenan",
    imgUrl: "",
    rating: 4.7,
    date: "2019-08-10",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
  },
  {
    name: "Jenifer Tulio",
    imgUrl: "",
    rating: 4.7,
    date: "2021-02-05",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
  }
];
