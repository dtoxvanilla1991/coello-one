import React, { JSX } from "react";
import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#52c41a",
        },
      }}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#000000",
            borderRadius: 2,
            // responsible for the background color of the active menu item, e.x. Select component
            controlItemBgActive: "#f5f5f5", // sets the active background select options color
            colorBgBase: "#ffffff", // sets the base background color
            colorBgContainer: "#ffffff", // sets container backgrounds
            colorBgLayout: "#ffffff", // sets layout backgrounds
          },
        }}>
        {node}
      </ConfigProvider>
    </ConfigProvider>
  </>
);

export default withTheme;
