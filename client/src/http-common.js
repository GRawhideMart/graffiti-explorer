import axios from "axios";
import { server_address } from "./keys";

export default axios.create({
  baseURL: server_address,
  headers: {
    "Content-Type": "application/json",
  },
});
