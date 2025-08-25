"use client";

import { useReducer } from "react";
import { Button, Radio, Space, Typography, Row, Col } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Title, Text } = Typography;

const product = {
  name: "One Sleeve Classic",
  price: "$45.00",
  colors: [
    { name: "Black", color: "#000000" },
    { name: "White", color: "#FFFFFF" },
    { name: "Dusty Pink", color: "#D8AFA0" },
  ],
  sizes: ["S", "M", "L"],
  images: [
    "/athletes/vertical/main-secondary-1.jpg",
    "/athletes/vertical/main-secondary-2.jpg",
    "/athletes/vertical/main-secondary-3.jpg",
  ],
};

type Color = { name: string; color: string };

interface State {
  selectedColor: Color;
  selectedSize: string;
  mainImage: string;
}

type Action =
  | { type: "SET_COLOR"; payload: Color }
  | { type: "SET_SIZE"; payload: string }
  | { type: "SET_IMAGE"; payload: string };

const initialState: State = {
  selectedColor: product.colors[0],
  selectedSize: product.sizes[1],
  mainImage: product.images[0],
};

function productReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_COLOR":
      return { ...state, selectedColor: action.payload };
    case "SET_SIZE":
      return { ...state, selectedSize: action.payload };
    case "SET_IMAGE":
      return { ...state, mainImage: action.payload };
    default:
      return state;
  }
}

const OneSleeveClassic: React.FC = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { selectedColor, selectedSize, mainImage } = state;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Row gutter={[32, 32]}>
        <Col xs={24} md={14}>
          <Space direction="vertical" className="w-full">
            <div className="relative w-full aspect-square">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-md"
                priority
              />
            </div>
            <Row gutter={8}>
              {product.images.map((img, index) => (
                <Col span={8} key={index}>
                  <div
                    className="relative w-full aspect-square cursor-pointer border-2 hover:border-black rounded-md overflow-hidden"
                    style={{
                      borderColor:
                        mainImage === img ? "black" : "transparent",
                    }}
                    onClick={() => dispatch({ type: "SET_IMAGE", payload: img })}>
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Space>
        </Col>
        <Col xs={24} md={10}>
          <Space direction="vertical" size="large" className="w-full">
            <Title level={2} className="uppercase tracking-wider">
              {product.name}
            </Title>
            <Text strong className="text-2xl">
              {product.price}
            </Text>

            <div>
              <Text strong>
                COLOR: <span className="font-normal">{selectedColor.name}</span>
              </Text>
              <Radio.Group
                value={selectedColor.name}
                onChange={(e) => {
                  const color = product.colors.find(
                    (c) => c.name === e.target.value,
                  );
                  if (color) {
                    dispatch({ type: "SET_COLOR", payload: color });
                  }
                }}
                className="mt-2">
                <Space>
                  {product.colors.map((color) => (
                    <Radio.Button
                      key={color.name}
                      value={color.name}
                      style={{
                        backgroundColor: color.color,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border:
                          selectedColor.name === color.name
                            ? "2px solid #3b82f6"
                            : "2px solid #d1d5db",
                        boxShadow:
                          selectedColor.name === color.name
                            ? "0 0 0 2px white"
                            : "none",
                      }}
                    />
                  ))}
                </Space>
              </Radio.Group>
            </div>

            <div>
              <Text strong>SIZE</Text>
              <Radio.Group
                value={selectedSize}
                onChange={(e) =>
                  dispatch({ type: "SET_SIZE", payload: e.target.value })
                }
                className="mt-2 w-full"
                optionType="button"
                buttonStyle="solid">
                <Space>
                  {product.sizes.map((size) => (
                    <Radio.Button
                      key={size}
                      value={size}
                      className="w-24 text-center">
                      {size}
                    </Radio.Button>
                  ))}
                </Space>
              </Radio.Group>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className="w-full bg-black hover:bg-gray-800 text-white uppercase">
              Add to Bag
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default OneSleeveClassic;
