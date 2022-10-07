// isFalsy 函数目的：
//     遇null、undefined等空值，是要返回true的【即!value】，cleanObject 去清除对应的键值对

// 因Boolean(0) === false, !0 是true，按!value的逻辑，0会被当成空值使用！！！
// 而0是实值，显然不能用!value处理，
// 所以，这里专门搞这个函数来处理0，遇到0值，直接返回false
export const isFalsy = (value) => (value === 0 ? false : !value);

// tip: 在一个函数里，改变传入的对象本身是不好的
// 本函数 用于 清除一个对象中的空值键值对
export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object }; // tip: 将对象解构成键值对集合，妙啊

  Object.keys(result).forEach((key) => {
    // 0
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
};
