import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const { dispatch, users } = props;
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(setAuthedUser(null));
  });

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users[id];
    if (user.password !== password) {
      setPassword("");
      return alert("Login failed. Wrong password");
    }
    alert("Login successfully!");
    setId("");
    setPassword("");
    dispatch(setAuthedUser(id));
    navigate("/home");
  };
  return (
    <div className="center">
      <h1>EMPLOYEE POLLS</h1>
      <h3>Login</h3>
      <form className="login" onSubmit={handleSubmit}>
        <div className="id-select" data-testid="login-box">
          <select
            defaultValue=""
            onChange={handleIdChange}
            data-testid="login-id"
          >
            <option value="" disabled>
              Select a user...
            </option>
            {Object.keys(users).map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          data-testid="login-password"
        />
        <button
          className="btn"
          type="submit"
          disabled={id === "" || password === ""}
          data-testid="login-button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(LoginPage);
