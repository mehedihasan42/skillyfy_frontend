import axios from "axios";

const API__URL = import.meta.env.VITE_API_URL;

export async function courseList(courseData) {
    const response = await axios.get(`${API__URL}/course/cards/`, courseData);
    return response.data;
}
