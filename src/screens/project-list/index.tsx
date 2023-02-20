import { useState } from "react";
import { useDebounce } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

// 项目列表页面
export const ProjectListScreen = () => {
  // 两个字段合二为一作为一个参数对象
  const [param, setParam] = useState({
    name: "", // 项目名
    personId: "", // 负责人
  });

  const debouncedParam = useDebounce(param, 2000);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  // useMount(() => {
  //   // fetch(`${apiUrl}/users`).then(async (response) => {
  //   //   if (response.ok) {
  //   //     setUsers(await response.json());
  //   //   }
  //   // });
  //   client("users").then(setUsers);
  // });
  const { data: users } = useUsers();

  return (
    <ListContainer>
      <h1>项目列表</h1>

      {/* 搜索框 */}
      <SearchPanel users={users || []} param={param} setParam={setParam} />

      {/* 出错信息处理展示 */}
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}

      {/* 表格列表 */}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ListContainer>
  );
};

const ListContainer = styled.div`
  flex: 1;
  padding: 2rem;
`;
