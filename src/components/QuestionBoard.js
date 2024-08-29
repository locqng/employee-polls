import { connect } from "react-redux";
import Question from "./Question";
const QuestionBoard = (props) => {
  const { boardName, questionIds } = props;
  return (
    <div>
      <h3>{boardName}</h3>
      <hr />
      <div className="question-board">
        {questionIds.map((id) => (
          <Question key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default connect()(QuestionBoard);
