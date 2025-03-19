import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <HashRouter>
      <App />
    </HashRouter>
  );
} else {
  console.error("Root element not found");
}
