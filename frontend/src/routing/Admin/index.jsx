const { lazy } = require("react");

const Main = lazy(() => import("../../components/AdminPanel"));

const AllOrders = lazy(() => import("../../components/AdminPanel/AllOrders"));

const AllFlowers = lazy(() => import("../../components/AdminPanel/AllFlowers"));

const CreateFlower = lazy(() =>
  import("../../components/AdminPanel/AllFlowers/CreateFlower")
);

export const Admin = [
  {
    path: "/admin",
    component: Main,
    routes: [
      {
        path: "/admin/all-flowers/create",
        component: CreateFlower,
      },

      {
        path: "/admin/all-orders",
        component: AllOrders,
      },
      {
        path: "/admin/all-flowers",
        component: AllFlowers,
      },
    ],
  },
];
