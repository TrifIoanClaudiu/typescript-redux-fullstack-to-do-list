import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Tasks from "./pages/Tasks";

const App: FC = () => {
  const user = useSelector((state: RootState) => state.user?.currentUser);

  const RedirectToWelcome = () => <Navigate to="/" />;

  return (
    <Router>
      <Routes>
        {user && <Route path="/register" element={<RedirectToWelcome />} />}
        {user && <Route path="/login" element={<RedirectToWelcome />} />}
        {user && <Route path="/" element={<Tasks />} />}
        {!user && <Route path="/register" element={<Register />} />}
        {!user && <Route path="/login" element={<Login />} />}
        {!user && <Route path="/" element={<Login />} />}
      </Routes>
    </Router>
  );
};

export default App;
