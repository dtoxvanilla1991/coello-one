"use client";

import { useReducer, useEffect, useMemo, useRef, useState } from "react";
import { Button, Radio, Space, Typography, Row, Col, Flex, Modal, Table, Grid } from "antd";
import {
  ShoppingCartOutlined,
  ManOutlined,
  WomanOutlined,
  InfoCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ColumnsType } from "antd/es/table";
import { useSetAtom } from "jotai";
import { ProductDetailShell } from "@/components/product/ProductDetailShell";
import { incrementCartAtom } from "@/store/cartStore";
import type { Color, Gender, SizeGuideRow } from "./types";
import { getLiveStock, type LiveStockResponse } from "./actions";
import { useTranslations } from "@/localization/useTranslations";
import {
  DEFAULT_COLOR_NAME,
  DEFAULT_GENDER,
  DEFAULT_SIZE,
  PRODUCT_DATA,
  PRODUCT_NAME_SLUG,
} from "./constants";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const defaultGender = DEFAULT_GENDER;
const defaultColorName = DEFAULT_COLOR_NAME;
const defaultSize = DEFAULT_SIZE;

interface State {
  selectedGender: Gender;
  selectedColor: Color;
  selectedSize: string;
  mainImage: string;
}

type Action =
  | {
      type: "SET_GENDER";
      payload: { gender: Gender; color: Color; mainImage: string };
    }
  | { type: "SET_COLOR"; payload: Color }
  | { type: "SET_SIZE"; payload: string }
  | { type: "SET_IMAGE"; payload: string }
  | { type: "HYDRATE"; payload: State };

type OneSleeveClassicProps = {
  productData?: typeof PRODUCT_DATA;
};

const fallbackProduct = PRODUCT_DATA;

const defaultVariant = fallbackProduct.variants[defaultGender];
const defaultColor =
  defaultVariant.colors.find((color) => color.name === defaultColorName) ??
  defaultVariant.colors[0];

const initialState: State = {
  selectedGender: defaultGender,
  selectedColor: defaultColor,
  selectedSize: defaultSize,
  mainImage: fallbackProduct.images[0],
};

function productReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_GENDER":
      return {
        ...state,
        selectedGender: action.payload.gender,
        selectedColor: action.payload.color,
        mainImage: action.payload.mainImage,
      };
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
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

