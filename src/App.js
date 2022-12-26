import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import JourneyCanvas from "./components/journey-canvas/canvas";
import ContentPage from "./pages/content-page/content_page";
import HomePage from "./pages/home-page/home_page";
// import NonPrivateRoute from "./routes/NonPrivateRoutes";
// import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route path="/journey" element={<JourneyCanvas />} />
        <Route path="/learn" element={<ContentPage />}>
          <Route path=":lesson/:id" element={<ContentPage />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/journey" replace />} />
    </Routes>
  );
}

export default App;
