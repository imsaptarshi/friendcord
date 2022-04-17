import axios from "axios";
import { meta } from "./meta";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || meta.api,
    withCredentials: true

});