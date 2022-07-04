import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Login from "./Login";
import Cadastro from "./Cadastro";
import MainScreen from "./MainScreen";
import UserContext from "./UserContext";

function App() {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  
  return (
    <UserContext.Provider value={{userData, setUserData, userName, setUserName}}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/mainScreen" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;