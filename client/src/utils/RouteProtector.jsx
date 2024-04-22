import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RouteProtector = (props) => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUser = () => {
    const user = localStorage.getItem("currentUser");
    if (!user || user === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUser();
  }, [isLoggedIn]);


  
  return (
    <>
    {isLoggedIn ? props.children : null}
    </>

  )
};
export default RouteProtector;
