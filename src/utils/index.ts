// isFalsy 函数目的：
//     遇null、undefined等空值，是要返回true的【即!value】，cleanObject 去清除对应的键值对

import { useEffect, useState } from "react";

// 因Boolean(0) === false, !0 是true，按!value的逻辑，0会被当成空值使用！！！
// 而0是实值，显然不能用!value处理，
// 所以，这里专门搞这个函数来处理0，遇到0值，直接返回false
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// tip: 在一个函数里，改变传入的对象本身是不好的
// 本函数 用于 清除一个对象中的空值键值对
export const cleanObject = (object: object) => {
  // Object.assign({}, object)
  const result = { ...object }; // tip: 将对象解构成键值对集合，妙啊

  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });

  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
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
