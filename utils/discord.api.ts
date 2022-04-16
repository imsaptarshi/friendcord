import axios from "axios";

export default axios.create({
    baseURL: "https://frencord.herokuapp.com",
    withCredentials: true

});
