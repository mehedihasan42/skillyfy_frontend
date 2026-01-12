// src/pages/CourseMaterials.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const CourseMaterials = () => {
  const { id } = useParams(); // course id from URL
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {token} = useAuth()

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(
          `https://skillyfy-backend.onrender.com/course/material/?courseId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMaterials(res.data);
      } catch (err) {
        console.log(err)
        setError("Failed to load materials");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Course Materials</h1>

      {materials.length === 0 ? (
        <p className="text-gray-500">No materials found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>

                <div className="badge badge-outline mt-2">
                  {item.file_type}
                </div>

                <div className="card-actions justify-end mt-4">
                  {/* <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  > */}
                    View / Download
                  {/* </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseMaterials;
