import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const CourseDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourseDetail = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(res.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCourseDetail();
  }, [id, token]);

  // ✅ IMPORTANT FIX
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!course) {
    return <p className="text-center mt-10 text-red-500">Course not found</p>;
  }

  return (
    <div className="card card-side bg-base-100 shadow-sm w-8/12 mx-auto mt-6">
      <figure>
        <img
          style={{ width: "300px", height: "200px" }}
          // className="w-[100%] h-full object-cover"
          src={course.banner}
          alt={course.title}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p>{course.description}</p>
        <p className="font-bold">Price: ৳ {course.price}</p>
        <p>Duration: {course.duration} hours</p>

        <div className="card-actions justify-end">
          <Link to={`/metarial/${course.id}`}>
            <button className="btn btn-primary">Metarials</button>
          </Link>
           <Link to={`/lessons/${course.id}`}>
            <button className="btn btn-primary">Lessons</button>
          </Link>
          <button className="btn btn-primary">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
