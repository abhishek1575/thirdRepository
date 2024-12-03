import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
import {jwtDecode}from 'jwt-decode'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Protected = (props) => {
  let Cmp = props.cmp;
  let role = props.role;
  let accessToken= sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isLoggedIn")) {
       toast.error("Please log in first!", { autoClose: 3000 });
      navigate("/");
    }
    else {
      // Decode JWT token and get expiration time
      
      const decodedToken = jwtDecode(accessToken);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

      // Check if token is expired
      if (Date.now() >= expirationTime) {
        // Token expired, navigate to "/"
        navigate("/");
      }


    if (role !== sessionStorage.getItem("Role").toLowerCase()) {
      navigate("/");
    }
    }
  }, [accessToken, role, navigate]);
  return (
    <>
      <Cmp />
    </>
  );
};
export default Protected;
