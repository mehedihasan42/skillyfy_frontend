import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API, { setToken } from "../../api";

const QuizResultPage = () => {
    const { id } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setToken(token);

        API.get(`/quiz/result/${id}/`)
            .then((res) => setResult(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!result) return <p>Loading result...</p>;

    return (
        <div className="max-w-md mx-auto p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Result</h1>
            <p>Total Questions: {result.total_questions}</p>
            <p>Correct Answers: {result.correct_answers}</p>
            <p className="text-xl font-semibold my-4">Score: {result.score}</p>
            <Link
                to="/"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default QuizResultPage;
