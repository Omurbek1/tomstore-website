"use client";

import { Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { IconArrowRight } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";

import Card from "@component/Card";
import { Link, useRouter } from "@i18n/navigation";
import Order from "@models/order.model";
import { formatWithSpaceGroups } from "@utils/utils";

type OrderBasePath = "/orders" | "/vendor/orders";

type Props = {
  orders: Order[];
  basePath: OrderBasePath;
};

const STATUS_COLORS = {
  Cancelled: "red",
  Pending: "gold",
  Delivered: "green",
  Processing: "blue"
} as const;

const STATUS_KEYS = {
  Cancelled: "cancelled",
  Pending: "pending",
  Delivered: "delivered",
  Processing: "processing"
} as const;

export default function OrdersTable({ orders, basePath }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("dashboard");

  const intlLocale = locale === "ru" ? "ru-RU" : "en-US";
  const dateFormatter = new Intl.DateTimeFormat(intlLocale, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const priceFormatter = new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  const columns: TableColumnsType<Order> = [
    {
      title: t("tables.orderNumber"),
      dataIndex: "id",
      key: "id",
      render: (_, order) => (
        <Link
          href={`${basePath}/${order.id}`}
          style={{ color: "inherit", fontWeight: 600, textDecoration: "none" }}>
          #{order.id.substring(0, 8)}
        </Link>
      )
    },
    {
      title: t("tables.status"),
      dataIndex: "status",
      key: "status",
      render: (status: Order["status"]) => (
        <Tag color={STATUS_COLORS[status]} bordered={false}>
          {t(`orderStatus.${STATUS_KEYS[status]}`)}
        </Tag>
      )
    },
    {
      title: t("tables.datePurchased"),
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["md"],
      render: (createdAt: Order["createdAt"]) => dateFormatter.format(new Date(createdAt))
    },
    {
      title: t("tables.total"),
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "right",
      render: (totalPrice: Order["totalPrice"]) =>
        formatWithSpaceGroups(priceFormatter, totalPrice)
    },
    {
      title: t("tables.action"),
      key: "action",
      width: 72,
      align: "center",
      render: (_, order) => (
        <Button
          type="text"
          aria-label={t("buttons.viewDetails")}
          title={t("buttons.viewDetails")}
          icon={<IconArrowRight size={18} />}
          onClick={() => router.push(`${basePath}/${order.id}`)}
        />
      )
    }
  ];

  return (
    <Card borderRadius={12} p="0.5rem">
      <Table<Order>
        rowKey="id"
        size="middle"
        columns={columns}
        dataSource={orders}
        scroll={{ x: 720 }}
        locale={{ emptyText: t("tables.noOrders") }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          position: ["bottomCenter"]
        }}
      />
    </Card>
  );
}
