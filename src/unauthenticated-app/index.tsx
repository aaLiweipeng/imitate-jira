/**
 * 非登录状态的app【即 登录页】
 */
import React, { useState } from "react";
import { RegisterScreen } from "unauthenticated-app/register";
import { LoginScreen } from "unauthenticated-app/login";
import { Button, Card, Divider } from "antd";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import styled from "@emotion/styled";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    // 这个样式妙！ 直接用Component的形式 来写 CSS样式，绝了！！！
    <Container>
      {/* 头部样式 */}
      <Header />

      {/* 背景样式 */}
      <Background />

      {/* 卡片 */}
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>

        {/* 表单部分 */}
        {isRegister ? <RegisterScreen /> : <LoginScreen />}

        <Divider />
        <LongButton type={"link"} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </LongButton>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

// 背景样式;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom; // 注意排版技巧 指定左下、右下背景图
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover; // 指定左右背景图 大小尺寸
  background-image: url(${left}), url(${right}); // 指定左右背景图 url数据源
`;

// 头部样式
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

// 整体卡片布局
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
