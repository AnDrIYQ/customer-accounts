import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts imports
import MainLayout from "./layouts/MainLayout";

// Routes imports
import Home from "./views/Home/Home";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
      if (localStorage.getItem('app_token')) {
          store.checkAuth();
      }
  })

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default observer(App);
