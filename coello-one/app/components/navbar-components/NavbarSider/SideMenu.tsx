import {
  createMenuOption,
  createMenuTitle,
  MenuItem,
} from "@/components/Menu/helpers";
import Menu from "@components/Menu";

const items: MenuItem[] = [
  createMenuTitle("Trending", "/trending", [
    createMenuOption("Best Sellers", "/collections/best-sellers/men"),
  ]),
  createMenuTitle("Products", "/products", [
    createMenuOption("Passion model", "/products/passion-model"),
    createMenuOption("Power model", "/products/power-model"),
    createMenuOption("Pride model", "/products/pride-model"),
  ]),
  // this idea needs to be properly developed
  //   createMenuTitle("Coello One Hub", "/hub", <UserOutlined />, [
  //     createMenuTitle("Brandon's cut workout routine", "/hub/athlete/brandon-j-plan"),
  //     createMenuTitle(
  //       "How to scalp cannonball shoulders?",
  //       "/hub/media/how-to-scalp-cannonball-shoulders"
  //     ),
  //     createMenuTitle("Julia's lean look diet", "/hub/athlete/julia-c-plan"),
  //     createMenuTitle(
  //       "Want to see diet work fast? Fast.",
  //       "/hub/media/want-to-see-diet-work-fast"
  //     ),
  //     createMenuTitle("Laura's healthy tips for busy pros", "/hub/athlete/laura-g-plan"),
  //     createMenuTitle(
  //       "How to properly protect your tattoo",
  //       "/hub/media/how-to-properly-protect-your-tattoo"
  //     ),
  //   ]),
  createMenuTitle("Accessories", "/accessories", [
    createMenuOption("Resistance Bands", "/accessories/resistance-bands"),
  ]),
];

export default function SideMenu() {
  return <Menu items={items} />;
}
