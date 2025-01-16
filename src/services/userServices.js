import axios from "axios";

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

function generateUserName(name) {
    const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${nameLowerCaseWithoutSpaces}-${randomNumber}`;
  }