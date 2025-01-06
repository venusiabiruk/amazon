import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Routing from "./Routing";
import { DataContext } from "./components/DataProvider/DataProvider";
import { auth } from "./utils/firebase";
import { Type } from "./utils/action.type";

function App() {
  const [count, setCount] = useState(0);
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </>
  );
}

export default App;
