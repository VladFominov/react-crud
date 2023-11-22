import React, { useEffect, useState } from "react";

import MuiModal from "./MuiModal";
import CircularProgress from "@mui/material/CircularProgress";
import API from "../services/api";
import MuiTable from "./MuiTable";

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

  console.log("posts: ", posts);

  const onDeletePost = (postId: number | null) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <section>
      <div>
        <MuiModal />
      </div>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <MuiTable posts={posts} onDeletePost={onDeletePost} />
      )}
    </section>
  );
};

export default Posts;
