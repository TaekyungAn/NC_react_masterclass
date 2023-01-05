import { createBrowserRouter } from "react-router-dom";
import Chart from "./Components/Chart";
import Coin from "./Components/Coin";
import Coins from "./Components/Coins";
import Price from "./Components/Price";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
]);
export default router;
