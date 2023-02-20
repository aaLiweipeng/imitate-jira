import { useHttp } from "utils/http";
import { Project } from "types/project";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  /**
   * 进一步封装 Promise业务运行run 以及 useEffect逻辑
   * 外部直接 只要把 数据 传进来就可拿到 异步运行的 结果状态 了
   */
  useEffect(() => {
    /**
     * run是入口，
     * isLoading, error, data是响应式产物；
     *
     * 入口传入Promise，把产物拿去使用即可
     */
    run(client("projects", { data: cleanObject(param || {}) }));
    // 用到了 param，却没有依赖 param，ts会报错，这里要加注释
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
