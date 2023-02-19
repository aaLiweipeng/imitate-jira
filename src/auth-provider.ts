/**
 * 鉴权业务方法集，提供给auth-context
 */

import { User } from "types/user";

// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

// 构造、返回一个user实例；设置token
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  console.log("handleUserResponse user --- ", user);
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data); // 实际上根据ts特性，data也是user类型
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data); // 实际上根据ts特性，data也是user类型
    }
  });
};

// 加上这个async，使得函数返回一个Promise实例
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
