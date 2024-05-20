import { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  id: string;
  question: string;
  answers: AnswerOption[];
}
interface AnswerOption {
  id: string;
  text: string;
}

const RandomQuiz = () => {
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchRandomQuestion = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/random");
        console.log("Response data:", response.data); // Log the response data
        setRandomQuestion(response.data.question);
      } catch (error) {
        console.error("Error fetching random question:", error);
      }
    };

    fetchRandomQuestion()
      .then(() => {
        console.log("Random question fetched successfully.");
      })
      .catch((error) => {
        console.error("Error in fetchRandomQuestion:", error);
      });
  }, []);
  useEffect(() => {}, [randomQuestion]);

  return (
    <div>
      <h2>Random Question</h2>
      {randomQuestion ? (
        <div>
          <p>{randomQuestion.question}</p>
          <ul>
            {randomQuestion.answers.map((answer: AnswerOption) => (
              <li key={answer.id}>{answer.answerOption}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomQuiz;
