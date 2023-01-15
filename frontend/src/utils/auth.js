import { tokenKey } from "./constant";


export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function setToken(token) {
  //console.log("settokne", token);
  localStorage.setItem("aaa", 123);
  return localStorage.setItem(tokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(tokenKey);
  // localStorage.setItem('fsdfsd',123)
}
