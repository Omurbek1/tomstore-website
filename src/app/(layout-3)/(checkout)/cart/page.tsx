"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography, { Paragraph } from "@component/Typography";
import { CartProductRow } from "@component/product-cards";
// CUSTOM HOOK
import { useCartItems, useCartTotal } from "@hook/useCart";
import useCurrency from "@hook/useCurrency";
import { buildCartWhatsAppOrderUrl } from "@utils/whatsappOrder";
// CUSTOM DATA
import countryList from "@data/countryList";
import { Link } from "@i18n/navigation";

export default function Cart() {
  const cart = useCartItems();
  const cartTotal = useCartTotal();
  const t = useTranslations("checkout.cart");
  const formatCurrency = useCurrency();
  const [comment, setComment] = useState("");
  const whatsappOrderHref = buildCartWhatsAppOrderUrl({
    items: cart,
    totalLabel: formatCurrency(cartTotal),
    comment,
  });

  if (cart.length === 0) {
    return (
      <FlexBox
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        py="4rem">
        <Image
          src="/assets/images/logos/shopping-bag.svg"
          width={120}
          height={120}
          alt="empty cart"
        />
        <Paragraph mt="1.5rem" color="text.muted" textAlign="center" maxWidth="280px" fontSize="16px">
          Your cart is empty. Add some products to continue shopping.
        </Paragraph>
        <Link href="/">
          <Button variant="contained" color="primary" mt="1.5rem">
            Continue Shopping
          </Button>
        </Link>
      </FlexBox>
    );
  }

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {cart.map((item) => (
            <CartProductRow
              mb="1.5rem"
              id={item.id}
              key={item.id}
              qty={item.qty}
              slug={item.slug || ""}
              name={item.name}
              price={item.price}
              imgUrl={item.imgUrl}
            />
          ))}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
              <Typography color="gray.600">{t("total")}</Typography>

              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                {formatCurrency(cartTotal)}
              </Typography>
            </FlexBox>

            <Divider mb="1rem" />

            <FlexBox alignItems="center" mb="1rem">
              <Typography fontWeight="600" mr="10px">
                {t("additionalComments")}
              </Typography>

              <Box p="3px 10px" bg="primary.light" borderRadius="3px">
                <Typography fontSize="12px" color="primary.main">
                  {t("note")}
                </Typography>
              </Box>
            </FlexBox>

            <TextArea
              rows={6}
              fullWidth
              mb="1rem"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />

            <Divider mb="1rem" />

            <TextField placeholder={t("voucher")} fullWidth />

            <Button variant="outlined" color="primary" mt="1rem" mb="30px" fullWidth>
              {t("applyVoucher")}
            </Button>

            <Divider mb="1.5rem" />

            <Typography fontWeight="600" mb="1rem">
              {t("shippingEstimates")}
            </Typography>

            <Select
              mb="1rem"
              label={t("country")}
              options={countryList}
              placeholder={t("selectCountry")}
              onChange={(e) => console.log(e)}
            />

            <Select
              label={t("state")}
              options={stateList}
              placeholder={t("selectState")}
              onChange={(e) => console.log(e)}
            />

            <Box mt="1rem">
              <TextField label={t("zipCode")} placeholder="3100" fullWidth />
            </Box>

            <Button variant="outlined" color="primary" my="1rem" fullWidth>
              {t("calculateShipping")}
            </Button>

            <Button
              as="a"
              variant="contained"
              color="primary"
              fullWidth
              {...{
                href: whatsappOrderHref,
                target: "_blank",
                rel: "noopener noreferrer",
              }}>
              {t("sendToWhatsApp")}
            </Button>
          </Card1>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const stateList = [
  { value: "New York", label: "New York" },
  { value: "Chicago", label: "Chicago" }
];
