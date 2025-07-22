import EmptyBagIcon from "@public/icons/EmptyBag";
import { Button, Drawer, Empty, Space, Typography } from "antd";

const { Text } = Typography;

interface NavBarBagDrawerProps {
  showBag: boolean;
  handleShowBag: () => void;
}

const NavBarBagDrawer: React.FC<NavBarBagDrawerProps> = ({
  showBag,
  handleShowBag,
}) => {
  return (
    <Drawer
      title="YOUR BAG"
      placement={"bottom"}
      closable
      // leaving this until we have products to display
      //   footer={
      //     <Button onClick={() => console.log('View Bag')} className="uppercase">
      //       View Bag
      //     </Button>
      //   }
      onClose={handleShowBag}
      open={showBag}>
      <Empty
        description="Your bag is empty"
        className="uppercase"
        image={<EmptyBagIcon />}
        styles={{ image: { marginBottom: 0 } }}>
        <Space direction="vertical">
          <Button type="primary" className="w-full">
            <Text className="uppercase text-white!" strong>
              Shop men
            </Text>
          </Button>
          <Button type="primary">
            <Text className="uppercase text-white!" strong>
              Shop women
            </Text>
          </Button>
        </Space>
      </Empty>
    </Drawer>
  );
};

export default NavBarBagDrawer;
