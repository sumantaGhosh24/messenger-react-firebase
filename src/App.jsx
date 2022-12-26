import React, {useContext} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import {AuthContext} from "./context/AuthContext";
import {GroupManage, Home, Login, Message, NotFound, Register} from "./pages";

const App = () => {
  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="login" />;
  };

  const GuestAuth = ({children}) => {
    return currentUser ? <Navigate to="/" /> : children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/register"
            element={
              <GuestAuth>
                <Register />
              </GuestAuth>
            }
          />
          <Route
            path="/login"
            element={
              <GuestAuth>
                <Login />
              </GuestAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
