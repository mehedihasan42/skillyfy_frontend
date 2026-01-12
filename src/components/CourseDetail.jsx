import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const CourseDetail = () => {
  const { id } = useParams();
  const { token,user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  // 🔹 Fetch course details
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

  // 🔹 Check enrollment (AFTER course is loaded)
  useEffect(() => {
    if (!course) return;

    const checkEnrollment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/is_enrolled/${course.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnrolled(res.data.enrolled);
        if (res.data.enrolled) {
          Swal.fire("You are already enrolled in this course. See all lessons and materials.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkEnrollment();
  }, [course, token]);

  // 🔹 Payment handler
  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/course/buy-course/${course.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = res.data.payment_url;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // 🔹 UI states
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

   if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
       Only loged in user can see course details. Please login first for see course details.
      </p>
    );
  }

  if (!course) {
    return (
      <p className="text-center mt-10 text-red-500">
        Course not found
      </p>
    );
  }

  return (
    <div className="card card-side bg-base-100 shadow-sm w-8/12 mx-auto mt-6">
      <figure>
        <img
          style={{ width: "300px", height: "200px" }}
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
          {enrolled ? (
            <>
              <Link to={`/metarial/${course.id}`}>
                <button className="btn btn-primary">Materials</button>
              </Link>

              <Link to={`/lessons/${course.id}`}>
                <button className="btn btn-primary">Lessons</button>
              </Link>
            </>
          ) : (
            <button onClick={handlePayment} className="btn btn-primary">
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
