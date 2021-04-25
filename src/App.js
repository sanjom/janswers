import React from "react";
import "./App.css";

const PROMPT = "J, please answer the following question:";

const getAnswer = (answer) => answer || "Error - Stupid person detected!";

const App = () => {
  const [question, setQuestion] = React.useState("");
  const [secret, setSecret] = React.useState("");

  const [isAnswerVisible, setAnswerVisible] = React.useState(false);

  const answer = secret.split(".")[1];
  const prompt =
    secret.substring(0, 1) === "."
      ? PROMPT.substring(0, secret.length)
      : secret;
  const isButtonDisabled = !question || prompt !== PROMPT;

  const handleClear = () => {
    setQuestion("");
    setSecret("");
    setAnswerVisible(false);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handlePromptChange = (e) => {
    const { value } = e.target;
    const newPart = value.substring(secret.length);
    const newSecret = `${secret}${newPart}`.substring(0, value.length);
    setSecret(newSecret);
  };

  return (
    <div className="App">
      <p>What's your question?</p>
      <input
        className="App-input"
        value={question}
        onChange={handleQuestionChange}
        disabled={isAnswerVisible}
      />
      <p>Now, write "{PROMPT}"</p>
      <input
        className="App-input"
        value={prompt}
        onChange={handlePromptChange}
        disabled={isAnswerVisible}
      />
      {!isAnswerVisible ? (
        <button
          className="App-button"
          onClick={() => setAnswerVisible(true)}
          disabled={isButtonDisabled}
        >
          Get the Answer
        </button>
      ) : (
        <button className="App-button" onClick={handleClear}>
          Ask another question
        </button>
      )}
      <span className="App-answer">
        {isAnswerVisible && (
          <div>
            <span>Answer:</span>
            <span>{` ${getAnswer(answer)}`}</span>
          </div>
        )}
      </span>
    </div>
  );
};

export default App;
