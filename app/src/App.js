import { Routes, Route, useNavigate } from "react-router-dom";

// Layouts imports
import MainLayout from "./layouts/MainLayout";

// Routes imports
import Home from "./views/Home/Home";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Config from "./views/Config/Config";
import AuthGuard from "./guards/AuthGuard";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";

function App() {
  const navigate = useNavigate();
  const { authStore } = useContext(Context);

  useEffect(() => {
      if (localStorage.getItem('app_token')) {
          authStore.checkAuth().then(() => navigate(1));
      }
  })

  return (
      <Routes>
          <Route element={<AuthGuard redirectTo="/login" auth={authStore.isAuth} />}>
              <Route path="/" element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/config" element={<Config />} />
              </Route>
          </Route>
          <Route element={<AuthGuard redirectTo="/" auth={!authStore.isAuth} />}>
              <Route element={<AuthLayout />} path="/">
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              </Route>
          </Route>
      </Routes>
  );
}

export default observer(App);
