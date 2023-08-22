import { Route, Routes } from "react-router-dom";
import AutorizePage from "./pages/autorizePage/AutorizePage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import UserPage from "./pages/userPage/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AutorizePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user_page" element={<UserPage />} />
    </Routes>
  );
}

export default App;
