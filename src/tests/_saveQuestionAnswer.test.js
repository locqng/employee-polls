const api = require("../utils/api");

describe("_saveQuestionAnswer() test", () => {
  it("_saveQuestionAnswer() success", async () => {
    const answer = {
      authedUser: "tylermcginnis",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    };
    var result = await api.saveAnswer(answer);
    expect(result).toBe(true);
  });

  it("_saveQuestionAnswer() fail", async () => {
    const answer = {};

    expect(api.saveAnswer(answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
