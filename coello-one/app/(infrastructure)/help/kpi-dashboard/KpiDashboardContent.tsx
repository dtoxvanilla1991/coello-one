"use client";

import { Card, Col, Empty, Flex, Row, Statistic, Table, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { useMemo } from "react";
import type { AnalyticsDetail } from "@/utils/analyticsAdapter";
import { buildHelpKpiSnapshot, getRecentHelpEvents } from "@/utils/analyticsKpis";
import { useAnalyticsEvents } from "@/hooks/useAnalyticsEvents";

const { Title, Paragraph, Text } = Typography;

type RecentEventRow = {
  key: string;
  label: string;
  time: string;
  status: string;
  color: string;
  details: string;
};

const EVENT_STATUS: Record<string, { label: string; status: string; color: string }> = {
  help_contact_request_attempt: {
    label: "Contact concierge attempt",
    status: "Attempt",
    color: "blue",
  },
  help_contact_request: {
    label: "Contact concierge completed",
    status: "Completed",
    color: "green",
  },
  help_contact_request_error: { label: "Contact concierge error", status: "Error", color: "red" },
  help_return_request_attempt: {
    label: "Return request attempt",
    status: "Attempt",
    color: "blue",
  },
  help_return_request: { label: "Return request completed", status: "Completed", color: "green" },
  help_return_request_error: { label: "Return request error", status: "Error", color: "red" },
};

const recentColumns: TableColumnsType<RecentEventRow> = [
  {
    title: "Event",
    dataIndex: "label",
    key: "label",
    width: 220,
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: 160,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 140,
    render: (_value, record) => <Tag color={record.color}>{record.status}</Tag>,
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
  },
];

const formatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const summarizePayload = (payload: AnalyticsDetail["payload"]): string => {
  if (!payload || Object.keys(payload).length === 0) {
    return "No payload";
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

  const recentRows = useMemo<RecentEventRow[]>(
    () =>
      recentEvents.map((event) => {
        const mapping = EVENT_STATUS[event.event] ?? {
          label: event.event,
          status: "Event",
          color: "gray",
        };

        return {
          key: `${event.event}-${event.timestamp}`,
          label: mapping.label,
          status: mapping.status,
          color: mapping.color,
          time: formatter.format(new Date(event.timestamp)),
          details: summarizePayload(event.payload),
        };
      }),
    [recentEvents],
  );

  return (
    <Flex vertical gap={24}>
      <Card className="border-gray-200 bg-white/70">
        <Flex vertical gap={8}>
          <Title level={3} className="mb-0!">
            Real-time health
          </Title>
          <Paragraph className="mb-0! text-gray-600">
            Track how often members reach out, how quickly we respond, and whether friction appears
            in the flows.
          </Paragraph>
          <Text className="text-sm text-gray-500">
            Tracking {snapshot.totalEvents} events this session.
          </Text>
        </Flex>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="border-gray-200">
            <Flex vertical gap={12}>
              <Title level={4} className="mb-0!">
                Concierge contact flow
              </Title>
              <Flex gap={16} wrap>
                <Statistic title="Attempts" value={snapshot.contact.attempts} precision={0} />
                <Statistic
                  title="Completion rate"
                  value={snapshot.contact.completionRate * 100}
                  suffix="%"
                  precision={0}
                />
                <Statistic title="Errors" value={snapshot.contact.errors} precision={0} />
                <Statistic
                  title="Avg response"
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
                Returns flow
              </Title>
              <Flex gap={16} wrap>
                <Statistic title="Attempts" value={snapshot.returns.attempts} precision={0} />
                <Statistic
                  title="Completion rate"
                  value={snapshot.returns.completionRate * 100}
                  suffix="%"
                  precision={0}
                />
                <Statistic title="Errors" value={snapshot.returns.errors} precision={0} />
                <Statistic
                  title="Avg response"
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
            Recent analytics feed
          </Title>
          {recentRows.length === 0 ? (
            <Empty description="Submit a contact or return to populate analytics" />
          ) : (
            <Table
              rowKey="key"
              columns={recentColumns}
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
