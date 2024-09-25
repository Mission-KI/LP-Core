import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AppLayout from "./layouts/AppLayout";
import DatasetDetails from "./pages/DatasetDetails/DatasetDetails";
import LandingLayout from "./layouts/LandingLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/' element={<AppLayout />}>
          <Route path="/details/:slug" element={<DatasetDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;