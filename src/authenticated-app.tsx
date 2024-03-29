/**
 * 已登录状态的app
 */
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";
// import { Navigate, Route, Routes } from "react-router";
// import { BrowserRouter as Router } from "react-router-dom";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 *
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般【不固定】),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 *            用flex
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 *            用grid
 */

export const AuthenticatedApp = () => {
  return (
    <Container>
      {/* <Router> */}
      <PageHeader />

      <Main>
        <ProjectListScreen />
        {/* <Routes> */}
        {/* 项目管理页 */}
        {/* <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} /> */}
        {/* </Routes> */}
      </Main>
      {/* <ProjectModal /> */}
      {/* </Router> */}
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        {/* <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding> */}
        {/* <ProjectPopover />
        <UserPopover /> */}
        <h2>12</h2>
        <h2>23</h2>
        <h2>34</h2>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    // overlay 即 hover时的 下拉内容
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      {/* 用于防止页面重新刷新 */}
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1); // 阴影边框
  z-index: 1; // 配合阴影边框
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
  padding: 2rem;
`;
