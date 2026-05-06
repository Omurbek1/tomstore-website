"use client";

import styled from "styled-components";
import * as yup from "yup";
import { FieldArray, Formik, FormikHelpers, getIn } from "formik";
import { useRouter } from "next/navigation";
import {
  IconCopy,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

import axios from "@lib/axios";
import Box from "@component/Box";
import Card from "@component/Card";
import Image from "@component/Image";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import DropZone from "@component/DropZone";
import TextArea from "@component/textarea";
import CheckBox from "@component/CheckBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import { H4, H5, H6, Paragraph, SemiSpan } from "@component/Typography";

import Product, { ProductVariant } from "@models/product.model";

type SelectOption = { label: string; value: string };

type VariantFormValue = {
  id: string;
  title: string;
  cpu: string;
  ram: string;
  storage: string;
  color: string;
  price: string;
  oldPrice: string;
  warehouse: string;
  stock: string;
  inStock: boolean;
  description: string;
  imagesText: string;
};

type ProductFormValues = {
  name: string;
  brand: string;
  slug: string;
  category: SelectOption[];
  tags: string;
  price: string;
  oldPrice: string;
  stock: string;
  description: string;
  imagesText: string;
  variants: VariantFormValue[];
};

interface Props {
  product?: Product;
  categories: SelectOption[];
}

const validationSchema = yup.object().shape({
  name: yup.string().trim().required("Название обязательно"),
  category: yup.array().min(1, "Выберите категорию"),
  description: yup.string().trim().required("Описание обязательно"),
  imagesText: yup.string(),
  variants: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().trim().required("Название варианта обязательно"),
        cpu: yup.string().trim().required("Процессор обязателен"),
        ram: yup
          .number()
          .typeError("Укажите число")
          .positive("Укажите значение больше 0")
          .required("RAM обязательна"),
        storage: yup.string().trim().required("Накопитель обязателен"),
        color: yup.string().trim().required("Цвет обязателен"),
        price: yup
          .number()
          .typeError("Укажите цену")
          .positive("Цена должна быть больше 0")
          .required("Цена обязательна"),
      }),
    )
    .min(1, "Добавьте хотя бы один вариант"),
});

