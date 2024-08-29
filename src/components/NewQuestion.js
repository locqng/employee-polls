import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleCreateQuestion } from "../actions/questions";
import { useNavigate, useLocation } from "react-router-dom";

const NewQuestions = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { dispatch, authedUser } = props;
  const [optOneText, setOptOneText] = useState("");
  const [optTwoText, setOptTwoText] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (authedUser === null) {
      navigate("/", { state: { previousPage: currentPath } });
    }
  }, []);

  const handleOptOneChange = (e) => {
    setOptOneText(e.target.value);
    setDisableButton(e.target.value.trim() === "");
  };

  const handleOptTwoChange = (e) => {
    setOptTwoText(e.target.value);
    setDisableButton(e.target.value.trim() === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const optionOneText = optOneText;
    const optionTwoText = optTwoText;
    setDisableButton(true);
    dispatch(
      handleCreateQuestion(
        { optionOneText, optionTwoText, author: authedUser },
        () => {
          setOptOneText("");
          setOptTwoText("");
          navigate("/home");
        }
      )
    );
  };

  return (
    <div className="center">
      <h1>Would you rather</h1>
      <form className="new-question-form" onSubmit={handleSubmit}>
        <h4>First Option</h4>
        <input
          value={optOneText}
          onChange={(e) => handleOptOneChange(e)}
          placeholder="Option One"
          data-testid="text-option-one"
        />
        <h4>Second Option</h4>
        <input
          value={optTwoText}
          onChange={(e) => handleOptTwoChange(e)}
          placeholder="Option Two"
          data-testid="text-option-two"
        />
        <button
          className="btn"
          type="submit"
          disabled={disableButton}
          data-testid="submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users, questions, authedUser }) => {
  return {
    questions,
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(NewQuestions);
