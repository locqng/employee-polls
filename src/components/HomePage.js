import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleReceiveQuestions } from "../actions/questions";
import QuestionBoard from "./QuestionBoard";

const HomePage = (props) => {
  const { loading, user, authedUser, questionIds } = props;
  const navigate = useNavigate();

  const [unfinishedQuestions, setUnifishedQuestions] = useState([]);
  const [finishedQuestions, setFinishedQuestions] = useState([]);
  console.log(user);
  useEffect(() => {
    if (authedUser === null) {
      navigate("/", {state: {previousPage: "/home"}});
    } else {
      setUnifishedQuestions(
        questionIds.filter((x) => !Object.keys(user.answers).includes(x))
      );
      setFinishedQuestions(
        questionIds.filter((x) => Object.keys(user.answers).includes(x))
      );
    }
  }, []);

  return (
    <div>
      {loading === true ? (
        <p>Loading</p>
      ) : (
        <div>
          <QuestionBoard
            questionIds={unfinishedQuestions}
            boardName={"New Question"}
          />
          <br />
          <QuestionBoard questionIds={finishedQuestions} boardName={"Done"} />
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
