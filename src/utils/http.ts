import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET", // 默认是GET请求
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  // 处理参数，get处理成urlParam，post处理成body；
  // axios 则直接 传 param、data
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload(); // 刷新页面
        return Promise.reject({ message: "请重新登录" });
      }

      const data = await response.json();
      if (response.ok) {
        // 在外部的then，接收处理这个data
        return data;
      } else {
        // axios可以在response拦截器里边拦截处理异常，不返回reject，外部可以不用处理
        // 这里这么写是把错误reject出去，让外部处理这个异常
        return Promise.reject(data);
      }
    });
};

/**
 * 妙啊！
 * http()封装 网络接口请求 的 相关逻辑！！！
 * useHttp封装 user获取逻辑、token装载逻辑！！！
 * 这里充分解耦了！！！
 */

/**
 * 封装了获取token的过程；
 * useHttp()调用之后，返回得到的是 return 出来的一个匿名函数引用【如下例，把这个赋给client】；
 * 进一步调用时，执行应用 并 传入参数即可
 *
 * 用例：
 * const client = useHttp();
 * client("projects", { data: cleanObject(debouncedParam) }).then(setList);
 */
export const useHttp = () => {
  const { user } = useAuth();
  // TODO 讲解 TS 操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
