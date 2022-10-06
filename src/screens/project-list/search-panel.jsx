import { useEffect, useState } from "react";

export const SearchPanel = () => {
  // 两个字段合二为一作为一个参数对象
  const [param, setParam] = useState({
    name: "", // 项目名
    personId: "", // 负责人
  });

  const [users, setUsers] = useState([])
  // 项目列表
  const [list, setList] = useState([])

  useEffect(() => {
    // input或select值 有变化时，获取项目列表
    fetch('').then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])
  
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            // setParam(Object.assign({}, param, {name: evt.target.value}))
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />

        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value={''}>负责人</option>
          {
            users.map(user => <option value={user.id}>{user.name}</option>)
          }
        </select>
      </div>
    </form>
  );
};
