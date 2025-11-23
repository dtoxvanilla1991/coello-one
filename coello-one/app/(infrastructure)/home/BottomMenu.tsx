import { createMenuOption, createMenuTitle, MenuItem } from "@/components/Menu/helpers";
import Menu from "@components/Menu";
import { PlusOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { footerLinkGroups, routes } from "@config/routes";

const items: MenuItem[] = footerLinkGroups.map((group) =>
  createMenuTitle(
    group.title,
    group.key,
    group.links.map((link) => createMenuOption(link.label, routes[link.route])),
  ),
);

export default function BottomMenu() {
  return (
    <Row className="px-4 py-2" role="navigation" aria-label="Footer quick links">
      <Col span={24}>
        <Menu items={items} expandIcon={<PlusOutlined />} />
      </Col>
    </Row>
  );
}
