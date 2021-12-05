import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/sensor-info";

export function getLatestInfo() {
  return http.get(apiEndpoint + "/latest");
}

