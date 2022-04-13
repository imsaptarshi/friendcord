import axios from "axios";

export default axios.create({
    baseURL: "https://discord.com/api",
    headers: {
        "Authorization": "Bearer ....",
    },
});