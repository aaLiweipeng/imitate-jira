export const UtilityTypesTest = () => {
  // 类型别名、Utility Type 讲解
  // 联合类型
  let myFavoriteNumber: string | number;
  myFavoriteNumber = "seven";
  myFavoriteNumber = 7;
  // TS2322: Type '{}' is not assignable to type 'string | number'.
  // myFavoriteNumber = {}
  let jackFavoriteNumber: string | number;

  // 类型别名在很多情况下可以和interface互换
  // interface Person {
  //   name: string
  // }
  // type Person = { name: string }
  // const xiaoMing: Person = {name: 'xiaoming'}

  // 类型别名, interface 在这种情况下没法替代type
  type FavoriteNumber = string | number;
  let roseFavoriteNumber: FavoriteNumber = "6";

  interface Person1 {
    name: string;
    age: number;
  }
  // interface 也没法实现Utility type
  type Person = {
    name: string;
    age: number;
  };

  type Partial1 = Partial<Person>;

  const xiaoMing: Partial<Person> = { name: "sss" };
  const xiaoHuang: Partial<Person> = { age: 11 };

  type Omit1 = Omit<Person, "name" | "age">;
  type Omit2 = Omit<Person, "name">;
  type Omit3 = Omit<Person, "age">;

  const shenMiRen: Omit<Person, "name" | "age"> = {};
  const shenMiRen5: Omit<Person, "name" | "age"> = { name: "122" };
  const shenMiRen6: Omit<Person, "name" | "age"> = { name: "122", age: 22 };

  // const shenMiRen1: Omit<Person, "age"> = { name: "122" };
  // const shenMiRen3: Omit<Person, "age"> = { age: 111 };
  // const shenMiRen7: Omit<Person, "age"> = { name: "122", age: 111 };

  // const shenMiRen2: Omit<Person, "name"> = { name: "122" };
  // const shenMiRen4: Omit<Person, "name"> = { age: 111 };
  // const shenMiRen9: Omit<Person, "name"> = { name: "122", age: 111 };

  type PersonKeys = keyof Person; // "name" | "age"

  type PersonPick = Pick<Person, "name" | "age">;
  type PersonOnlyName = Pick<Person, "name">;
  type PersonOnlyAge = Pick<Person, "age">;

  type Age = Exclude<PersonKeys, "name">;
  type Age1 = Omit<Person, "name">;

  type Cat = {
    name: string;
    age: number;
    color: string;
  };
  type CatKeys = keyof Cat; // "name" | "age" | "color"
  type Cat1 = Exclude<Cat, "name">;

  // Partial 的实现
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };
};
