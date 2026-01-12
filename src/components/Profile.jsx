import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const Profile = () => {

    const [courses, setCourses] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            try {

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/course/enrollCourse/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCourses(res.data);
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
            }
        };

        fetchCourses();
    }, []);


    return (
       <div>
        <h1 className='font-bold text-2xl ml-24'>Your courses</h1>
         <div className="w-9/12 mx-auto grid grid-cols-3 mt-3">
            {courses.map((course) => (
                <div className="card card-side bg-base-100 shadow-sm">
                    <figure>
                       <img
                            style={{ width: "100%", height: "200px" }}
                            src={`https://skillyfy-backend.onrender.com${course.banner}`}
                            alt={course.title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{course.title}</h2>
                        <p>{course.description}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/metarial/${course.id}`}>
                                <button className="btn btn-primary">Metarials</button>
                            </Link>
                            <Link to={`/lessons/${course.id}`}>
                                <button className="btn btn-primary">Lessons</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
       </div>
    );
};

export default Profile;