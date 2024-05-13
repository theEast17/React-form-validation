import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    usernameError: false,
    emailError: false,
    passwordError: false,
  });

  const getErrorMessage = (fieldName) => {
    switch (fieldName) {
      case "username":
        return "Username must be 4-16 characters and can contain letters, numbers, hyphens, and underscores.";
      case "email":
        return "Please enter a valid email address.";
      case "password":
        return "Password must be 8-20 characters and include at least one lowercase letter, one uppercase letter, and one digit.";
      default:
        return "";
    }
  };

  const validRegex = (tagName) => {
    return setError((prev) => ({
      ...prev,
      [tagName]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.username === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      console.log("Please fill out all fields.");
      return;
    }
    let nameRegex = /^[a-zA-Z0-9_-]{4,16}$/;
    let emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

    if (!nameRegex.test(formData.username)) {
      validRegex("usernameError");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      validRegex("emailError");
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      validRegex("passwordError");
      return;
    }
    console.log("Form submitted:", formData);
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const inputValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setError((prev) => ({
      ...prev,
      [`${name}Error`]: false,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="enter a name"
        onChange={inputValue}
        aria-label="Username"
        value={formData.username}
      />
      {error.usernameError && (
        <span style={{ color: "red" }}>{getErrorMessage("username")}</span>
      )}
      <input
        type="email"
        name="email"
        placeholder="enter a mail"
        onChange={inputValue}
        aria-label="Email"
        value={formData.email}
      />
      {error.emailError && (
        <span style={{ color: "red" }}>{getErrorMessage("email")}</span>
      )}
      <input
        type="text"
        name="password"
        placeholder="enter a password"
        onChange={inputValue}
        aria-label="Password"
        value={formData.password}
      />
      {error.passwordError && (
        <span style={{ color: "red" }}>{getErrorMessage("password")}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
