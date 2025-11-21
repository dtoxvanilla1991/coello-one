"use client";

import { Flex, Table, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";
import type { DeliveryTier } from "./constants";

const { Text } = Typography;

const columns: TableColumnsType<DeliveryTier> = [
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Estimated arrival",
    dataIndex: "eta",
    key: "eta",
  },
  {
    title: "Order by",
    dataIndex: "cutoff",
    key: "cutoff",
  },
  {
    title: "Cost",
    dataIndex: "displayCost",
    key: "displayCost",
    render: (value: string, record: DeliveryTier) => (
      <Flex align="center" gap={8}>
        <Text className="font-medium text-gray-900">{value}</Text>
        {record.freeThreshold ? (
          <Tag color="green" className="uppercase tracking-wide">
            {record.freeThreshold}
          </Tag>
        ) : null}
      </Flex>
    ),
  },
];

type DeliveryMatrixTableProps = {
  tiers: DeliveryTier[];
};

// TEST-WAIVER: Declarative wrapper around Ant Design Table; additional tests would duplicate DeliveryCalculator coverage.
export default function DeliveryMatrixTable({ tiers }: DeliveryMatrixTableProps) {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={tiers}
      pagination={false}
      className="overflow-hidden rounded-xl border border-gray-200"
    />
  );
}
