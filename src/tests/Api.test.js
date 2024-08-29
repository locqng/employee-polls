const api = require("../utils/api");

describe("api", () => {
  it("_saveQuestion() success", async () => {
    const optionOneText = "Eat before 8pm";
    const optionTwoText = "Eat after 8pm";
    const question = {
      optionOneText,
      optionTwoText,
      author: "loc",
    };
    var result = await api.saveQuestion(question);
    expect(result.author).toBe("loc");
    expect(result.optionOne.text).toBe(optionOneText);
    expect(result.optionTwo.text).toBe(optionTwoText);
  });

  it("_saveQuestion() fail", async () => {
    const question = {};

    expect(api.saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("_saveAnswer() fail", async () => {
    const answer = {};

    expect(api.saveAnswer(answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });

  it("_saveAnswer() success", async () => {
    const answer = {
      authedUser: "tylermcginnis",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    };
    var result = await api.saveAnswer(answer);
    expect(result).toBe(true);
  });
});
