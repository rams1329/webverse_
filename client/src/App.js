import React from "react";
import { ConfigProvider } from "antd";

import Routes from "./routes/Routes";

const App = () => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "'Poppins', sans-serif",
        colorPrimary: "#3E82FC",
      },
    }}
  >
    <Routes />
  </ConfigProvider>
);

export default App;
