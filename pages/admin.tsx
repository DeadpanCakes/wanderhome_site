import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setJWT, setRefreshToken } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    setJWT(data.access);
    setRefreshToken(data.refresh);
    router.push("/cms");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button>Submit</button>
    </form>
  );
};

export default Admin;
