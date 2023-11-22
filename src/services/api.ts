import axios from "axios";

interface Post {
  url: string;
  title: string;
  text: string;
}

const fetchAllPosts = async () => {
  const { data } = await axios.get("https://yourtestapi.com/api/posts/");
  console.log("fetchAllPosts: ", data);
  return data;
};

const createPost = async (body: Post) => {
  const { data } = await axios.post<Post>(
    "https://yourtestapi.com/api/posts/",
    body
  );
  return data;
};

const readPost = async (id: string | undefined): Promise<Post | null> => {
  if (id === undefined) {
    return null;
  }
  try {
    const { data } = await axios.get<Post>(
      `https://yourtestapi.com/api/posts/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error reading post:", error);
    return null;
  }
};

const updatePost = async (id: number | null, body: Post) => {
  const { data } = await axios.put<Post>(
    `https://yourtestapi.com/api/posts/${id}`,
    body
  );
  return data;
};

const deletePost = async (id: number | null) => {
  const { data } = await axios.delete<number>(
    `https://yourtestapi.com/api/posts/${id}`
  );
  return data;
};

const API = {
  fetchAllPosts,
  createPost,
  readPost,
  updatePost,
  deletePost,
};

export default API;
