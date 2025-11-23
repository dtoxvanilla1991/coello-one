export type HeaderState = {
  host?: string;
  acceptLanguage?: string;
};

export type CookieState = {
  NEXT_LOCALE?: string;
};

export const requestLocaleHeaderState: HeaderState = {};
export const requestLocaleCookieState: CookieState = {};

export function resetRequestLocaleState() {
  requestLocaleHeaderState.host = undefined;
  requestLocaleHeaderState.acceptLanguage = undefined;
  requestLocaleCookieState.NEXT_LOCALE = undefined;
}
