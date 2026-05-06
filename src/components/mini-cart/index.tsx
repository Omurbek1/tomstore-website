"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";

import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button, IconButton } from "@component/buttons";
import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
import { IconX } from "@tabler/icons-react";
import { useCartItems, useCartTotal, useChangeCartAmount } from "@hook/useCart";
import useCurrency from "@hook/useCurrency";
import { buildCartWhatsAppOrderUrl } from "@utils/whatsappOrder";
// STYLED COMPONENT
import { StyledMiniCart } from "./styles";

// ==============================================================
type MiniCartProps = { toggleSidenav?: () => void };
// ==============================================================

export default function MiniCart({ toggleSidenav = () => {} }: MiniCartProps) {
  const cart = useCartItems();
  const cartTotal = useCartTotal();
  const changeCartAmount = useChangeCartAmount();
  const formatCurrency = useCurrency();
  const t = useTranslations("checkout.cart");
  const whatsappOrderHref = buildCartWhatsAppOrderUrl({
    items: cart,
    totalLabel: formatCurrency(cartTotal),
  });

  const handleCartAmountChange = (amount: number, product: any) => () => {
    changeCartAmount({ ...product, qty: amount });
  };

  return (
    <StyledMiniCart>
      <div className="cart-list">
        <FlexBox alignItems="center" justifyContent="space-between" m="0px 20px" height="74px">
          <FlexBox alignItems="center">
            <Icon size="1.5rem">bag</Icon>
            <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
              {t("itemsCount", { count: cart.length })}
            </Typography>
          </FlexBox>
          <IconButton color="gray.600" padding="4px" onClick={toggleSidenav}>
            <IconX size={20} />
          </IconButton>
        </FlexBox>

        <Divider />

        {cart.length === 0 && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 80px)">
            <Image src="/assets/images/logos/shopping-bag.svg" width={90} height={90} alt="empty cart" />
            <Paragraph mt="1rem" color="text.muted" textAlign="center" maxWidth="200px">
              {t("emptyCart")}
            </Paragraph>
          </FlexBox>
        )}

        {cart.map((item) => (
          <Fragment key={item.id}>
            <div className="cart-item">
              <FlexBox alignItems="center" flexDirection="column">
                <Button
                  size="none"
                  padding="3px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty + 1, item)}>
                  <Icon size="1rem">plus</Icon>
                </Button>

                <Typography fontWeight={600} fontSize="15px" my="3px">
                  {item.qty}
                </Typography>

                <Button
                  size="none"
                  padding="3px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty - 1, item)}
                  disabled={item.qty === 1}>
                  <Icon size="1rem">minus</Icon>
                </Button>
              </FlexBox>

              <Link href={`/product/${item.slug}`}>
                <Avatar
                  size={76}
                  mx=".5rem"
                  alt={item.name}
                  src={item.imgUrl || "/assets/images/products/iphone-x.png"}
                />
              </Link>

              <div className="product-details">
                <Link href={`/product/${item.slug}`}>
                  <H5 className="title" fontSize="14px">
                    {item.name}
                  </H5>
                </Link>

                <Tiny color="text.muted">
                  {formatCurrency(item.price, 0)} x {item.qty}
                </Tiny>

                <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
                  {formatCurrency(item.qty * item.price)}
                </Typography>
              </div>

              <Icon
                size="1rem"
                ml="1.25rem"
                className="clear-icon"
                onClick={handleCartAmountChange(0, item)}>
                close
              </Icon>
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="actions">
          <Button
            as="a"
            fullWidth
            color="primary"
            variant="contained"
            onClick={toggleSidenav}
            {...{
              href: whatsappOrderHref,
              target: "_blank",
              rel: "noopener noreferrer",
            }}>
            <Typography fontWeight={600}>
              {t("sendToWhatsApp")} ({formatCurrency(cartTotal)})
            </Typography>
          </Button>

          <Link href="/cart">
            <Button fullWidth color="primary" variant="outlined" mt="1rem" onClick={toggleSidenav}>
              <Typography fontWeight={600}>{t("viewCart")}</Typography>
            </Button>
          </Link>
        </div>
      )}
    </StyledMiniCart>
  );
}
