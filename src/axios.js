import axios from "axios";

const instance = axios.create({
  baseURL: "https://e-commerce-site-v1.herokuapp.com",
});

export default instance;