export default function ProductUpdateForm({ product, categories }: Props) {
  const router = useRouter();

  const initialValues: ProductFormValues = {
    name: product?.name || product?.title || "",
    brand: product?.brand || "TOMSTORE",
    slug: product?.slug || "",
    category: getInitialCategories(product, categories),
    tags: product?.labels?.join(", ") || "",
    price: toInputValue(product?.price),
    oldPrice: toInputValue(product?.oldPrice),
    stock: product?.isInStock === false ? "0" : "1",
    description: product?.description || product?.fullDescription || "",
    imagesText: (product?.images || []).join("\n"),
    variants: product?.variants?.length
      ? product.variants.map(toVariantFormValue)
      : [createEmptyVariant(product?.title || "")],
  };

  const handleFormSubmit = async (
    values: ProductFormValues,
    helpers: FormikHelpers<ProductFormValues>,
  ) => {
    const variants = values.variants.map(toProductVariantPayload);
    const primaryVariant = variants.find((variant) => variant.inStock) || variants[0];
    const productSlug = values.slug.trim() || toSlug(values.name);
    const images = splitLines(values.imagesText);
    const payload = {
      id: product?.id,
      title: values.name.trim(),
      name: values.name.trim(),
      brand: values.brand.trim(),
      slug: productSlug,
      description: values.description.trim(),
      fullDescription: values.description.trim(),
      category: values.category.map((item) => item.value),
      categories: values.category.map((item) => item.value),
      tags: splitCommaList(values.tags),
      labels: splitCommaList(values.tags),
      images,
      thumbnail: images[0] || primaryVariant?.images[0],
      price: primaryVariant?.price || toNumber(values.price),
      oldPrice: primaryVariant?.oldPrice || toOptionalNumber(values.oldPrice),
      stock: primaryVariant?.inStock ? toNumber(values.stock) || 1 : 0,
      isInStock: Boolean(primaryVariant?.inStock),
      availabilityLabel: primaryVariant?.inStock ? "В наличии" : "Нет в наличии",
      rating: product?.rating || 4,
      discount: product?.discount || 0,
      published: true,
      variants,
    };

    try {
      helpers.setStatus(undefined);

      if (product?.id) {
        await axios.put("/api/products", payload);
      } else {
        await axios.post("/api/products", payload);
      }

      router.push("/vendor/products");
    } catch (error) {
      console.error(error);
      helpers.setStatus("Не удалось сохранить товар. Проверьте данные и попробуйте снова.");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        status,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <FormStack>
            <Card p="30px" borderRadius={16}>
              <SectionHeader>
                <div>
                  <H4>Основная информация</H4>
                  <Paragraph color="text.muted">
                    Эти данные видны в каталоге и карточке товара.
                  </Paragraph>
                </div>
              </SectionHeader>

              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Название товара"
                    placeholder="Например: Lenovo IdeaPad 15"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      if (!values.slug) {
                        setFieldValue("slug", toSlug(event.target.value));
                      }
                    }}
                    errorText={fieldError(touched, errors, "name")}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="brand"
                    label="Бренд"
                    placeholder="TOMSTORE"
                    value={values.brand}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="slug"
                    label="Slug"
                    placeholder="lenovo-ideapad-15"
                    value={values.slug}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Select
                    isMulti
                    label="Категории"
                    value={values.category}
                    options={categories}
                    placeholder="Выберите категории"
                    onChange={(value) => setFieldValue("category", value || [])}
                    errorText={fieldError(touched, errors, "category")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextArea
                    rows={5}
                    fullWidth
                    name="description"
                    label="Описание"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Коротко опишите товар, состояние, гарантию и комплектацию"
                    value={values.description}
                    errorText={fieldError(touched, errors, "description")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <DropZone onChange={(files) => console.log(files)} />

                  <TextArea
                    mt="16px"
                    rows={4}
                    fullWidth
                    name="imagesText"
                    label="Изображения товара"
                    placeholder="Вставьте URL изображений, каждый с новой строки"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.imagesText}
                  />

                  <ImagePreviewList>
                    {splitLines(values.imagesText).map((item) => (
                      <UploadImageBox key={item}>
                        <Image src={item} width="100%" />
                      </UploadImageBox>
                    ))}
                  </ImagePreviewList>
                </Grid>

                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    name="price"
                    type="number"
                    label="Базовая цена"
                    placeholder="Авто из первого варианта"
                    value={values.price}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="oldPrice"
                    label="Старая / справочная цена"
                    placeholder="Необязательно"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.oldPrice}
                  />
                </Grid>

                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    name="tags"
                    label="Теги"
                    placeholder="hit, sale, new"
                    value={values.tags}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Card>

            <Card p="30px" borderRadius={16}>
              <FieldArray name="variants">
                {({ push, remove }) => (
                  <>
                    <SectionHeader>
                      <div>
                        <H4>Варианты покупки</H4>
                        <Paragraph color="text.muted">
                          Добавьте конфигурации: процессор, память, накопитель, цвет, цену и склад.
                        </Paragraph>
                      </div>

                      <Button
                        type="button"
                        color="primary"
                        size="large"
                        onClick={() => push(createEmptyVariant(values.name))}>
                        <IconPlus size={18} />
                        <span>Добавить вариант</span>
                      </Button>
                    </SectionHeader>

                    <VariantList>
                      {values.variants.map((variant, index) => (
                        <VariantCard key={variant.id}>
                          <VariantCardHeader>
                            <div>
                              <H5>Вариант {index + 1}</H5>
                              <SemiSpan>{variant.title || "Новая конфигурация"}</SemiSpan>
                            </div>

                            <FlexBox style={{ gap: 8 }}>
                              <Button
                                type="button"
                                variant="outlined"
                                color="primary"
                                onClick={() =>
                                  push({
                                    ...variant,
                                    id: createVariantId(),
                                    title: `${variant.title || values.name} copy`,
                                  })
                                }>
                                <IconCopy size={16} />
                              </Button>

                              <Button
                                type="button"
                                variant="outlined"
                                color="error"
                                disabled={values.variants.length === 1}
                                onClick={() => remove(index)}>
                                <IconTrash size={16} />
                              </Button>
                            </FlexBox>
                          </VariantCardHeader>

                          <Grid container spacing={6}>
                            <Grid item sm={6} xs={12}>
                              <TextField
                                fullWidth
                                name={`variants.${index}.title`}
                                label="Название модели"
                                placeholder="Lenovo IdeaPad i5 / 8GB / 240GB"
                                value={variant.title}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errorText={fieldError(touched, errors, `variants.${index}.title`)}
                              />
                            </Grid>

                            <Grid item sm={6} xs={12}>
                              <TextField
                                fullWidth
                                name={`variants.${index}.warehouse`}
                                label="Склад"
                                placeholder="Главный склад / Ош / Бишкек"
                                value={variant.warehouse}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Grid>

                            <Grid item sm={3} xs={12}>
                              <TextField
                                fullWidth
                                name={`variants.${index}.cpu`}
                                label="Процессор"
                                placeholder="Core i5-1335U"
                                value={variant.cpu}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errorText={fieldError(touched, errors, `variants.${index}.cpu`)}
                              />
                            </Grid>

                            <Grid item sm={3} xs={12}>
                              <TextField
                                fullWidth
                                type="number"
                                name={`variants.${index}.ram`}
                                label="RAM, GB"
                                placeholder="8"
                                value={variant.ram}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errorText={fieldError(touched, errors, `variants.${index}.ram`)}
                              />
                            </Grid>

                            <Grid item sm={3} xs={12}>
                              <TextField
                                fullWidth
                                name={`variants.${index}.storage`}
                                label="Накопитель"
                                placeholder="240GB NVME"
                                value={variant.storage}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errorText={fieldError(touched, errors, `variants.${index}.storage`)}
                              />
                            </Grid>

                            <Grid item sm={3} xs={12}>
                              <TextField
                                fullWidth
                                name={`variants.${index}.color`}
                                label="Цвет"
                                placeholder="Синий"
                                value={variant.color}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                errorText={fieldError(touched, errors, `variants.${index}.color`)}
                              />
                            </Grid>

                            <Grid item sm={4} xs={12}>
                              <TextField
                                fullWidth
                                type="number"
                                name={`variants.${index}.price`}
                                label="Цена"
                                placeholder="45000"
                                value={variant.price}
                                onBlur={handleBlur}
                                onChange={(event) => {
                                  handleChange(event);
                                  if (index === 0) setFieldValue("price", event.target.value);
                                }}
                                errorText={fieldError(touched, errors, `variants.${index}.price`)}
                              />
                            </Grid>

                            <Grid item sm={4} xs={12}>
                              <TextField
                                fullWidth
                                type="number"
                                name={`variants.${index}.oldPrice`}
                                label="Старая цена"
                                placeholder="Необязательно"
                                value={variant.oldPrice}
                                onBlur={handleBlur}
                                onChange={(event) => {
                                  handleChange(event);
                                  if (index === 0) setFieldValue("oldPrice", event.target.value);
                                }}
                              />
                            </Grid>

                            <Grid item sm={4} xs={12}>
                              <TextField
                                fullWidth
                                type="number"
                                name={`variants.${index}.stock`}
                                label="Остаток"
                                placeholder="1"
                                value={variant.stock}
                                onBlur={handleBlur}
                                onChange={(event) => {
                                  handleChange(event);
                                  if (index === 0) setFieldValue("stock", event.target.value);
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <CheckBox
                                color="primary"
                                name={`variants.${index}.inStock`}
                                checked={variant.inStock}
                                label="В наличии"
                                onChange={(event) =>
                                  setFieldValue(`variants.${index}.inStock`, event.target.checked)
                                }
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextArea
                                rows={3}
                                fullWidth
                                name={`variants.${index}.description`}
                                label="Описание варианта"
                                placeholder="Особенности конкретной конфигурации"
                                value={variant.description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextArea
                                rows={3}
                                fullWidth
                                name={`variants.${index}.imagesText`}
                                label="Изображения варианта"
                                placeholder="URL изображений, каждый с новой строки. Если пусто, будут использованы изображения товара"
                                value={variant.imagesText}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                        </VariantCard>
                      ))}
                    </VariantList>
                  </>
                )}
              </FieldArray>
            </Card>

            <StickyActions>
              <Box>
                <H6>Готово к сохранению</H6>
                <SemiSpan>
                  {values.variants.length} вариантов, базовая цена{" "}
                  {values.price || values.variants[0]?.price || "не указана"}
                </SemiSpan>
                {status ? (
                  <SemiSpan display="block" color="error.main" mt="4px">
                    {status}
                  </SemiSpan>
                ) : null}
              </Box>

              <Button
                type="submit"
                size="large"
                color="primary"
                px="2rem"
                disabled={isSubmitting}>
                {isSubmitting ? "Сохранение..." : "Сохранить товар"}
              </Button>
            </StickyActions>
          </FormStack>
        </form>
      )}
    </Formik>
  );
}

