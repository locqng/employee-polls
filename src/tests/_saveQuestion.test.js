const api = require("../utils/api");

describe("_saveQuestion() test", () => {
  it("_saveQuestion() success", async () => {
    const optionOneText = "Eat before 8pm";
    const optionTwoText = "Eat after 8pm";
    const question = {
      optionOneText,
      optionTwoText,
      author: "tylermcginnis",
    };
    var result = await api.saveQuestion(question);
    expect(result.author).toBe("tylermcginnis");
    expect(result.optionOne.text).toBe(optionOneText);
    expect(result.optionTwo.text).toBe(optionTwoText);
  });

  it("_saveQuestion() fail", async () => {
    const question = {};

    expect(api.saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
