"use client";

import { Card, Collapse, Empty, Flex, Input, Tag, Typography } from "antd";
import type { CollapseProps } from "antd";
import type { Key } from "react";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import { useLocalePath } from "@/hooks/useLocalePath";
import { trackEvent } from "@/utils/trackEvent";
import type { FAQCategory } from "./constants";
import { FAQ_CATEGORIES, FAQ_TRENDING_TOPICS } from "./constants";

const { Title, Paragraph, Text, Link } = Typography;

const searchSchema = z.string().trim().max(80);

type FAQContentProps = {
  categories?: FAQCategory[];
  initialQuery?: string;
};

function sanitizeQueryValue(value: string) {
  const parsed = searchSchema.safeParse(value);
  if (parsed.success) {
    return parsed.data.toLowerCase();
  }

  return value.slice(0, 80).trim().toLowerCase();
}

export default function FAQContent({
  categories = FAQ_CATEGORIES,
  initialQuery = "",
}: FAQContentProps) {
  const [query, setQuery] = useState(() => sanitizeQueryValue(initialQuery));
  const viewedQuestionsRef = useRef(new Set<string>());
  const withLocalePath = useLocalePath();

  const filteredCategories = useMemo(() => {
    if (!query) {
      return categories;
    }

    return categories
      .map((category) => {
        const entries = category.entries.filter((entry) => {
          const haystack = [entry.question, ...entry.answer, ...entry.tags]
            .join(" ")
            .toLowerCase();
          return haystack.includes(query);
        });

        return entries.length > 0 ? { ...category, entries } : undefined;
      })
      .filter((category): category is FAQCategory => Boolean(category));
  }, [categories, query]);

  const handleCollapseChange: CollapseProps["onChange"] = (keys) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    keysArray.forEach((rawKey: Key) => {
      const key = String(rawKey);
      if (!viewedQuestionsRef.current.has(key)) {
        viewedQuestionsRef.current.add(key);
        trackEvent("help_faq_view_question", { questionId: key });
      }
    });
  };

  const handleSearchChange = (value: string) => {
    setQuery(sanitizeQueryValue(value));
  };

  const handleSearchSubmit = (value: string) => {
    const sanitized = sanitizeQueryValue(value);
    setQuery(sanitized);
    if (sanitized) {
      trackEvent("help_faq_search", { query: sanitized });
    }
  };

  const renderCollapseItems = (category: FAQCategory): CollapseProps["items"] =>
    category.entries.map((entry) => ({
      key: entry.id,
      label: (
        <Flex align="center" justify="space-between" wrap>
          <Paragraph className="mb-0! text-base font-medium text-gray-900">
            {entry.question}
          </Paragraph>
          <Flex gap={8} wrap>
            {entry.tags.map((tag) => (
              <Tag key={`${entry.id}-${tag}`} className="uppercase tracking-wide text-gray-500">
                {tag}
              </Tag>
            ))}
          </Flex>
        </Flex>
      ),
      children: (
        <Flex vertical gap={12} className="pt-3">
          {entry.answer.map((answer, index) => (
            <Paragraph key={`${entry.id}-answer-${index}`} className="mb-0! text-gray-600">
              {answer}
            </Paragraph>
          ))}
        </Flex>
      ),
    }));

  return (
    <Flex vertical gap={24}>
      <Card className="border-gray-200 bg-white/70 backdrop-blur">
        <Flex vertical gap={16}>
          <Flex vertical gap={8}>
            <Paragraph className="mb-0! text-sm uppercase tracking-[0.25em] text-gray-500">
              Search our knowledge base
            </Paragraph>
            <Title level={3} className="mb-0! text-2xl md:text-3xl!">
              What can we help you find today?
            </Title>
            <Paragraph className="mb-0! text-base text-gray-600">
              Explore trending questions or search for keywords such as returns portal.
            </Paragraph>
          </Flex>
          <Input.Search
            placeholder="Search the help centre"
            size="large"
            allowClear
            onChange={(event) => handleSearchChange(event.target.value)}
            onSearch={handleSearchSubmit}
            value={query}
          />
          <Flex gap={8} wrap>
            {FAQ_TRENDING_TOPICS.map((topic) => (
              <Link key={topic} href={withLocalePath(`search?query=${encodeURIComponent(topic)}`)}>
                <Tag className="cursor-pointer border-gray-200 bg-gray-50 text-gray-700">
                  #{topic}
                </Tag>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Card>

      {filteredCategories.length === 0 ? (
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Text className="text-base text-gray-600">
                No answers found—try another keyword or reach us via Concierge chat.
              </Text>
            }
          />
        </Card>
      ) : (
        filteredCategories.map((category) => (
          <Card key={category.id} className="border-gray-200">
            <Flex vertical gap={16}>
              <Flex vertical gap={4}>
                <Title level={4} className="mb-0! text-xl font-semibold">
                  {category.title}
                </Title>
                <Paragraph className="mb-0! text-gray-600">{category.summary}</Paragraph>
              </Flex>
              <Collapse
                items={renderCollapseItems(category)}
                bordered={false}
                onChange={handleCollapseChange}
                expandIconPosition="end"
              />
            </Flex>
          </Card>
        ))
      )}
    </Flex>
  );
}
