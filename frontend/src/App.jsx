import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Auth from "./screens/Auth";
import MyProjects from "./screens/MyProjects";
import Main from "./screens/Main";
import Welcome from "./screens/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/projects" element={<MyProjects />} />
      <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App