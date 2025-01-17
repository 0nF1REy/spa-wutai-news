import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000";

export function signup(data) {
  delete data.confirmPassword;
  const body = {
    ...data,
    username: generateUserName(data.name),
    avatar: `https://avatar.iran.liara.run/username?username=${data.name}`,
    background: "https://picsum.photos/1920/1089?random=1",
  };
  return axios.post(`${baseURL}/user/create`, body);
}

export function signin(data) {
  return axios.post(`${baseURL}/auth`, data);
}

export function userLogged() {
  return axios.get(`${baseURL}/user/findById/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    }
  });
}

function generateUserName(name) {
  const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${nameLowerCaseWithoutSpaces}-${randomNumber}`;
}