const OneSleeveClassic: React.FC<OneSleeveClassicProps> = ({ productData }) => {
  const product = productData ?? fallbackProduct;
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { selectedGender, selectedColor, selectedSize, mainImage } = state;
  const productNameSlug = PRODUCT_NAME_SLUG;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const incrementCart = useSetAtom(incrementCartAtom);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const mainImageRef = useRef<HTMLDivElement | null>(null);
  const hasHydratedFromQuery = useRef(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const productCopy = useTranslations("product");
  const [liveStock, setLiveStock] = useState<LiveStockResponse | null>(null);

  const currentVariant = product.variants[selectedGender];

  useEffect(() => {
    let isActive = true;

    void getLiveStock(productNameSlug).then((result) => {
      if (isActive) {
        setLiveStock(result);
      }
    });

    return () => {
      isActive = false;
    };
  }, [productNameSlug]);

  const sizeGuideColumns: ColumnsType<SizeGuideRow> = useMemo(
    () => [
      { title: "Size", dataIndex: "size", key: "size", align: "center" },
      {
        title: "Chest (cm)",
        dataIndex: "chest",
        key: "chest",
        align: "center",
      },
      {
        title: "Waist (cm)",
        dataIndex: "waist",
        key: "waist",
        align: "center",
      },
      {
        title: "Hips (cm)",
        dataIndex: "hips",
        key: "hips",
        align: "center",
      },
    ],
    [],
  );

  useEffect(() => {
    if (hasHydratedFromQuery.current) {
      return;
    }

    const paramsGender = (searchParams?.get("gender") ?? "").toLowerCase();
    const genderFromQuery =
      paramsGender === "male" || paramsGender === "female"
        ? (paramsGender as Gender)
        : defaultGender;
    const variantFromQuery = product.variants[genderFromQuery];

    const colorParam = (searchParams?.get("color") ?? "").toLowerCase();
    const colorFromQuery =
      variantFromQuery.colors.find((color) => color.name.toLowerCase() === colorParam) ??
      variantFromQuery.colors.find((color) => color.name === defaultColorName) ??
      variantFromQuery.colors[0];

    const sizeParam = (searchParams?.get("size") ?? "").toUpperCase();
    const sizeFromQuery = product.sizes.includes(sizeParam) ? sizeParam : defaultSize;

    dispatch({
      type: "HYDRATE",
      payload: {
        selectedGender: genderFromQuery,
        selectedColor: colorFromQuery,
        selectedSize: sizeFromQuery,
        mainImage: product.images[0],
      },
    });
    hasHydratedFromQuery.current = true;
  }, [searchParams, product]);

  useEffect(() => {
    if (!hasHydratedFromQuery.current) {
      return;
    }

    const params = new URLSearchParams(searchParams?.toString() ?? "");
    let changed = false;

    if (params.get("gender") !== selectedGender) {
      params.set("gender", selectedGender);
      changed = true;
    }
    if (params.get("color") !== selectedColor.name) {
      params.set("color", selectedColor.name);
      changed = true;
    }
    if (params.get("size") !== selectedSize) {
      params.set("size", selectedSize);
      changed = true;
    }

    if (!changed) {
      return;
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : (pathname ?? "/"), {
      scroll: false,
    });
  }, [selectedGender, selectedColor.name, selectedSize, searchParams, router, pathname]);

  const handleGenderChange = (gender: Gender) => {
    const variant = product.variants[gender];
    const fallbackColor =
      variant.colors.find((color) => color.name === selectedColor.name) ??
      variant.colors.find((color) => color.name === defaultColorName) ??
      variant.colors[0];

    dispatch({
      type: "SET_GENDER",
      payload: {
        gender,
        color: fallbackColor,
        mainImage: product.images[0],
      },
    });
  };

  const handleAddToBag = () => {
    const bagButton = document.getElementById("navbar-bag-button");
    const mainContainer = mainImageRef.current;
    const sourceImage = mainContainer?.querySelector("img");

    const priceValue = Number.parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;

    const cartItem = {
      id: `${productNameSlug}-${selectedGender}-${selectedColor.name}-${selectedSize}`,
      name: product.name,
      image: mainImage,
      price: priceValue,
      size: selectedSize,
      color: selectedColor.name,
      fit: selectedGender,
    } as const;

    if (!bagButton || !mainContainer || !sourceImage) {
      incrementCart(cartItem);
      return;
    }

    const clone = sourceImage.cloneNode(true) as HTMLImageElement;
    const imageRect = sourceImage.getBoundingClientRect();
    const bagRect = bagButton.getBoundingClientRect();

    Object.assign(clone.style, {
      position: "fixed",
      top: `${imageRect.top}px`,
      left: `${imageRect.left}px`,
      width: `${imageRect.width}px`,
      height: `${imageRect.height}px`,
      zIndex: "1000",
      borderRadius: "12px",
      pointerEvents: "none",
      transformOrigin: "center",
    });

    document.body.appendChild(clone);

    const finish = () => {
      clone.remove();
      incrementCart(cartItem);
    };

    if (typeof clone.animate !== "function") {
      requestAnimationFrame(finish);
      return;
    }

    const imageCenterX = imageRect.left + imageRect.width / 2;
    const imageCenterY = imageRect.top + imageRect.height / 2;
    const bagCenterX = bagRect.left + bagRect.width / 2;
    const bagCenterY = bagRect.top + bagRect.height / 2;

    const translateX = bagCenterX - imageCenterX;
    const translateY = bagCenterY - imageCenterY;

    const animation = clone.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
        {
          transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(0.25)`,
          opacity: 0.4,
        },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0.33, 1, 0.68, 1)",
        fill: "forwards",
      },
    );

    animation.finished.catch(() => undefined).finally(finish);
  };

  const genderControl = (
    <Radio.Group
      name={`${productNameSlug}-gender`}
      value={selectedGender}
      onChange={(event) => handleGenderChange(event.target.value as Gender)}
      optionType="button"
      buttonStyle="solid"
      className="w-full"
    >
      <Space>
        <Radio.Button value="male" className="min-w-24">
          <Space size={8} align="center">
            <ManOutlined />
            <span>Male</span>
          </Space>
        </Radio.Button>
        <Radio.Button value="female" className="min-w-24">
          <Space size={8} align="center">
            <WomanOutlined />
            <span>Female</span>
          </Space>
        </Radio.Button>
      </Space>
    </Radio.Group>
  );

  const handleColorChange = (value: string) => {
    const nextColor = currentVariant.colors.find((color) => color.name === value);
    if (nextColor) {
      dispatch({ type: "SET_COLOR", payload: nextColor });
      dispatch({ type: "SET_IMAGE", payload: product.images[0] });
    }
  };

  const handleSizeChange = (value: string) => {
    dispatch({ type: "SET_SIZE", payload: value });
  };

  const handleOpenSizeGuide = () => setIsSizeGuideOpen(true);
  const handleCloseSizeGuide = () => setIsSizeGuideOpen(false);

  return (
    <ProductDetailShell>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={14}>
          <Space orientation="vertical" className="w-full">
            <Flex ref={mainImageRef} className="relative aspect-square w-full">
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
                    onClick={() => dispatch({ type: "SET_IMAGE", payload: img })}
                    role="button"
                    aria-pressed={mainImage === img}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        dispatch({ type: "SET_IMAGE", payload: img });
                      }
                    }}
                  >
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
        <Col xs={24} md={10} className="md:pl-8!">
          <Space orientation="vertical" size="large" className="w-full px-4 pb-10 md:px-8">
            <Title level={2} className="tracking-wider uppercase">
              {product.name}
            </Title>
            <Text strong className="text-2xl">
              {product.price}
            </Text>

            <Flex vertical gap={12}>
              <Text strong className="text-xs text-gray-500 uppercase">
                Fit
              </Text>
              {genderControl}
            </Flex>

            <Flex vertical gap={12}>
              <Flex wrap="wrap" align="center" gap={16}>
                <Text strong>
                  COLOR:{" "}
                  <span className="inline-block min-w-[7ch] font-normal">{selectedColor.name}</span>
                </Text>
                <Radio.Group
                  name={`${productNameSlug}-color`}
                  value={selectedColor.name}
                  onChange={(event) => handleColorChange(event.target.value)}
                  className="flex items-center"
                >
                  <Space size="middle">
                    {currentVariant.colors.map((color) => {
                      const isSelected = selectedColor.name === color.name;

                      return (
                        <Radio.Button
                          key={color.name}
                          value={color.name}
                          aria-label={`Color ${color.name}`}
                          aria-checked={isSelected}
                          className="border-0! bg-transparent! p-0! shadow-none! focus-visible:ring-0 focus-visible:outline-none"
                        >
                          <span
                            aria-hidden="true"
                            className={`block h-8 w-8 rounded-full border-2 transition-all duration-150 ${
                              color.swatchClass
                            } ${
                              isSelected
                                ? `border-white ring-2 ring-offset-1 ring-offset-white ${color.ringClass}`
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
                onChange={(event) => handleSizeChange(event.target.value)}
                className="w-full"
                optionType="button"
                buttonStyle="solid"
              >
                <Space>
                  {product.sizes.map((size) => (
                    <Radio.Button
                      key={size}
                      value={size}
                      aria-label={`Size ${size}`}
                      aria-checked={selectedSize === size}
                      className="w-24 text-center"
                    >
                      {size}
                    </Radio.Button>
                  ))}
                </Space>
              </Radio.Group>
              <AvailabilityLabel
                copy={productCopy.availability}
                selectedSize={selectedSize}
                liveStock={liveStock}
              />
            </Flex>

            <Button
              type="link"
              size="small"
              icon={<InfoCircleOutlined />}
              onClick={handleOpenSizeGuide}
              className="w-fit p-0!"
            >
              Size Guide
            </Button>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className="w-full bg-black text-white uppercase hover:bg-gray-800"
              onClick={handleAddToBag}
            >
              Add to Bag
            </Button>
          </Space>
        </Col>
      </Row>

      <Modal
        open={isSizeGuideOpen}
        onCancel={handleCloseSizeGuide}
        footer={null}
        centered={!isMobile}
        width={isMobile ? "100%" : 560}
        className={isMobile ? "max-w-full!" : undefined}
        closeIcon={<CloseOutlined className="me-10 text-lg" />}
        title={`${selectedGender === "male" ? "Men's" : "Women's"} Size Guide`}
      >
        <Table
          columns={sizeGuideColumns}
          dataSource={currentVariant.sizeGuide}
          pagination={false}
          size="small"
          rowKey="key"
        />
      </Modal>
    </ProductDetailShell>
  );
};

type AvailabilityCopy = {
  checkAvailability: string;
  inStock: string;
  lowStock: string;
  outOfStock: string;
};

function AvailabilityLabel({
  copy,
  selectedSize,
  liveStock,
}: {
  copy: AvailabilityCopy;
  selectedSize: string;
  liveStock: LiveStockResponse | null;
}) {
  const quantity = liveStock?.sizes[selectedSize];

  if (typeof quantity !== "number") {
    return <Text type="secondary">{copy.checkAvailability}</Text>;
  }

  if (quantity <= 0) {
    return <Text type="danger">{copy.outOfStock}</Text>;
  }

  if (quantity < 5) {
    return (
      <Text type="warning" strong>
        {copy.lowStock}
      </Text>
    );
  }

  return <Text type="success">{copy.inStock}</Text>;
}

export default OneSleeveClassic;
