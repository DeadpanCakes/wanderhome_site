import { useState, useEffect } from "react";

const useAuth = () => {
  const [jwt, setJWT] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const refreshJWT = async () => {
    const body = JSON.stringify({ refresh: refreshToken });
    const response = await fetch("/api/auth/refresh", { method: "POST", body });
    const data = await response.json();
    if (data.code === "token_not_valid") {
      //redirect to /admin
    }
    setRefreshToken(data.refresh);
  };

  useEffect(() => {
    const storedJWT = localStorage.getItem("jwt");
    if (jwt !== storedJWT) {
      localStorage.setItem("jwt", jwt);
    }
  }, [jwt]);
  useEffect(() => {
    const storedRefresh = localStorage.getItem("refresh");
    if (refreshToken !== storedRefresh) {
      localStorage.setItem("refresh", refreshToken);
    }
  }, [refreshToken]);

  return { jwt, setJWT, setRefreshToken, refreshJWT };
};

export default useAuth;
