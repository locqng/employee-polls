import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const LeaderBoard = (props) => {
  const navigate = useNavigate();
  const { users, authedUser } = props;
  console.log(users);
  useEffect(() => {
    if (authedUser === null) {
      navigate("/");
    }
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Questions Created</th>
            <th>Question Answered</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(users).map((key) => (
            <tr>
              <td>
                <div className="table-user">
                  <img className="table-image" src={users[key].avatarURL}></img>
                  <div>
                    <p className="table-userName">{users[key].name}</p>
                    <p className="table-userid">{key}</p>
                  </div>
                </div>
              </td>
              <td>{users[key].questions.length}</td>
              <td>{Object.keys(users[key].answers).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  users,
  authedUser,
});

export default connect(mapStateToProps)(LeaderBoard);
