import React, { useEffect } from "react";
import Pets from "@mui/icons-material/Pets";
import Home from "./pages/Home";
import Header from "./components/Header";
// import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    document.title = " Pimp my pooch";
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <main>
        <Home />
      </main>
      <div>{/* <Footer />; */}</div>
    </div>
  );
}
