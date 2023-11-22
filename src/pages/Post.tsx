import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import API from "../services/api";

interface Post {
  // id: number | null;
  title: string;
  text: string;
  url: string;
}
const Post = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string | undefined }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.readPost(id);
        console.log("data: ", data);
        if (data) {
          setPost(data);
        } else {
          console.error("Post data is null or undefined");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <div
        onClick={() => navigate(`/`)}
        className="cursor-pointer bg-blue-300 w-10 text-center rounded-md"
      >
        <KeyboardBackspaceIcon />
      </div>
      <div>
        {loading ? (
          <CircularProgress />
        ) : post ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Text</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <div className="w-[3rem] h-[3rem]">
                      <img src={post.url} alt="image of the post" />
                    </div>
                  </TableCell>
                  <TableCell align="left">{post.title}</TableCell>
                  <TableCell align="left">{post.text}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>Post not found</div>
        )}
      </div>
    </div>
  );
};

export default Post;
