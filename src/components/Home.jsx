import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
    const { token } = useAuth();

    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");

    // 🔹 Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/course/category/`
            );
            setCategories(res.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    // 🔹 Fetch courses (category-wise)
    const fetchCourses = async (categoryId = "", searchText = "") => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/course/cards/`,
                {
                    params: {
                        ...(categoryId && { category: categoryId }),
                        ...(searchText && { search: searchText }),
                    },
                }
            );

            setCourses(res.data.results);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };



    // load categories
    useEffect(() => {
        fetchCategories();
    }, []);

    // load courses when category changes
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchCourses(selectedCategory, search);
        }, 500);

        return () => clearTimeout(delay);
    }, [token, selectedCategory, search]);

    return (
        <div>
            <label className="input m-2">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </label>
            <select
                className="select select-bordered"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Courses</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.title}
                    </option>
                ))}
            </select>

            {/* 📦 Course Cards */}
            <div className="w-8/12 mx-auto grid grid-cols-3 gap-4 mt-3">
                {courses.map((course) => (
                    <div key={course.id} className="card bg-base-100 shadow-sm">
                        <figure>
                            <img
                                style={{ width: "100%", height: "200px" }}
                                src={course.banner}
                                alt={course.title}
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">{course.title}</h2>
                            <p>{course.description}</p>
                            <p>৳ {course.price}</p>

                            <div className="card-actions justify-end">
                                <Link to={`/course/${course.id}`}>
                                    <button className="btn btn-primary">Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
