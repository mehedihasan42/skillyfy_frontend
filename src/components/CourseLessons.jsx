import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const CourseLessons = () => {
  const { id } = useParams(); // course id from URL
  const { token } = useAuth();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/lesson/`,
          {
            params: { courseId: id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLessons(res.data);
      } catch (err) {
        console.log(err)
        setError(err.response?.data?.details || "Access denied");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-xl mx-auto mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Lessons for Course #{id}
      </h1>

      {lessons.length === 0 ? (
        <div className="alert alert-info">
          No lessons found for this course.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{lesson.title}</h2>
                <p className="text-sm text-gray-600">
                  {lesson.description}
                </p>
                <Link
                  to={`/lesson/${lesson.id}/quizzes`}
                  className="btn btn-primary mt-4 w-10"
                >
                  Quiz
                </Link>
                <div className="card-actions justify-end mt-4">
                  <video
                    controls
                    className="w-full rounded"
                    src={lesson.video}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseLessons;
