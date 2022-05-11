import { Admin } from "./Admin";

const { lazy } = require("react");

const Catalog = lazy(() => import("../components/Catalog"));

const Login = lazy(() => import("../components/Login"));

const ShoppingBasket = lazy(() => import("../components/ShoppingBasket"));

const Checkout = lazy(() => import("../components/Checkout"));

export const Routes = [
  ...Admin,
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/basket",
    component: ShoppingBasket,
  },

  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Catalog,
  },
];
