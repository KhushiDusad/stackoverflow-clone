import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import StackOverFlow from "./components/StackOverflow";
import Question from "./components/Add-Question/Question";
import ViewQuestion from "./components/View-Question/index";
import Auth from "./components/Auth/index";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  const PrivateRoute = () => {
    return user ? <Outlet /> : <Navigate to="/auth" />;
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "lighter",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <div style={{ display: "flex", flexDirection: "row" , width:"100%"}}>
          <Routes>
            {/* Public route */}
            <Route path="/auth" element={<Auth />} />

            {/* Private routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<StackOverFlow />} />
              <Route path="/add-question" element={<Question />} />
              <Route path="/question" element={<ViewQuestion />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
