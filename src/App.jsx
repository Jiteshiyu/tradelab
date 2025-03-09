import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { auth } from "./firebase";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("🔥 App Mounted, Checking Auth State...");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ User is already signed in:", user);
      } else {
        console.log("❌ No user signed in. Checking redirect result...");

        getRedirectResult(auth)
          .then((result) => {
            if (result?.user) {
              console.log("✅ Redirect Result Found:", result.user);
            } else {
              console.log("❌ No redirect result found");
            }
          })
          .catch((error) => {
            console.log("❌ Error after redirect:", error.message);
          });
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
