import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ActorPage from "./pages/Actor";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/actor" element={<ActorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
