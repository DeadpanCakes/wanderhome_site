import { useState } from "react";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
        });
        const data = await res.json();
        console.log(data);
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
