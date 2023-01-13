import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import JourneySvg from "./components/journey-svg/journey-svg";
import ContentPage from "./pages/content-page/content_page";
import HomePage from "./pages/home-page/home_page";
// import NonPrivateRoute from "./routes/NonPrivateRoutes";
// import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route path="/journey" element={<JourneySvg />} />
        <Route path="/learn" element={<ContentPage />}>
          <Route path=":lesson/:id" element={<ContentPage />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/journey" replace />} />
    </Routes>
  );
}

export default App;
