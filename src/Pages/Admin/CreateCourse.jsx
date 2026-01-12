import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

const CreateCourse = () => {
  const { token, user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=5f0b75da1ca84a2da06e10cd15e8bfd3`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.data.url; // image URL
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageUrl = await uploadToImgBB(data.banner[0]);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("duration", data.duration);
    formData.append("category", data.category);
    formData.append("banner", imageUrl);
    formData.append("instructor", data.instructor);
    formData.append("is_active", data.is_active || false);

    console.log("FORMDATA ENTRIES:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/course/cards/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("RESPONSE:", res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  //  const teacherResponse = axios.get(`${import.meta.env.VITE_API_URL}/user/teacher_list/`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   console.log(teacherResponse)



  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/course/category/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const titles = res?.data?.map(category => category.title);
      // setCategories(titles);
      setCategories(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

    const fetchTeachersList = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/teacher_list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const titles = res?.data?.map(category => category.title);
      // setCategories(titles);
      setTeachers(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };



  // ✅ Call API properly
  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchTeachersList();
    }
  }, [token]);

  // ✅ Submit handler

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Create Course</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          />
        </div>

        {/* Banner */}
        <div>
          <label className="label">Banner</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("banner", { required: true })}
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            {...register("price", { required: true })}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="label">Duration (hours)</label>
          <input
            type="number"
            step="0.1"
            className="input input-bordered w-full"
            {...register("duration", { required: true })}
          />
        </div>

        {/* Category (Dynamic) */}
        <div>
          <label className="label">Category</label>
          <select
            className="select select-bordered w-full"
            {...register("category", { required: true })}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

        </div>

        {/* Instructor (logged-in user) */}
        <div>
          <label className="label">Instructor</label>
          <select
            className="select select-bordered w-full"
            {...register("instructor", { required: true })}
          >
            <option value="">Select instructor</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.username}
              </option>
            ))}
          </select>

        </div>

        {/* Is Active */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="checkbox" {...register("is_active")} />
          <label>Active</label>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
