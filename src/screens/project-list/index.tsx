import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /* 出错信息处理展示 */
  const [error, setError] = useState<null | Error>(null);

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
    setIsLoading(true);
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setList([]); // 错误时清空展示
        setError(error);
      })
      .finally(() => setIsLoading(false));

    // 用到了 debouncedParam，却没有依赖 debouncedParam，ts会报错，这里要加注释
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      {/* 搜索框 */}
      <SearchPanel users={users} param={param} setParam={setParam} />

      {/* 出错信息处理展示 */}
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}

      {/* 表格列表 */}
      <List loading={isLoading} users={users} dataSource={list} />
    </ListContainer>
  );
};

const ListContainer = styled.div`
  flex: 1;
  padding: 2rem;
`;
