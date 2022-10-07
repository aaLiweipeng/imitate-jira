import { useEffect, useState } from "react";
import { cleanObject } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  // 两个字段合二为一作为一个参数对象
  const [param, setParam] = useState({
    name: "", // 项目名
    personId: "", // 负责人
  });

  // 项目列表
  const [list, setList] = useState([]);

  useEffect(() => {
    // input或select值 有变化时，获取项目列表
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(param))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, [])

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
