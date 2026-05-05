"use client";

import { Button, Card, Divider, Input, List, Space, Typography } from "antd";
import { useLocale } from "next-intl";

type OrderLineItem = {
  name: string;
  quantity: number;
  price: number;
};

type SummaryRow = {
  label: string;
  value: number | null;
};

type Props = {
  title?: string;
  items?: OrderLineItem[];
  rows: SummaryRow[];
  total: number;
  totalLabel?: string;
  voucher?: {
    placeholder: string;
    buttonLabel: string;
  };
};

export default function OrderSummaryCard({
  title,
  items,
  rows,
  total,
  totalLabel,
  voucher
}: Props) {
  const locale = useLocale();
  const currencyMap: Record<string, { intlLocale: string; currency: string }> = {
    en: { intlLocale: "en-US", currency: "USD" },
    ru: { intlLocale: "ru-KG", currency: "KGS" },
    ky: { intlLocale: "ky-KG", currency: "KGS" }
  };
  const { intlLocale, currency: currencyCode } = currencyMap[locale] ?? currencyMap.ru;
  const formatter = new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const formatPrice = (value: number | null) => (value == null ? "-" : formatter.format(value));

  return (
    <Card variant='borderless' styles={{ body: { padding: 24 } }} style={{ borderRadius: 12 }}>
      {title ? (
        <Typography.Title level={5} style={{ marginTop: 0, marginBottom: items?.length ? 24 : 16 }}>
          {title}
        </Typography.Title>
      ) : null}

      {items?.length ? (
        <>
          <List
            split={false}
            dataSource={items}
            renderItem={(item) => (
              <List.Item style={{ padding: "0 0 16px" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16
                  }}>
                  <Typography.Text>
                    <Typography.Text strong>{item.quantity}</Typography.Text> x {item.name}
                  </Typography.Text>
                  <Typography.Text strong>{formatPrice(item.price * item.quantity)}</Typography.Text>
                </div>
              </List.Item>
            )}
          />

          <Divider style={{ margin: "0 0 24px" }} />
        </>
      ) : null}

      <Space direction="vertical" size={8} style={{ width: "100%" }}>
        {rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16
            }}>
            <Typography.Text type="secondary">{row.label}</Typography.Text>
            <Typography.Text strong>{formatPrice(row.value)}</Typography.Text>
          </div>
        ))}
      </Space>

      <Divider style={{ margin: "16px 0" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16
        }}>
        {totalLabel ? <Typography.Text strong>{totalLabel}</Typography.Text> : <span />}
        <Typography.Title level={4} style={{ margin: 0 }}>
          {formatPrice(total)}
        </Typography.Title>
      </div>

      {voucher ? (
        <Space.Compact style={{ width: "100%", marginTop: 24 }}>
          <Input placeholder={voucher.placeholder} />
          <Button>{voucher.buttonLabel}</Button>
        </Space.Compact>
      ) : null}
    </Card>
  );
}
