import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <HashRouter>
    <App />
  </HashRouter>
);
