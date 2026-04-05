import { Route, Routes } from "react-router-dom";
import Homepage from "../../pages/Homepage";
import Developers from "../../pages/Developers";
import Feed from "../../pages/Feed";
import Jobs from "../../pages/Jobs";
import Projects from "../../pages/Projects";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Profile from "../../pages/Profile";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { PublicOnlyRoute } from "../PublicOnlyRoute/PublicOnlyRoute";
import ForgotPassword from "../../pages/ForgotPassword";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    </Routes>
  );
}
