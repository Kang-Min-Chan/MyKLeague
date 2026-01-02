import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Join from "./components/Join";
import Recommend from "./components/Recommend";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </>
  );
}

export default App;