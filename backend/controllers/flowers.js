const Flower = require("../models/Flower");

var fs = require("fs");

const paginateLabels = {
  totalDocs: "total",
  docs: "data",
  limit: "perPage",
  page: "page",
  totalPages: "pages",
};

class flowers {
  async fetchFlowersByAdmin(req, res) {
    try {
      const { page, perPage, search } = req.query;

      let params = {};

      if (search) {
        params = {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        };
      }

      await Flower.paginate(
        params,
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: paginateLabels,
        },
        function (err, result) {
          return res.json(result);
        }
      );
    } catch (err) {
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При запросе всех цветков сайта возникла проблема",
      });
    }
  }

  async createFlower(req, res) {
    try {
      const file = req?.files?.[0] || [];

      if (!file) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description:
            "Загружаемый файл должен быть следующих форматов: png, jpg, jpeg",
        });
      }

      const { name, price, type } = req.body;

      const imageHref = `http://localhost:3000/static/images/${file?.filename}`;

      const flower = new Flower({
        name,
        type,
        price,
        imageHref,
      });

      await flower.save();

      return res.status(200).json(flower);
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При создании данного цветка возникла проблема",
      });
    }
  }

  async replaceImage(req, res) {
    try {
      const { flowerId } = req.params;

      const file = req?.files?.[0] || [];

      const flower = await Flower.findById(flowerId).exec();

      if (!flower) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Такой цветок не найден в базе данных",
        });
      }

      const splitMass = flower.imageHref.split("/");

      const oldFileName = splitMass?.[splitMass?.length - 1];

      if (!oldFileName) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Старая фотография этого цветка не найдена",
        });
      }

      await fs.unlinkSync(`public/images/${oldFileName}`);

      flower.imageHref = `http://localhost:3000/static/images/${file?.filename}`;

      await flower.save();

      return res.status(200).json({ imageHref: flower.imageHref });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При замене фотографии цветку произошла ошибка",
      });
    }
  }

  async changeFlower(req, res) {
    try {
      const { flowerId } = req.params;

      const { body } = req;

      const flower = await Flower.findById(flowerId).exec();

      if (!flower) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Такой цветок не найден в базе данных",
        });
      }

      flower.name = body?.name ?? flower.name;
      flower.type = body?.type ?? flower.type;
      flower.price = body?.price ?? flower.price;

      await flower.save();

      return res.status(200).json(flower);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При редактировании этого цветка возникла ошибка",
      });
    }
  }

  async fetchFlowersByClient(req, res) {
    try {
      const {
        page,
        perPage,
        search,
        fromPrice,
        toPrice,
        type,
        sortBy,
        sortDirection,
      } = req.query || {};

      let paramsSearch = {};

      if (search) {
        paramsSearch = {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        };
      }

      let paramsType = {};

      if (type !== undefined) {
        paramsType = {
          type: type,
        };
      }

      let paramsPriceFilter = {};

      if (
        fromPrice !== "" &&
        fromPrice !== undefined &&
        toPrice !== "" &&
        toPrice !== undefined
      ) {
        paramsPriceFilter = {
          price: { $gte: fromPrice, $lte: toPrice },
        };
      } else if (
        fromPrice !== "" &&
        fromPrice !== undefined &&
        (toPrice === "" || toPrice === undefined)
      ) {
        paramsPriceFilter = {
          price: { $gte: fromPrice },
        };
      } else if (
        (fromPrice === "" || fromPrice === undefined) &&
        toPrice !== "" &&
        toPrice !== undefined
      ) {
        paramsPriceFilter = {
          price: { $lte: toPrice },
        };
      }

      let sortParams = {};

      if (sortBy === "price") {
        if (sortDirection !== undefined) {
          sortParams = {
            price: sortDirection === "asc" ? 1 : -1,
          };
        }
      }

      if (sortBy === "name") {
        if (sortDirection !== undefined) {
          sortParams = {
            name: sortDirection === "asc" ? 1 : -1,
          };
        }
      }

      await Flower.paginate(
        {
          $and: [paramsSearch, paramsPriceFilter, paramsType],
        },
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: paginateLabels,
          sort: sortParams,
        },
        function (err, result) {
          return res.json(result);
        }
      );
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При запросе всех цветов сайта возникла проблема",
      });
    }
  }
}

module.exports = new flowers();
