const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const SensorInfoService = require("../services/sensorInfo");

router.get("/latest", auth,async (req, res) => {
  const data = await SensorInfoService.getLatestSensorInfo();
  res.send({data});
});

module.exports = router;
