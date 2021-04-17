import DeviceDetector from "./DeviceDetector";

let deviceDetector = new DeviceDetector();

export default {
    getInstance() {
        return deviceDetector;
    }
};
