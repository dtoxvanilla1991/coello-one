"use client";

import "@ant-design/v5-patch-for-react-19";
import { useReducer } from "react";
import { Button, Radio, Space, Typography, Row, Col, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { ProductDetailShell } from "@/components/product/ProductDetailShell";

const { Title, Text } = Typography;

const product = {
  name: "One Sleeve Classic",
  price: "$45.00",
  colors: [
    {
      name: "Sea Blue",
      swatchClass: "bg-sky-500",
      ringClass: "ring-sky-400",
    },
    {
      name: "Gray",
      swatchClass: "bg-gray-400",
      ringClass: "ring-gray-400",
    },
    {
      name: "Mild Red",
      swatchClass: "bg-rose-300",
      ringClass: "ring-rose-400",
    },
  ],
  sizes: ["S", "M", "L"],
  images: [
    "/athletes/vertical/main-secondary-1.jpg",
    "/athletes/vertical/main-secondary-2.jpg",
    "/athletes/vertical/main-secondary-3.jpg",
  ],
};

type Color = { name: string; swatchClass: string; ringClass: string };

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
      return {
        ...state,
        selectedColor: action.payload,
      };
    case "SET_SIZE":
      return {
        ...state,
        selectedSize: action.payload,
      };
    case "SET_IMAGE":
      return {
        ...state,
        mainImage: action.payload,
      };
    default:
      return state;
  }
}

const OneSleeveClassic: React.FC = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { selectedColor, selectedSize, mainImage } = state;
  const productNameSlug = "one-sleeve-classic";

  return (
    <ProductDetailShell>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={14}>
          <Space direction="vertical" className="w-full">
            <Flex className="relative aspect-square w-full">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-md object-cover"
                priority
              />
            </Flex>
            <Row gutter={8}>
              {product.images.map((img, index) => (
                <Col span={8} key={index}>
                  <Flex
                    className={`relative aspect-square w-full cursor-pointer overflow-hidden rounded-md border-2 transition-colors hover:border-black ${
                      mainImage === img ? "border-black" : "border-transparent"
                    }`}
                    onClick={() =>
                      dispatch({ type: "SET_IMAGE", payload: img })
                    }
                    role="button"
                    aria-pressed={mainImage === img}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        dispatch({ type: "SET_IMAGE", payload: img });
                      }
                    }}>
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </Flex>
                </Col>
              ))}
            </Row>
          </Space>
        </Col>
        <Col xs={24} md={10} className="md:!pl-8">
          <Space
            direction="vertical"
            size="large"
            className="w-full px-4 pb-10 md:px-8">
            <Title level={2} className="uppercase tracking-wider">
              {product.name}
            </Title>
            <Text strong className="text-2xl">
              {product.price}
            </Text>

            <Flex vertical gap={12}>
              <Flex wrap="wrap" align="center" gap={16}>
                <Text strong>
                  COLOR:{" "}
                  <span className="font-normal">{selectedColor.name}</span>
                </Text>
                <Radio.Group
                  name={`${productNameSlug}-color`}
                  value={selectedColor.name}
                  onChange={(e) => {
                    const color = product.colors.find(
                      (c) => c.name === e.target.value
                    );
                    if (color) {
                      dispatch({ type: "SET_COLOR", payload: color });
                    }
                  }}
                  className="flex items-center">
                  <Space size="middle">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor.name === color.name;

                      return (
                        <Radio.Button
                          key={color.name}
                          value={color.name}
                          aria-label={`Color ${color.name}`}
                          aria-checked={isSelected}
                          className="!border-0 !bg-transparent !p-0 !shadow-none focus-visible:outline-none focus-visible:ring-0">
                          <span
                            aria-hidden="true"
                            className={`block h-8 w-8 rounded-full border-2 transition-all duration-150 ${
                              color.swatchClass
                            } ${
                              isSelected
                                ? `border-black ring-2 ring-offset-2 ring-offset-white ${color.ringClass}`
                                : "border-gray-300 ring-0 ring-transparent ring-offset-0"
                            }`}
                          />
                        </Radio.Button>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </Flex>
            </Flex>

            <Flex vertical gap={12}>
              <Text strong>SIZE</Text>
              <Radio.Group
                name={`${productNameSlug}-size`}
                value={selectedSize}
                onChange={(e) =>
                  dispatch({ type: "SET_SIZE", payload: e.target.value })
                }
                className="w-full"
                optionType="button"
                buttonStyle="solid">
                <Space>
                  {product.sizes.map((size) => (
                    <Radio.Button
                      key={size}
                      value={size}
                      aria-label={`Size ${size}`}
                      aria-checked={selectedSize === size}
                      className="w-24 text-center">
                      {size}
                    </Radio.Button>
                  ))}
                </Space>
              </Radio.Group>
            </Flex>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className="w-full bg-black text-white hover:bg-gray-800 uppercase">
              Add to Bag
            </Button>
          </Space>
        </Col>
      </Row>
    </ProductDetailShell>
  );
};

export default OneSleeveClassic;
