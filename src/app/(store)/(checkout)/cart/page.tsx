"use client";
import { Fragment, useState } from "react";
import { IconShoppingBag } from "@tabler/icons-react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import Typography, { Paragraph } from "@component/Typography";
import { CartProductRow } from "@component/product-cards";
// CUSTOM HOOK
import { useCartItems, useCartTotal } from "@hook/useCart";
import useCurrency from "@hook/useCurrency";
import { buildCartWhatsAppOrderUrl } from "@utils/whatsappOrder";
import { useStoreWhatsAppPhone } from "@hook/useStoreWhatsAppPhone";
import { useBranch } from "@context/BranchContext";
import { Link } from "@i18n/navigation";

const MobileStickyBar = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
    position: fixed;
    bottom: 64px;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0.75rem 1rem;
    background: ${({ theme }) => theme.colors.body.paper};
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default function Cart() {
  const cart = useCartItems();
  const cartTotal = useCartTotal();
  const t = useTranslations("checkout.cart");
  const formatCurrency = useCurrency();
  const [comment, setComment] = useState("");
  const tBranch = useTranslations("branch");
  const { activeBranch, branches } = useBranch();
  const branchName = branches.length > 1 ? activeBranch?.name : undefined;
  const whatsappPhone = useStoreWhatsAppPhone();
  const whatsappOrderHref = buildCartWhatsAppOrderUrl({
    items: cart,
    totalLabel: formatCurrency(cartTotal),
    comment,
    branchName,
    phone: whatsappPhone,
  });

  if (cart.length === 0) {
    return (
      <FlexBox
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        py="4rem">
        <IconShoppingBag size={120} stroke={1} color="var(--color-primary, #D23F57)" />
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
      {/* Mobile sticky checkout bar */}
      <MobileStickyBar>
        <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
          <Typography fontWeight="600">{t("total")}</Typography>
          <Typography fontSize="18px" fontWeight="700" color="primary.main">
            {formatCurrency(cartTotal)}
          </Typography>
        </FlexBox>
        <FlexBox style={{ gap: "0.5rem" }}>
          <Link href="/checkout" style={{ flex: 1 }}>
            <Button variant="contained" color="primary" fullWidth>
              {t("checkoutNow")}
            </Button>
          </Link>
          <Button
            as="a"
            variant="outlined"
            color="primary"
            style={{ flex: 1 }}
            {...{
              href: whatsappOrderHref,
              target: "_blank",
              rel: "noopener noreferrer",
            }}>
            WhatsApp
          </Button>
        </FlexBox>
      </MobileStickyBar>

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

            {branchName ? (
              <Typography fontSize="13px" color="text.muted" mb="1rem">
                {tBranch("cartPrices", { branch: branchName })}
              </Typography>
            ) : null}

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

            <Link href="/checkout">
              <Button variant="contained" color="primary" mb="0.75rem" fullWidth>
                {t("checkoutNow")}
              </Button>
            </Link>

            <Button
              as="a"
              variant="outlined"
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

