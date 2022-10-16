import React from "react";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";
// import { TsReactTest } from "test-use-array";

function App() {
  return (
    <div className="App">
      {/* <TsReactTest /> */}
      <LoginScreen />
      {/*<ProjectListScreen />*/}
    </div>
  );
}

export default App;
