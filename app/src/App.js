import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts imports
import MainLayout from "./layouts/MainLayout";

// Routes imports
import Home from "./views/Home/Home";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainLayout/>}>
                  <Route path="/" element={<Home />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
