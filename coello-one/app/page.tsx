import { metaObject } from "config/site.config";
import { Home } from "@/(infrastructure)/home/page";

export const metadata = {
  ...metaObject(),
};

export default function HomePage() {
  return <Home />;
}
