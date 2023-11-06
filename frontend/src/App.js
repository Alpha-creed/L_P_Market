import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProductInfo from "./Pages/ProductInfo";
import Profile from "./Pages/Profile";

function App() {
  const  {loading } = useSelector((state)=>state.loader);

  return (
    <div>
      {loading && <Spinner/>}
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedPage>
              <Home />
             </ProtectedPage>
          }
        />
        <Route
          path="/login"
          element={
            // <ProtectedPage>
              <Login />
            //  </ProtectedPage>
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
          path="/profile"
          element={
            <ProtectedPage>
              <Profile />
            </ProtectedPage>
          }
        />
          <Route
          path="/product/:id"
          element={
            <ProtectedPage>
              <ProductInfo />
            </ProtectedPage>
          }
        />
        <Route
          path="/register"
          element={
            // <ProtectedPage>
              <Register />
            //  </ProtectedPage>
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
