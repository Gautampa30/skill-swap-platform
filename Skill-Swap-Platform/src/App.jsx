import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import UserLogin from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
import Screen4 from "./pages/Screen4";
import RequestPage from "./pages/RequestPage";
import SwapRequest from "./pages/SwapRequest";
import NavBar from "./components/NavBar"; // Update this line
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/userphoto" element={<Screen4 />} />
            <Route path="/requestpage" element={<RequestPage />} />
            <Route path="/swaprequest" element={<SwapRequest />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
