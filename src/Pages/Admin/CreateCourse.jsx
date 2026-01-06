import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

const CreateCourse = () => {
  const { token, user } = useAuth();
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("duration", data.duration);
  formData.append("category", data.category); // MUST be ID
  formData.append("banner", data.banner[0]); // FILE
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



  // ✅ Call API properly
  useEffect(() => {
    if (token) {
      fetchCategories();
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
          <input
            type="text"
            className="input input-bordered w-full"
            value={user?.username || ""}
            disabled
          />
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
