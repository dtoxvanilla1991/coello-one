"use client";

import { Card, Descriptions, Flex, Grid, Table, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";
import type { DeliveryMatrixColumnCopy, DeliveryTier } from "./types";

const { Text } = Typography;
const { useBreakpoint } = Grid;

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
          <Tag color="green" className="tracking-wide uppercase">
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

const MobileTierCards = ({ tiers, columnCopy }: DeliveryMatrixTableProps) => (
  <Flex vertical gap={12} className="w-full">
    {tiers.map((tier) => (
      <Card key={tier.id} className="border-gray-200" classNames={{ body: "p-4" }}>
        <Descriptions column={1} colon={false} size="small">
          <Descriptions.Item label={columnCopy.region}>
            <Text className="font-medium text-gray-900">{tier.region}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={columnCopy.service}>{tier.service}</Descriptions.Item>
          <Descriptions.Item label={columnCopy.eta}>{tier.eta}</Descriptions.Item>
          <Descriptions.Item label={columnCopy.cutoff}>{tier.cutoff}</Descriptions.Item>
          <Descriptions.Item label={columnCopy.cost}>
            <Flex align="center" gap={8}>
              <Text className="font-semibold text-gray-900">{tier.displayCost}</Text>
              {tier.freeThreshold ? (
                <Tag color="green" className="tracking-wide uppercase">
                  {tier.freeThreshold}
                </Tag>
              ) : null}
            </Flex>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    ))}
  </Flex>
);

// TEST-WAIVER: Declarative wrapper around Ant Design Table; additional tests would duplicate DeliveryCalculator coverage.
export default function DeliveryMatrixTable({ tiers, columnCopy }: DeliveryMatrixTableProps) {
  const screens = useBreakpoint();

  if (!screens.md) {
    return <MobileTierCards tiers={tiers} columnCopy={columnCopy} />;
  }

  return (
    <Table
      rowKey="id"
      columns={createColumns(columnCopy)}
      dataSource={tiers}
      pagination={false}
      size="small"
      scroll={{ x: 720 }}
      className="overflow-hidden rounded-xl border border-gray-200"
    />
  );
}
