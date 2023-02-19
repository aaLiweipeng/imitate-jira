import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Project } from "types/project";
import { User } from "types/user";

interface ListProps extends TableProps<Project> {
  users: User[];
}

// type PropsType = Omit<ListProps, 'users'> // 即 TableProps<Project>
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      style={{ margin: 10 }}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {/* users里边找找有没跟  project.personId 相同的id，有就返回这个user*/}
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
