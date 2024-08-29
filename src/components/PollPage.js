import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { withRouter } from "../utils/helpers";
import { handleCreateAnswer } from "../actions/questions";

const PollPage = (props) => {
  const { user, question, id, dispatch, authedUser } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isDone, setIsDone] = useState(false);
  const [voteOneLength, setVoteOneLength] = useState(0);
  const [voteTwoLength, setVoteTwoLength] = useState(0);
  const [optionDone, setOptionDone] = useState("");

  useEffect(() => {
    if (authedUser === null || user === null) {
      navigate("/", { state: { previousPage: currentPath } });
    }
    if (question !== null && authedUser !== null) {
      setIsDone(Object.keys(authedUser.answers).includes(id));
      if (isDone) {
        setOptionDone(authedUser.answers[id]);
      }
      setVoteOneLength(question?.optionOne?.votes?.length);
      setVoteTwoLength(question?.optionTwo?.votes?.length);
    }
  });

  const handleVote = (e, option) => {
    e.preventDefault();
    setIsDone(true);
    if (option === "optionOne") {
      setVoteOneLength(voteOneLength + 1);
    } else {
      setVoteTwoLength(voteTwoLength + 1);
    }
    dispatch(
      handleCreateAnswer(id, option, () => {
        setOptionDone(option);
      })
    );
  };

  if (question === null) {
    return <h2 className="center">Question not found</h2>;
  }

  return (
    authedUser !== null &&
    question !== null && (
      <div className="center">
        <h2>{`Poll by ${user.id}`}</h2>
        <img
          src={user?.avatarURL}
          alt={`Avatar of ${user.name}`}
          className="avatar"
        />
        <h2>Would you rather</h2>
        <div className="poll-options">
          <div>
            {optionDone === "optionOne" ? (
              <h4 className="option picked">{question?.optionOne?.text}</h4>
            ) : (
              <h4 className="option">{question?.optionOne?.text}</h4>
            )}
            {!isDone ? (
              <button onClick={(e) => handleVote(e, "optionOne")}>Vote</button>
            ) : (
              <div>
                <p>
                  {voteOneLength} {voteOneLength > 1 ? "votes" : "vote"}
                </p>
                <p>
                  {Math.round(
                    (voteOneLength / (voteOneLength + voteTwoLength)) * 100
                  )}
                  %
                </p>
              </div>
            )}
          </div>
          <div>
            {optionDone === "optionTwo" ? (
              <h4 className="option picked">{question?.optionTwo?.text}</h4>
            ) : (
              <h4 className="option">{question?.optionTwo?.text}</h4>
            )}
            {!isDone ? (
              <button onClick={(e) => handleVote(e, "optionTwo")}>Vote</button>
            ) : (
              <div>
                <p>
                  {voteTwoLength} {voteTwoLength > 1 ? "votes" : "vote"}
                </p>
                <p>
                  {Math.round(
                    (voteTwoLength / (voteTwoLength + voteOneLength)) * 100
                  )}
                  %
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = ({ users, questions, authedUser }, props) => {
  if (!authedUser) {
    return {
      authedUser,
    };
  }
  const { id } = props.router.params;
  const question = questions[id];
  if (!question) {
    return {
      question: null,
    };
  }

  const user = users[question.author];
  return {
    question: questions[id],
    authedUser: users[authedUser],
    user,
    users,
    id,
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));
