import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
// import { TsReactTest } from "test-use-array";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <TsReactTest /> */}

      {/* 根据user是否有值（是否已登录），显示对应app页面 */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
