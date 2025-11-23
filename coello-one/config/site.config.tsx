import { Metadata } from "next";
import logoImg from "@public/coelloLogo.png";
// import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "Coello One",
  description: `Coello One is a modern approach to building your unique self by creating a healthy lifestyle and make your and your body art stand out.`,
  logo: logoImg,
  // icon: logoIconImg,
  mode: MODE.LIGHT,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description,
): Metadata => {
  return {
    title: title ? `${title}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title}` : title,
      description,
      url: "https://coelloone.com",
      siteName: "Coello One",
      // images: {
      //   url: '',
      //   width: 1200,
      //   height: 630,
      // },
      locale: "en_US",
      type: "website",
    },
  };
};
