/**
 * 封装鉴权相关逻辑，开发全局
 */
import React, { ProviderProps, ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

// 定义数据类型
interface AuthForm {
  username: string;
  password: string;
}

// 拿token去获取user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken(); // 尝试从localStorage读取token
  if (token) {
    // 这里因为要自己传入token，就不用封装好的useAuth了, 直接用http()
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 【这里类型定义 影响下面 AuthContext.Provider的 value属性】
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext"; // 自定义标识

// 在Provider中，进行主要的逻辑处理
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 定义字段    【这里类型定义 影响 下面相关的函数字段】
  const [user, setUser] = useState<User | null>(null);

  // 定义函数
  // point free 概念 【 then(setUser)  等价于 then(user => setUser(user)) 】
  // auth模块的login函数 赋值给 本模块的login
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  // 初始化时候调用
  useMount(() => {
    bootstrapUser().then(setUser);
  });

  // 向外分享
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 无论在哪个地方，只要调用useAuth，就可以取出user信息
// 如 const { login, user } = useAuth();
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
