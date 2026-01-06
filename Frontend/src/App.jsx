import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Join from "./components/Join";
import Type from "./components/Type";
import TypeResult from "./components/TypeResult";
import MyInfo from "./components/Myinfo";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/Type" element={<Type />} />
        <Route path="/TypeResult" element={<TypeResult />} />
        <Route path="/Myinfo" element={<MyInfo />} />
      </Routes>
    </>
  );
}

export default App;