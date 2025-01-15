import axios from "axios";

const baseURL = "http://localhost:3000";

export function findAll() {
  return axios.get(`${baseURL}/news`);
}

export function getTopNews() {
  return axios.get(`${baseURL}/news/top`);
}

export function searchNews(title) {
  return axios.get(`${baseURL}/news/search?title=${title}`);
}
