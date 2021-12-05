const {sensorInfoModel} = require('../models/sensorInfo');

class SensorInfoService {

    static async getLatestSensorInfo() {
        const latestSensorInfo = await sensorInfoModel.find({}).sort({time : -1}).limit(1);
        if (latestSensorInfo && latestSensorInfo.length) {
            return latestSensorInfo[0];
        } else {
            return {}
        }
    }
}
module.exports = SensorInfoService;
