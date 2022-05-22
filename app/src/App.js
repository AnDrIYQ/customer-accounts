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
import io from "socket.io-client";

function App() {
  const navigate = useNavigate();
  const { authStore } = useContext(Context);

  useEffect(() => {
      if (localStorage.getItem('app_token')) {
          authStore.checkAuth().then(() => {
              // Socket connect
              const SOCKET_URL = `http://31.131.24.72:3330`;
              const io = require('socket.io-client');
              // Global event bus
              const customer = JSON.parse(atob(localStorage.getItem('app_token')?.split('.')[1])).customer
              const chanel = customer?.id
              if (window.EVENT_BUS) {
                  return false;
              }
              window.EVENT_BUS = io.connect(SOCKET_URL, {
                  query: { roomName: chanel || false }
              });
              window.EVENT_BUS.on('connect', () => {
                  // Subscript on This account events
                  console.log('Connected to Event Bus... ');
              });
              window.EVENT_BUS.on('connected', (data) => {
                  // Subscript on This account events
                  console.log('Connect customer id ==> ' + data);
              });
              window.EVENT_BUS.on('message', (message) => {
                  console.log(message);
              })
              window.EVENT_BUS.on('info', (data) => {
                  console.log(data)
              })
          });
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
