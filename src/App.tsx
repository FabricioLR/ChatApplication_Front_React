import { Route, BrowserRouter, Routes } from "react-router-dom"
import Cadastro from "./pages/cadastro/cadastro"
import Login from "./pages/login/login"
import Chat from "./pages/chat/chat"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
