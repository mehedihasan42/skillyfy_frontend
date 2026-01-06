import axios from "axios";

const API__URL = import.meta.env.VITE_API_URL;



export async function createCourses(courseData) {
    const token = localStorage.getItem("accessToken"); // Move inside the function
    const response = await axios.post(
        `${API__URL}/course/cards/`,
        courseData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}


export async function getCategories() {
    const token = localStorage.getItem("accessToken");
    console.log(token)
    const response = await axios.get(
        `${API__URL}/course/category/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}
