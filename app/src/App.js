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
import {CSSTransition, TransitionGroup} from "react-transition-group";
import NotFound from "./views/NotFound/NotFound";
import Messages from "./views/Messages/Messages";
import Customers from "./views/Customers/Customers";
import Tariff from "./views/Tariffs/Tariff";
import Currency from "./views/Currency/Currency";
import Services from "./views/Services/Services";
import Invoices from "./views/Invoices/Invoices";

function App() {
  const { authStore, appStore, notificationsStore, billingStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      window.router = navigate;
      window.notifications = notificationsStore;
      window.app = appStore;
      window.billing = billingStore;
      if (localStorage.getItem('app_token')) {
          authStore.checkAuth().then(() => {
              appStore.updateColor(authStore?.user?.config?.theme_color);
          })
      }
  }, [])

  return (
      <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Routes location={location}>
                  <Route element={<AuthGuard redirectTo="/login" auth={authStore.isAuth} />}>
                      <Route path="/" element={<MainLayout />}>
                          <Route path="/config" element={<Config />} />
                          <Route path="/messages" element={<Messages />} />
                          <Route path="/customers" element={<Customers />} />
                          <Route path="/services" element={<Services />} />
                          <Route path="/currencies" element={<Currency />} />
                          <Route path="/invoices" element={<Invoices />} />
                          <Route path="/tariffs" element={<Tariff />} />
                          <Route path="/" element={<Dashboard />} />
                      </Route>
                  </Route>
                  <Route element={<AuthGuard redirectTo="/" auth={!authStore.isAuth} />}>
                      <Route element={<AuthLayout />} path="/">
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                      </Route>
                  </Route>
                  <Route path="*" element={<AuthLayout />}>
                      <Route path="*" element={<NotFound />} />
                  </Route>
              </Routes>
        </CSSTransition>
      </TransitionGroup>
  );
}

export default observer(App);
