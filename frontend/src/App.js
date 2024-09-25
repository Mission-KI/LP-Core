import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AppLayout from "./layouts/AppLayout";
import DatasetDetails from "./pages/DatasetDetails/DatasetDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/details/:slug" element={<DatasetDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;