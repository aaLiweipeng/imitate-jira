import { Form, Input, Select } from "antd";
import { User } from "types/user";

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  // 函数类型， 接收一个param类型的参数
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          placeholder={"项目名"}
          value={param.name}
          onChange={(evt) =>
            // setParam(Object.assign({}, param, {name: evt.target.value}))
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
