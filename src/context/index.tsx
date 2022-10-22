import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";

// children 指AppProviders标签间 包裹的子组件
// { children } 【参数】: { children: ReactNode } 【类型】
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
