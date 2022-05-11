const { Router } = require(`express`);
const router = Router();
const controller = require("../controllers/flowers");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const hex = uuid.v4();

    cb(null, Date.now() + hex + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get(`/api/v1/admin/flowers`, controller.fetchFlowersByAdmin);

router.patch(`/api/v1/admin/flowers/:flowerId`, controller.changeFlower);

router.post(`/api/v1/admin/flowers`, [upload.any()], controller.createFlower);

router.post(
  `/api/v1/admin/flowers/replace-image/:flowerId`,
  [upload.any()],
  controller.replaceImage
);

router.get(`/api/v1/flowers`, controller.fetchFlowersByClient);

module.exports = router;
