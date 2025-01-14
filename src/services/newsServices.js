import axios from "axios";

const baseURL = "http://localhost:3000";

export function findAll() {
  return axios.get(`${baseURL}/news`);
}

export function getTopNews() {
  return axios.get(`${baseURL}/news/top`);
}