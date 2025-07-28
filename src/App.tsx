import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Login } from "./pages/Login";
import { MovieDetails } from "./pages/MovieDetails";
import { Favorites } from "./pages/Favorites";
import { Layout } from "./layout/Layout";
import { ToasterProvider } from "./components/ToasterProvider";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToasterProvider />
    </Layout>
  );
}

export default App;
