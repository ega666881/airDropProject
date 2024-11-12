import axios from "axios";
import { backendIp } from "./request";

export default axios.create({
  baseURL: `${backendIp}/api`,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache"
  },
});
