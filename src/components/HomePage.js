import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionBoard from "./QuestionBoard";

const HomePage = (props) => {
  const { loading, user, authedUser, questionIds } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [unfinishedQuestions, setUnifishedQuestions] = useState([]);
  const [finishedQuestions, setFinishedQuestions] = useState([]);
  const [toggleAnswered, setToggleAnswered] = useState(false);

  useEffect(() => {
    if (authedUser === null) {
      navigate("/", { state: { previousPage: currentPath } });
    } else {
      setUnifishedQuestions(
        questionIds.filter((x) => !Object.keys(user.answers).includes(x))
      );
      setFinishedQuestions(
        questionIds.filter((x) => Object.keys(user.answers).includes(x))
      );
    }
  }, []);

  const handleToggle = (e) => {
    setToggleAnswered(e.target.checked);
  };

  return (
    <div>
      {loading === true ? (
        <p>Loading</p>
      ) : (
        <div>
          <div className="slider-block">
            <p>Answered Questions</p>
            <label class="switch">
              <input type="checkbox" onChange={handleToggle} />
              <span class="slider round"></span>
            </label>
          </div>
          {!toggleAnswered && (
            <QuestionBoard
              questionIds={unfinishedQuestions}
              boardName={"New Questions"}
            />
          )}
          {toggleAnswered && (
            <QuestionBoard
              questionIds={finishedQuestions}
              boardName={"Answered Questions"}
            />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ users, questions, authedUser }) => ({
  loading: questions === null,
  user: users[authedUser],
  authedUser,
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
});

export default connect(mapStateToProps)(HomePage);
