"use client";

import { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { FieldArray, Formik, FormikHelpers, getIn } from "formik";
import { useRouter } from "next/navigation";
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconPlus,
  IconRefresh,
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
  _autoTitle: boolean;
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
        cpu: yup.string(),
        ram: yup.string(),
        storage: yup.string(),
        color: yup.string(),
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
  const [expandedVariants, setExpandedVariants] = useState<Set<number>>(new Set());

  const toggleAdvanced = (index: number) => {
    setExpandedVariants((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

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
      }) => {
        // When a spec field changes, auto-update title if in auto mode
        const onSpecChange = (
          e: React.ChangeEvent<HTMLInputElement>,
          index: number,
          specKey: keyof Pick<VariantFormValue, "cpu" | "ram" | "storage" | "color">,
        ) => {
          handleChange(e);
          const variant = values.variants[index];
          if (variant._autoTitle) {
            const updated = { ...variant, [specKey]: e.target.value };
            setFieldValue(`variants.${index}.title`, buildAutoTitle(updated, values.name));
          }
        };

        // Manual title edit disables auto mode
        const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
          handleChange(e);
          setFieldValue(`variants.${index}._autoTitle`, false);
        };

        // Reset title to auto-generated value
        const resetAutoTitle = (index: number) => {
          const autoTitle = buildAutoTitle(values.variants[index], values.name);
          setFieldValue(`variants.${index}.title`, autoTitle);
          setFieldValue(`variants.${index}._autoTitle`, true);
        };

        return (
          <form onSubmit={handleSubmit}>
            <FormStack>
              {/* ── Основная информация ── */}
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

              {/* ── Варианты ── */}
              <Card p="30px" borderRadius={16}>
                <FieldArray name="variants">
                  {({ push, remove }) => (
                    <>
                      <SectionHeader>
                        <div>
                          <H4>Варианты покупки</H4>
                          <Paragraph color="text.muted">
                            Только цена обязательна. Характеристики (CPU, RAM, накопитель, цвет) — опционально.
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
                        {values.variants.map((variant, index) => {
                          const isExpanded = expandedVariants.has(index);
                          const hasAdvanced = !!(variant.description || variant.imagesText);

                          return (
                            <VariantCard key={variant.id}>
                              {/* Header */}
                              <VariantCardHeader>
                                <div>
                                  <H5>Вариант {index + 1}</H5>
                                  <SemiSpan color="text.muted">
                                    {variant.price
                                      ? `${Number(variant.price).toLocaleString("ru")} сом`
                                      : "Цена не указана"}
                                  </SemiSpan>
                                </div>

                                <FlexBox style={{ gap: 8 }}>
                                  <Button
                                    type="button"
                                    variant="outlined"
                                    color="primary"
                                    title="Дублировать вариант"
                                    onClick={() =>
                                      push({
                                        ...variant,
                                        id: createVariantId(),
                                        title: `${variant.title || values.name} (копия)`,
                                        _autoTitle: false,
                                      })
                                    }>
                                    <IconCopy size={16} />
                                  </Button>

                                  <Button
                                    type="button"
                                    variant="outlined"
                                    color="error"
                                    title="Удалить вариант"
                                    disabled={values.variants.length === 1}
                                    onClick={() => remove(index)}>
                                    <IconTrash size={16} />
                                  </Button>
                                </FlexBox>
                              </VariantCardHeader>

                              <Grid container spacing={6}>
                                {/* Title with auto badge */}
                                <Grid item xs={12}>
                                  <TitleFieldWrap>
                                    <TextField
                                      fullWidth
                                      name={`variants.${index}.title`}
                                      label="Название модели"
                                      placeholder="Заполняется автоматически из характеристик"
                                      value={variant.title}
                                      onBlur={handleBlur}
                                      onChange={(e) => onTitleChange(e as React.ChangeEvent<HTMLInputElement>, index)}
                                      errorText={fieldError(touched, errors, `variants.${index}.title`)}
                                    />
                                    {variant._autoTitle ? (
                                      <AutoBadge title="Название генерируется автоматически">Авто</AutoBadge>
                                    ) : (
                                      <AutoResetBtn
                                        type="button"
                                        title="Восстановить автоназвание из характеристик"
                                        onClick={() => resetAutoTitle(index)}>
                                        <IconRefresh size={13} />
                                        Авто
                                      </AutoResetBtn>
                                    )}
                                  </TitleFieldWrap>
                                </Grid>

                                {/* Specs section */}
                                <Grid item xs={12}>
                                  <SpecsLabel>
                                    Характеристики <SpecsOptional>(необязательно)</SpecsOptional>
                                  </SpecsLabel>
                                </Grid>

                                <Grid item sm={3} xs={6}>
                                  <TextField
                                    fullWidth
                                    name={`variants.${index}.cpu`}
                                    label="Процессор"
                                    placeholder="Core i5-1335U"
                                    value={variant.cpu}
                                    onBlur={handleBlur}
                                    onChange={(e) => onSpecChange(e as React.ChangeEvent<HTMLInputElement>, index, "cpu")}
                                  />
                                </Grid>

                                <Grid item sm={3} xs={6}>
                                  <TextField
                                    fullWidth
                                    type="number"
                                    name={`variants.${index}.ram`}
                                    label="RAM, GB"
                                    placeholder="8"
                                    value={variant.ram}
                                    onBlur={handleBlur}
                                    onChange={(e) => onSpecChange(e as React.ChangeEvent<HTMLInputElement>, index, "ram")}
                                  />
                                </Grid>

                                <Grid item sm={3} xs={6}>
                                  <TextField
                                    fullWidth
                                    name={`variants.${index}.storage`}
                                    label="Накопитель"
                                    placeholder="240GB SSD"
                                    value={variant.storage}
                                    onBlur={handleBlur}
                                    onChange={(e) => onSpecChange(e as React.ChangeEvent<HTMLInputElement>, index, "storage")}
                                  />
                                </Grid>

                                <Grid item sm={3} xs={6}>
                                  <TextField
                                    fullWidth
                                    name={`variants.${index}.color`}
                                    label="Цвет"
                                    placeholder="Синий"
                                    value={variant.color}
                                    onBlur={handleBlur}
                                    onChange={(e) => onSpecChange(e as React.ChangeEvent<HTMLInputElement>, index, "color")}
                                  />
                                </Grid>

                                {/* Pricing & stock */}
                                <Grid item sm={3} xs={6}>
                                  <TextField
                                    fullWidth
                                    type="number"
                                    name={`variants.${index}.price`}
                                    label="Цена *"
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

                                <Grid item sm={3} xs={6}>
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

                                <Grid item sm={3} xs={6}>
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

                                <Grid item sm={3} xs={12}>
                                  <TextField
                                    fullWidth
                                    name={`variants.${index}.warehouse`}
                                    label="Склад"
                                    placeholder="Главный склад"
                                    value={variant.warehouse}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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

                                {/* Collapsible advanced: description + images */}
                                <Grid item xs={12}>
                                  <AdvancedToggle
                                    type="button"
                                    onClick={() => toggleAdvanced(index)}>
                                    {isExpanded ? (
                                      <IconChevronUp size={15} />
                                    ) : (
                                      <IconChevronDown size={15} />
                                    )}
                                    {isExpanded
                                      ? "Скрыть дополнительно"
                                      : hasAdvanced
                                        ? "Дополнительно (заполнено)"
                                        : "Дополнительно: описание и фото варианта"}
                                  </AdvancedToggle>
                                </Grid>

                                {isExpanded && (
                                  <>
                                    <Grid item xs={12}>
                                      <TextArea
                                        rows={3}
                                        fullWidth
                                        name={`variants.${index}.description`}
                                        label="Описание варианта"
                                        placeholder="Особенности конкретной конфигурации (необязательно)"
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
                                        placeholder="URL изображений, каждый с новой строки. Если пусто — используются фото товара"
                                        value={variant.imagesText}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    </Grid>
                                  </>
                                )}
                              </Grid>
                            </VariantCard>
                          );
                        })}
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
        );
      }}
    </Formik>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function buildAutoTitle(
  v: Pick<VariantFormValue, "cpu" | "ram" | "storage" | "color">,
  productName: string,
): string {
  const parts: string[] = [];
  if (v.cpu?.trim()) parts.push(v.cpu.trim());
  if (Number(v.ram) > 0) parts.push(`${v.ram}GB`);
  if (v.storage?.trim()) parts.push(v.storage.trim());
  if (v.color?.trim()) parts.push(v.color.trim());
  return parts.length > 0 ? parts.join(" / ") : productName || "";
}

function createEmptyVariant(productTitle = ""): VariantFormValue {
  return {
    id: createVariantId(),
    title: productTitle,
    _autoTitle: true,
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
    _autoTitle: false,
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

// ── Styled components ──────────────────────────────────────────────────────────

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

const TitleFieldWrap = styled.div`
  position: relative;
`;

const AutoBadge = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  padding: 2px 8px;
  border-radius: 99px;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 11px;
  font-weight: 700;
  pointer-events: none;
  margin-top: 10px;
`;

const AutoResetBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 99px;
  background: #fff;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const SpecsLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding-bottom: 2px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray[300]};
`;

const SpecsOptional = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const AdvancedToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
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
