import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Join from "./components/Join";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  );
}

export default App;