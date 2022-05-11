const Order = require("../models/Order");
const Flower = require("../models/Flower");
const { validationResult } = require("express-validator");
const { Parser } = require("json2csv");

const paginateLabels = {
  totalDocs: "total",
  docs: "data",
  limit: "perPage",
  page: "page",
  totalPages: "pages",
};
class orders {
  async createOrder(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Создание не удалось",
          description: errors?.errors[0]?.msg,
        });
      }

      const { address, city, postalCode, flowersIds } = req.body;

      const flowers = await Flower.find({
        _id: { $in: flowersIds },
      });

      if (!flowers) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Такие цветы не найдены",
        });
      }

      const order = new Order({
        address,
        city,
        postalCode,
        flowersIds,
      });

      order.orderId = order?._id;

      await order.save();

      return res.status(200).json(order);
    } catch (err) {
      console.log(err);

      return res
        .status(400)
        .json({ message: "Создание заказа не удалось", description: "" });
    }
  }

  async completeOrder(req, res) {
    try {
      const { orderId } = req.params;

      const order = await Order.findById(orderId).exec();

      if (!order) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Такой заказ не найден",
        });
      }

      order.execute = true;

      await order.save();

      return res.status(200).json(order);
    } catch (err) {
      console.log(err);

      return res
        .status(400)
        .json({ message: "Завершение заказа не удалось", description: "" });
    }
  }

  async fetchOrdersByAdmin(req, res) {
    try {
      const { page, perPage, search } = req.query;

      let params = {};

      if (search) {
        params = {
          orderId: {
            $in: [search],
          },
        };
      }

      await Order.paginate(
        params,
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: paginateLabels,
          leanWithId: true,
        },
        async function (err, result) {
          let arrForFront = [];

          for (const order of result?.data) {
            const flowers = await Flower.find({
              _id: { $in: order?.flowersIds },
            });

            const shortFlowers = flowers.map((item) => {
              return {
                flowerId: item._id,
                name: item?.name,
              };
            });

            arrForFront = [
              ...arrForFront,
              {
                orderId: order._id,
                flowers: shortFlowers,
                execute: order.execute,
                address: order?.address,
                city: order?.city,
                postalCode: order?.postalCode,
              },
            ];
          }

          return res.status(200).json({
            ...result,
            data: arrForFront,
          });
        }
      );
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: "Получение списка заказов не удалось",
        description: "",
      });
    }
  }

  async fetchOrdersByAdminCsv(req, res) {
    try {
      const { page, perPage } = req.query;

      await Order.paginate(
        {},
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: paginateLabels,
        },
        async function (err, result) {
          let arrForFront = [];

          for (const order of result?.data) {
            const flowers = await Flower.find({
              _id: { $in: order?.flowersIds },
            });

            const shortFlowers = flowers.map((item) => {
              return item?.name;
            });

            arrForFront = [
              ...arrForFront,
              {
                flowers: shortFlowers.join(", "),
                execute: order.execute ? "Доставлен" : "Не доставлен",
                address: order?.address,
                city: order?.city,
                postalCode: order?.postalCode,
              },
            ];
          }

          const fields = [
            {
              label: "Цветы",
              value: "flowers",
            },
            {
              label: "Состояние",
              value: "execute",
            },
            {
              label: "Адрес",
              value: "address",
            },
            {
              label: "Адрес",
              value: "address",
            },
            {
              label: "Город",
              value: "city",
            },
            {
              label: "Почтовый индекс",
              value: "postalCode",
            },
          ];

          const json2csvParser = new Parser({ fields: fields, withBOM: true });
          const csv = json2csvParser.parse(arrForFront);

          res.header("Content-type", "text/csv; charset=utf-8");
          res.status(200).send(csv);
        }
      );
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: "Получение списка заказов не удалось",
        description: "",
      });
    }
  }
}

module.exports = new orders();
