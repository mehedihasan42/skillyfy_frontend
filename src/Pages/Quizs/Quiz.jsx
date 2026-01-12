import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

const Quiz = () => {
  const { lessonId } = useParams();
  const { token } = useAuth();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState({}); // { [quizId]: true/false }
  const [results, setResults] = useState({}); // { [quizId]: result }

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/quiz/${lessonId}/quizzes/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuizzes(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [lessonId, token]);

  const onSubmit = (quizId) => async (data) => {
    try {
      // submit all answers for this quiz
      const requests = Object.keys(data).map((questionId) =>
        axios.post(
          `${import.meta.env.VITE_API_URL}/quiz/submit/`,
          {
            question: questionId,
            selected_option: data[questionId],
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      );

      await Promise.all(requests);

      // fetch result for this quiz
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/quiz/result/${quizId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResults((prev) => ({ ...prev, [quizId]: res.data }));
      setSubmitted((prev) => ({ ...prev, [quizId]: true }));
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="mb-10">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <p className="mb-6 text-gray-500">{quiz.description}</p>

          {!submitted[quiz.id] ? (
            <form onSubmit={handleSubmit(onSubmit(quiz.id))} className="space-y-6">
              {quiz.questions.map((q, index) => (
                <div key={q.id} className="card bg-base-100 shadow p-4">
                  <h2 className="font-semibold mb-3">
                    {index + 1}. {q.text}
                  </h2>

                  {q.options.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={opt.id}
                        {...register(`${q.id}`, { required: true })}
                        className="radio radio-primary"
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>
              ))}

              <button className="btn btn-primary w-full">Submit Quiz</button>
            </form>
          ) : (
            results[quiz.id] && (
              <div className="card bg-base-100 shadow p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Result 🎉</h2>
                <p>Total Questions: {results[quiz.id].total_questions}</p>
                <p>Correct Answers: {results[quiz.id].correct_answers}</p>
                <p className="text-xl font-semibold mt-2">Score: {results[quiz.id].score}</p>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Quiz;
