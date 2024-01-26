import {
  RouterProvider
} from "react-router-dom";
import './App.css'
import router from "./router";
import Context from "./component/context";
import { useState } from "react";





function App() {
  const [user,setUser] = useState("")

  const globalValues = {
    user: user,
    setUser: (value) => {
      setUser(value);
    },
  };


  return (
    <>
      <Context.Provider value={globalValues}>
        <RouterProvider router={router} />
      </Context.Provider>
    </>
  )
}

export default App
