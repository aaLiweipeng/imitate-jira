import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  // 两个字段合二为一作为一个参数对象
  const [param, setParam] = useState({
    name: "", // 项目名
    personId: "", // 负责人
  });

  const debouncedParam = useDebounce(param, 2000);
  // 项目列表
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    // input或select值 有变化时，获取项目列表
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
    client("users").then(setUsers);
  });

  return (
    <ListContainer>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </ListContainer>
  );
};

const ListContainer = styled.div`
  flex: 1;
  padding: 2rem;
`;
