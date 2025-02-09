import {
  createMenuOption,
  createMenuTitle,
  MenuItem,
} from "@/components/Menu/helpers";
import Menu from "@components/Menu";
import { PlusOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

const items: MenuItem[] = [
  createMenuTitle("Help", "/help", [
    createMenuOption("FAQ", "/faq"),
    createMenuOption("Delivery Information", "/delivery-information"),
    createMenuOption("Returns Policy", "/returns-policy"),
    createMenuOption("Privacy Policy", "/privacy-policy"),
    createMenuOption("Terms & Conditions", "/terms-conditions"),
    createMenuOption("Return An Item", "/return-an-item"),
    createMenuOption("Contact Us", "/contact-us"),
    createMenuOption("Orders International", "/orders-international"),
  ]),
  // phase 2
  //   createMenuTitle("My Account", "/account", [
  //     createMenuOption("Sign up", "/sign-up"),
  //     createMenuOption("Sing in", "/sign-in"),
  //   ]),
  createMenuTitle("Pages", "/pages", [
    createMenuOption("About Us", "/about-us"),
    createMenuOption("Discounts", "/discounts"),
    createMenuOption("Coello Education Hub", "/hub"),
    createMenuOption("Sustainability", "/sustainability"),
  ]),
];

export default function BottomMenu() {
  return (
    <Row className="px-4 py-2">
      <Col span={24}>
        <Menu items={items} expandIcon={<PlusOutlined />} />
      </Col>
    </Row>
  );
}
