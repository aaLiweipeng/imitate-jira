/**
 * 进一步封装 Promise业务运行run 以及 useEffect逻辑
 * 外部直接 只要把 数据 传进来就可拿到 异步运行的 结果状态 了
 */
import { useHttp } from "utils/http";
import { User } from "types/user";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
