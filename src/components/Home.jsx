import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, Links } from "react-router-dom";

const Home = () => {

    const { token } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/course/cards/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCourses(res.data.results);
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="w-9/12 mx-auto grid grid-cols-3 mt-3">
            {courses.map((course) => (
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                            style={{ width: "100%", height: "200px" }}
                            src={course.banner}
                            alt={course.title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{course.title}</h2>
                        <p>{course.description}</p>
                        <p>{course.price}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/course/${course.id}`}>
                                <button className="btn btn-primary">Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
