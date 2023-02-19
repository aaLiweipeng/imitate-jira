// isFalsy 函数目的：
//     遇null、undefined等空值，是要返回true的【即!value】，cleanObject 去清除对应的键值对

import { useEffect, useRef, useState } from "react";

// 因Boolean(0) === false, !0 是true，按!value的逻辑，0会被当成空值使用！！！
// 而0是实值，显然不能用!value处理，
// 所以，这里专门搞这个函数来处理0，遇到0值，直接返回false
// bug：但如果一个键的值为false，如{ checked:false }, 这个key是有意义的，不能被删除
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/**
 * 用意跟 isFalsy一样，判断是不是没意义的值
 * 用来优化 isFalsy
 */
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// tip: 在一个函数里，改变传入的对象本身是不好的
// 本函数 用于 清除一个对象中的 其值为空的键值对
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object }; // tip: 将对象解构成键值对集合，妙啊

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

// 页面加载完成时初始化性质地执行
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // 用到了 callback，却没有依赖 callback，ts会报错，这里要加注释
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func(...param);
//     }, delay);
//   }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
//   ...5s
// 执行！

// debounce 原理讲解：
// 0s ---------> 1s ---------> 2s --------> ...
//     一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
//     log()#1 // timeout#1
//     log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
//     log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
//             // 所以，log()#3 结束后，就只剩timeout#3在独自等待了

/**
 * 当value或者delay变化时，更新 debouncedValue的值
 * 更新步骤：
 *    清除上一个延时任务，
 *    本次更新的动作 创建为一个延时任务，执行延时更新
 *
 * @return 一个被封装了防抖特性的 value！
 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // console.log(value.mayNotExist)

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器 延迟设值
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // useEffect的特性
    // 如果有下一个的useEffect的话，
    // 在下一个useEffect运行前，运行return中的内容
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 封装一个 array处理api
 * @param initialArray
 * @returns
 */
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
