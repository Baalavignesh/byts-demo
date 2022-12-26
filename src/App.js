import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home-page/home_page";
import WelcomePage from "./pages/welcome-page/welcome_page";
// import NonPrivateRoute from "./routes/NonPrivateRoutes";
// import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/learn/:subject" element={<WelcomePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}

export default App;
