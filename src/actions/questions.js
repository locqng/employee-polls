import { getQuestions, saveAnswer, saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTION";
export const SAVE_QUESTION = "CREATE_QUESTION";
export const SAVE_ANSWER = "CREATE_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function createQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}

function createAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleCreateQuestion(question, cb) {
  return (dispatch) => {
    return saveQuestion(question)
      .then((q) => {
        dispatch(createQuestion(q));
        cb();
      })
      .catch((e) => {
        console.warn("Error in handling handleSaveQuestion: ", e);
        alert("There was an error saving the question. Please try again.");
      });
  };
}

export function handleCreateAnswer(qid, answer, cb) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(createAnswer({ authedUser, qid, answer }));
        cb();
      })
      .catch((e) => {
        console.warn("Error in handling handleCreateAnswer: ", e);
        alert("There was an error saving the answer. Please try again.");
      });
  };
}
