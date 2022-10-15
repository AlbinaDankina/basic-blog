import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.min.css";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/app/App";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);
