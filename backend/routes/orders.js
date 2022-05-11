const Router = require("express");
const controller = require("../controllers/orders");
const { check } = require("express-validator");
const router = new Router();

router.post(
  "/api/v1/orders",
  [
    check("address", "Адрес обязательное поле").notEmpty(),
    check("city", "Город обязательное поле").notEmpty(),
    check("postalCode", "Почтовый индекс обязательное поле").notEmpty(),
    check("flowersIds", "Не указан какой продукт заказывается").notEmpty(),
  ],
  controller.createOrder
);

router.get("/api/v1/admin/orders", controller.fetchOrdersByAdmin);

router.get("/api/v1/admin/orders/csv", controller.fetchOrdersByAdminCsv);

router.patch(`/api/v1/admin/orders/:orderId`, controller.completeOrder);

module.exports = router;
