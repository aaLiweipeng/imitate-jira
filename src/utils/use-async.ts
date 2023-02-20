import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils/index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

// 默认stat配置
/**
 * 即state
 * idle     异步操作未发生
 * loading  异步操作正发生
 * error    异步操作发生完了，出错
 * success  异步操作发生完了，成功
 */
const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

/**
 * (对外接口开写)
 * 封装异步处理，
 *
 * 用run接收Promise单元 并执行；
 * 根据结果返回 isLoading, error, data【加载状态、错误信息、请求结果数据】
 *
 * 如此，
 * 外部只需要 传入业务Promise，使用 运行结果 isLoading, error, data 去做处理 即可！
 *
 * 中间的 Promise运行，isLoading, error, data等状态整理，封装在此！
 *
 * @param initialState 用户传入的state
 * @param initialConfig
 * @returns
 */
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState, // 默认state
      ...initialState, // 用户传入的state，会覆盖默认的
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);
  // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
  // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
  const [retry, setRetry] = useState(() => () => {});

  // 异步操作发生完了，成功
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  // 异步操作发生完了，出错
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );

  // run 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      // !promise 指没传参数； !promise.then 指传的不是promise，没有then属性就不是promise
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      // stat 置为loading，开始运行
      safeDispatch({ stat: "loading" });

      return promise
        .then((data) => {
          // 异步操作发生完了，成功
          setData(data);
          return data;
        })
        .catch((error) => {
          // 异步操作发生完了，出错
          // ！！catch会消化异常，如果不主动抛出，外面是接收不到异常的
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry 被调用时重新跑一遍run，让state刷新一遍
    retry,
    ...state,
  };
};
