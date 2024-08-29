import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Nav = (props) => {
  const { users, authedUser } = props;
  return (
    <nav className="nav">
      <ul>
        <div className="links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leader Board</Link>
          </li>
          <li>
            <Link to="/add">New</Link>
          </li>
        </div>
        <div className="profile">
          <li>
            <img className="avatar" src={users[authedUser]?.avatarURL}></img>
            <p className="user-name">{authedUser}</p>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  users,
  authedUser,
});

export default connect(mapStateToProps)(Nav);
