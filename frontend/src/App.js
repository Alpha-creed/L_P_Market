import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedPage>
              <Home />
            // </ProtectedPage>
          }
        />
        <Route
          path="/login"
          element={
            // <ProtectedPage>
              <Login />
            // </ProtectedPage>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedPage>
              <Admin />
            </ProtectedPage>
          }
        />
        <Route
          path="/register"
          element={
            // <ProtectedPage>
              <Register />
            // </ProtectedPage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
