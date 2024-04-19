import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Flow from "./Components/Flow";
import { NodeProvider } from "./contexts/NodeContexts";
import { EdgeProvider } from "./contexts/EdgeContext";
import Navbar from "./Components/Navbar";
import { ArticleProvider } from "./contexts/ArticleContext";

function App() {
  return (
    <>
      <NodeProvider>
        <EdgeProvider>
          <ArticleProvider>
            <Navbar />
            <Flow />
          </ArticleProvider>
        </EdgeProvider>
      </NodeProvider>
    </>
  );
}

export default App;
