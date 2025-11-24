"use client";

import { Card, Col, Empty, Flex, Row, Statistic, Table, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { useMemo } from "react";
import type { AnalyticsDetail } from "@/utils/analyticsAdapter";
import { buildHelpKpiSnapshot, getRecentHelpEvents } from "@/utils/analyticsKpis";
import { useAnalyticsEvents } from "@/hooks/useAnalyticsEvents";
import { useTranslations } from "@/localization/useTranslations";
import { formatMessage } from "@/localization/formatMessage";

const { Title, Paragraph, Text } = Typography;

type RecentEventRow = {
  key: string;
  label: string;
  time: string;
  status: string;
  color: string;
  details: string;
};

const EVENT_STATUS_COLORS: Record<string, string> = {
  help_contact_request_attempt: "blue",
  help_contact_request: "green",
  help_contact_request_error: "red",
  help_return_request_attempt: "blue",
  help_return_request: "green",
  help_return_request_error: "red",
};

const formatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const summarizePayload = (payload: AnalyticsDetail["payload"], emptyLabel: string): string => {
  if (!payload || Object.keys(payload).length === 0) {
    return emptyLabel;
  }

  return Object.entries(payload)
    .map(
      ([key, value]) =>
        `${key}: ${typeof value === "object" ? JSON.stringify(value) : String(value)}`,
    )
    .join(", ");
};

export default function KpiDashboardContent() {
  const events = useAnalyticsEvents(80);
  const snapshot = useMemo(() => buildHelpKpiSnapshot(events), [events]);
  const recentEvents = useMemo(() => getRecentHelpEvents(events, 8), [events]);
  const copy = useTranslations("helpKpi");
  const contentCopy = copy.content;
  const heroCopy = contentCopy.hero;
  const columnsCopy = contentCopy.table.columns;
  const eventStatusMap = contentCopy.eventStatus.map;
  const fallbackStatus = contentCopy.eventStatus.fallback.status;
  const emptySummary = contentCopy.summaries.none;
  const tableColumns: TableColumnsType<RecentEventRow> = [
    {
      title: columnsCopy.event,
      dataIndex: "label",
      key: "label",
      width: 220,
    },
    {
      title: columnsCopy.time,
      dataIndex: "time",
      key: "time",
      width: 160,
    },
    {
      title: columnsCopy.status,
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (_value, record) => <Tag color={record.color}>{record.status}</Tag>,
    },
    {
      title: columnsCopy.details,
      dataIndex: "details",
      key: "details",
    },
  ];

  const recentRows = useMemo<RecentEventRow[]>(
    () =>
      recentEvents.map((event) => {
        const mapping = eventStatusMap[event.event];
        const label = mapping?.label ?? event.event;
        const status = mapping?.status ?? fallbackStatus;
        const color = EVENT_STATUS_COLORS[event.event] ?? "gray";

        return {
          key: `${event.event}-${event.timestamp}`,
          label,
          status,
          color,
          time: formatter.format(new Date(event.timestamp)),
          details: summarizePayload(event.payload, emptySummary),
        };
      }),
    [recentEvents, eventStatusMap, fallbackStatus, emptySummary],
  );

  return (
    <Flex vertical gap={24}>
      <Card className="border-gray-200 bg-white/70">
        <Flex vertical gap={8}>
          <Title level={3} className="mb-0!">
            {heroCopy.title}
          </Title>
          <Paragraph className="mb-0! text-gray-600">{heroCopy.description}</Paragraph>
          <Text className="text-sm text-gray-500">
            {formatMessage(heroCopy.tracking, { count: snapshot.totalEvents })}
          </Text>
        </Flex>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="border-gray-200">
            <Flex vertical gap={12}>
              <Title level={4} className="mb-0!">
                {contentCopy.cards.contact.title}
              </Title>
              <Flex gap={16} wrap>
                <Statistic
                  title={contentCopy.cards.contact.stats.attempts}
                  value={snapshot.contact.attempts}
                  precision={0}
                />
                <Statistic
                  title={contentCopy.cards.contact.stats.completionRate}
                  value={snapshot.contact.completionRate * 100}
                  suffix="%"
                  precision={0}
                />
                <Statistic
                  title={contentCopy.cards.contact.stats.errors}
                  value={snapshot.contact.errors}
                  precision={0}
                />
                <Statistic
                  title={contentCopy.cards.contact.stats.avgResponse}
                  value={snapshot.contact.averageResponseMs}
                  suffix="ms"
                  precision={0}
                />
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="border-gray-200">
            <Flex vertical gap={12}>
              <Title level={4} className="mb-0!">
                {contentCopy.cards.returns.title}
              </Title>
              <Flex gap={16} wrap>
                <Statistic
                  title={contentCopy.cards.returns.stats.attempts}
                  value={snapshot.returns.attempts}
                  precision={0}
                />
                <Statistic
                  title={contentCopy.cards.returns.stats.completionRate}
                  value={snapshot.returns.completionRate * 100}
                  suffix="%"
                  precision={0}
                />
                <Statistic
                  title={contentCopy.cards.returns.stats.errors}
                  value={snapshot.returns.errors}
                  precision={0}
                />
                <Statistic
                  title={contentCopy.cards.returns.stats.avgResponse}
                  value={snapshot.returns.averageResponseMs}
                  suffix="ms"
                  precision={0}
                />
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>

      <Card className="border-gray-200 bg-white/70">
        <Flex vertical gap={16}>
          <Title level={4} className="mb-0!">
            {contentCopy.table.title}
          </Title>
          {recentRows.length === 0 ? (
            <Empty description={contentCopy.table.emptyDescription} />
          ) : (
            <Table
              rowKey="key"
              columns={tableColumns}
              dataSource={recentRows}
              pagination={false}
              size="small"
            />
          )}
        </Flex>
      </Card>
    </Flex>
  );
}
