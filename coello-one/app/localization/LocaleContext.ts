"use client";

import { createContext } from "react";
import type { SupportedLocale } from "@config/i18n";
import { DEFAULT_LOCALE } from "@config/i18n";

export const LocaleContext = createContext<SupportedLocale>(DEFAULT_LOCALE);
