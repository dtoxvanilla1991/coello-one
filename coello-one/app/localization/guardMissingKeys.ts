const DEV_MODE = process.env.NODE_ENV === "development";

type AnyObject = Record<string | number | symbol, unknown>;

const proxyCache = new WeakMap<object, unknown>();

function isObject(value: unknown): value is AnyObject {
  return Boolean(value) && typeof value === "object";
}

export function guardMissingKeys<T>(value: T, rootPath: string): T {
  if (!DEV_MODE) {
    return value;
  }

  if (!isObject(value)) {
    return value;
  }

  const cached = proxyCache.get(value as object);
  if (cached) {
    return cached as T;
  }

  const proxy = new Proxy(value as AnyObject, {
    get(target, prop, receiver) {
      if (typeof prop === "symbol") {
        return Reflect.get(target, prop, receiver);
      }

      // Avoid breaking thenable checks.
      if (prop === "then" && !(prop in target)) {
        return undefined;
      }

      if (prop in target) {
        const next = Reflect.get(target, prop, receiver) as unknown;
        if (isObject(next)) {
          return guardMissingKeys(next, `${rootPath}.${String(prop)}`);
        }
        return next;
      }

      throw new Error(`[i18n] Missing translation key: ${rootPath}.${String(prop)}`);
    },
  });

  proxyCache.set(value as object, proxy);
  return proxy as T;
}
