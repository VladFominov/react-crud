import { useEffect, useState } from "react";

// import MuiModal from "./MuiModal";
import CircularProgress from "@mui/material/CircularProgress";
import API from "../services/api";
import MuiTable from "./MuiTable";
import MuiForm from "./MuiForm";

interface Posts {
  id: number | null;
  title: string;
  text: string;
  url: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.fetchAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updatePosts = async () => {
    try {
      const data = await API.fetchAllPosts();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("posts: ", posts);

  const onDeletePost = (postId: number | null) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <section>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          <MuiTable posts={posts} onDeletePost={onDeletePost} />
          <MuiForm updatePosts={updatePosts} />
        </>
      )}
    </section>
  );
};

export default Posts;
