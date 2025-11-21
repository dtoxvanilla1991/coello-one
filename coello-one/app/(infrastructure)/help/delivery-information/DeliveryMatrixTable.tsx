"use client";

import { Flex, Table, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";
import type { DeliveryMatrixColumnCopy, DeliveryTier } from "./types";

const { Text } = Typography;

const createColumns = (columnCopy: DeliveryMatrixColumnCopy): TableColumnsType<DeliveryTier> => [
  {
    title: columnCopy.region,
    dataIndex: "region",
    key: "region",
  },
  {
    title: columnCopy.service,
    dataIndex: "service",
    key: "service",
  },
  {
    title: columnCopy.eta,
    dataIndex: "eta",
    key: "eta",
  },
  {
    title: columnCopy.cutoff,
    dataIndex: "cutoff",
    key: "cutoff",
  },
  {
    title: columnCopy.cost,
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
  columnCopy: DeliveryMatrixColumnCopy;
};

// TEST-WAIVER: Declarative wrapper around Ant Design Table; additional tests would duplicate DeliveryCalculator coverage.
export default function DeliveryMatrixTable({ tiers, columnCopy }: DeliveryMatrixTableProps) {
  return (
    <Table
      rowKey="id"
      columns={createColumns(columnCopy)}
      dataSource={tiers}
      pagination={false}
      className="overflow-hidden rounded-xl border border-gray-200"
    />
  );
}
