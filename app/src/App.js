import {Routes, Route, useNavigate, useLocation} from "react-router-dom";

// Layouts imports
import MainLayout from "./layouts/MainLayout";

// Routes imports
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Config from "./views/Config/Config";
import AuthGuard from "./guards/AuthGuard";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import {hexToHSL} from "./functions/to-hsl";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function App() {
  const { authStore, appStore } = useContext(Context);
  const location = useLocation();

  useEffect(() => {

      appStore.setColor('#3a3535');
      appStore.updateColor();

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
          });
      }
  })

  return (
      <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Routes location={location}>
                  <Route element={<AuthGuard redirectTo="/login" auth={authStore.isAuth} />}>
                      <Route path="/" element={<MainLayout />}>
                          <Route path="/config" element={<Config />} />
                          <Route path="/" element={<Dashboard />} />
                      </Route>
                  </Route>
                  <Route element={<AuthGuard redirectTo="/" auth={!authStore.isAuth} />}>
                      <Route element={<AuthLayout />} path="/">
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                      </Route>
                  </Route>
              </Routes>
        </CSSTransition>
      </TransitionGroup>

  );
}

export default observer(App);
