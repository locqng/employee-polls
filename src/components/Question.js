import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const Question = (props) => {
  const navigate = useNavigate();
  const { question } = props;

  const toPoll = (e, id) => {
    e.preventDefault();
    navigate(`/question/${id}`);
    //Redirect to parent tweet
  };

  if (question === null) {
    return null;
  }
  return (
    <div className="question-box">
      <h3>{question.author}</h3>
      <p>{formatDate(question.timestamp)}</p>
      <hr />
      <button className="btn" onClick={(e) => toPoll(e, question.id)}>
        Show
      </button>
    </div>
  );
};

const mapStateToProps = ({ questions }, { id }) => {
  const question = questions[id];
  return {
    question: question,
  };
};

export default connect(mapStateToProps)(Question);
