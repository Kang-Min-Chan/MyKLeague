import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Join from "./components/Join";
import Type from "./components/Type";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/Type" element={<Type />} />
      </Routes>
    </>
  );
}

export default App;