function createEmptyVariant(productTitle = ""): VariantFormValue {
  return {
    id: createVariantId(),
    title: productTitle,
    cpu: "",
    ram: "",
    storage: "",
    color: "",
    price: "",
    oldPrice: "",
    warehouse: "Главный склад",
    stock: "1",
    inStock: true,
    description: "",
    imagesText: "",
  };
}

function getInitialCategories(product: Product | undefined, categories: SelectOption[]) {
  const productCategories = product?.categories || [];

  return categories.filter((category) =>
    productCategories.some((item) => String(item).toLowerCase() === category.value.toLowerCase()),
  );
}

function createVariantId() {
  return `variant-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function toVariantFormValue(variant: ProductVariant): VariantFormValue {
  return {
    id: variant.id,
    title: variant.title,
    cpu: variant.cpu,
    ram: toInputValue(variant.ram),
    storage: variant.storage,
    color: variant.color,
    price: toInputValue(variant.price),
    oldPrice: toInputValue(variant.oldPrice),
    warehouse: variant.warehouse || "Главный склад",
    stock: variant.inStock ? "1" : "0",
    inStock: variant.inStock,
    description: variant.description || "",
    imagesText: variant.images.join("\n"),
  };
}

function toProductVariantPayload(variant: VariantFormValue): ProductVariant {
  return {
    id: variant.id,
    title: variant.title.trim(),
    cpu: variant.cpu.trim(),
    ram: toNumber(variant.ram),
    storage: variant.storage.trim(),
    color: variant.color.trim(),
    price: toNumber(variant.price),
    oldPrice: toOptionalNumber(variant.oldPrice),
    warehouse: variant.warehouse.trim() || undefined,
    inStock: variant.inStock && toNumber(variant.stock) > 0,
    description: variant.description.trim(),
    images: splitLines(variant.imagesText),
  };
}

function fieldError(touched: unknown, errors: unknown, path: string) {
  return (getIn(touched, path) && getIn(errors, path)) || false;
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toNumber(value: string | number | null | undefined) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function toOptionalNumber(value: string | number | null | undefined) {
  const numberValue = Number(value);
  return value !== "" && value !== null && value !== undefined && Number.isFinite(numberValue)
    ? numberValue
    : undefined;
}

function toInputValue(value: string | number | null | undefined) {
  return value === null || value === undefined ? "" : String(value);
}

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const FormStack = styled.div`
  display: grid;
  gap: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const ImagePreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const UploadImageBox = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary[100]};
`;

const VariantList = styled.div`
  display: grid;
  gap: 18px;
`;

const VariantCard = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.body.paper};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const VariantCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

const StickyActions = styled(Card)`
  position: sticky;
  bottom: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 24px;
  border-radius: 16px;

  @media (max-width: 767px) {
    align-items: stretch;
    flex-direction: column;
  }
`;
