"use client";

import {
  useReducer,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  Button,
  Radio,
  Space,
  Typography,
  Row,
  Col,
  Flex,
  Modal,
  Table,
  Grid,
} from "antd";
import {
  ShoppingCartOutlined,
  ManOutlined,
  WomanOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ColumnsType } from "antd/es/table";
import { useSetAtom } from "jotai";
import { ProductDetailShell } from "@/components/product/ProductDetailShell";
import { incrementCartAtom } from "@/store/cartStore";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

type Gender = "male" | "female";

type Color = { name: string; swatchClass: string; ringClass: string };

type SizeGuideRow = {
  key: string;
  size: string;
  chest: string;
  waist: string;
  hips: string;
};

interface ProductVariant {
  colors: Color[];
  sizeGuide: SizeGuideRow[];
}

const defaultGender: Gender = "male";
const defaultColorName = "Gray";
const defaultSize = "M";

const product: {
  name: string;
  price: string;
  sizes: string[];
  images: string[];
  variants: Record<Gender, ProductVariant>;
} = {
  name: "One Sleeve Classic",
  price: "$45.00",
  sizes: ["S", "M", "L"],
  images: [
    "/athletes/vertical/main-secondary-1.jpg",
    "/athletes/vertical/main-secondary-2.jpg",
    "/athletes/vertical/main-secondary-3.jpg",
  ],
  variants: {
    male: {
      colors: [
        {
          name: "Gray",
          swatchClass: "bg-gray-400",
          ringClass: "ring-gray-400",
        },
        {
          name: "Sea Blue",
          swatchClass: "bg-sky-500",
          ringClass: "ring-sky-400",
        },
        {
          name: "Mild Red",
          swatchClass: "bg-rose-300",
          ringClass: "ring-rose-400",
        },
      ],
      sizeGuide: [
        { key: "S", size: "S", chest: "94", waist: "76", hips: "92" },
        { key: "M", size: "M", chest: "100", waist: "82", hips: "98" },
        { key: "L", size: "L", chest: "106", waist: "88", hips: "104" },
      ],
    },
    female: {
      colors: [
        {
          name: "Gray",
          swatchClass: "bg-gray-400",
          ringClass: "ring-gray-400",
        },
        {
          name: "Sea Blue",
          swatchClass: "bg-sky-500",
          ringClass: "ring-sky-400",
        },
        {
          name: "Mild Red",
          swatchClass: "bg-rose-300",
          ringClass: "ring-rose-400",
        },
      ],
      sizeGuide: [
        { key: "S", size: "S", chest: "84", waist: "66", hips: "90" },
        { key: "M", size: "M", chest: "90", waist: "72", hips: "96" },
        { key: "L", size: "L", chest: "96", waist: "78", hips: "102" },
      ],
    },
  },
};

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

const defaultVariant = product.variants[defaultGender];
const defaultColor =
  defaultVariant.colors.find((color) => color.name === defaultColorName) ??
  defaultVariant.colors[0];

const initialState: State = {
  selectedGender: defaultGender,
  selectedColor: defaultColor,
  selectedSize: defaultSize,
  mainImage: product.images[0],
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

const OneSleeveClassic: React.FC = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { selectedGender, selectedColor, selectedSize, mainImage } = state;
  const productNameSlug = "one-sleeve-classic";
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const incrementCart = useSetAtom(incrementCartAtom);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const mainImageRef = useRef<HTMLDivElement | null>(null);
  const hasHydratedFromQuery = useRef(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const currentVariant = product.variants[selectedGender];

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
    []
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
      variantFromQuery.colors.find(
        (color) => color.name.toLowerCase() === colorParam
      ) ??
      variantFromQuery.colors.find(
        (color) => color.name === defaultColorName
      ) ??
      variantFromQuery.colors[0];

    const sizeParam = (searchParams?.get("size") ?? "").toUpperCase();
    const sizeFromQuery = product.sizes.includes(sizeParam)
      ? sizeParam
      : defaultSize;

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
  }, [searchParams]);

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
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [
    selectedGender,
    selectedColor.name,
    selectedSize,
    searchParams,
    router,
    pathname,
  ]);

  const handleGenderChange = useCallback(
    (gender: Gender) => {
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
    },
    [selectedColor.name]
  );

  const handleAddToBag = useCallback(() => {
    const bagButton = document.getElementById("navbar-bag-button");
    const mainContainer = mainImageRef.current;
    const sourceImage = mainContainer?.querySelector("img");

    if (!bagButton || !mainContainer || !sourceImage) {
      incrementCart();
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
    });

    document.body.appendChild(clone);

    const finish = () => {
      clone.remove();
      incrementCart();
    };

    if (typeof clone.animate !== "function") {
      requestAnimationFrame(finish);
      return;
    }

    const animation = clone.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        {
          transform: `translate(${bagRect.left - imageRect.left}px, ${
            bagRect.top - imageRect.top
          }px) scale(0.25)`,
          opacity: 0.4,
        },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0.33, 1, 0.68, 1)",
        fill: "forwards",
      }
    );

    animation.finished
      .catch(() => undefined)
      .finally(finish);
  }, [incrementCart]);

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
        <Radio.Button value="male" className="min-w-[96px]">
          <Space size={8} align="center">
            <ManOutlined />
            <span>Male</span>
          </Space>
        </Radio.Button>
        <Radio.Button value="female" className="min-w-[96px]">
          <Space size={8} align="center">
            <WomanOutlined />
            <span>Female</span>
          </Space>
        </Radio.Button>
      </Space>
    </Radio.Group>
  );

  const handleColorChange = (value: string) => {
    const nextColor = currentVariant.colors.find(
      (color) => color.name === value
    );
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
          <Space direction="vertical" className="w-full">
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
              <Text strong className="uppercase text-xs text-gray-500">
                Fit
              </Text>
              {genderControl}
            </Flex>

            <Flex vertical gap={12}>
              <Flex wrap="wrap" align="center" gap={16}>
                <Text strong>
                  COLOR:{" "}
                  <span className="font-normal">{selectedColor.name}</span>
                </Text>
                <Radio.Group
                  name={`${productNameSlug}-color`}
                  value={selectedColor.name}
                  onChange={(event) => handleColorChange(event.target.value)}
                  className="flex items-center">
                  <Space size="middle">
                    {currentVariant.colors.map((color) => {
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
                onChange={(event) => handleSizeChange(event.target.value)}
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
              type="link"
              size="small"
              icon={<InfoCircleOutlined />}
              onClick={handleOpenSizeGuide}
              className="!p-0 w-fit"
            >
              Size Guide
            </Button>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className="w-full bg-black text-white hover:bg-gray-800 uppercase"
              onClick={handleAddToBag}>
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
        className={isMobile ? "!max-w-full" : undefined}
        title={`${
          selectedGender === "male" ? "Men's" : "Women's"
        } Size Guide`}
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

export default OneSleeveClassic;
