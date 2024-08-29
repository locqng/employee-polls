import { SAVE_ANSWER, SAVE_QUESTION } from "../actions/questions";
import { RECEIVE_USERS } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_QUESTION: {
      const { question } = action;
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id]),
        },
      };
    }
    case SAVE_ANSWER:
      const { authedUser, qid, answer } = action;
      let answerObj = state[authedUser].answers;
      answerObj[`${qid}`] = answer;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: answerObj,
        },
      };
    default:
      return state;
  }
}
