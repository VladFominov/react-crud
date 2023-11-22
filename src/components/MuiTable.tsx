import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import TablePagination from "@mui/material/TablePagination";
import API from "../services/api";
import MuiModal from "./MuiModal";

interface Post {
  id: number | null;
  title: string;
  text: string;
  url: string;
}

type Props = {
  posts: Post[];
  onDeletePost: (postId: number | null) => void;
};
const MuiTable = ({ posts, onDeletePost }: Props) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleUpdatePost = (postId: number | null) => {
    const postToUpdate = posts.find((post) => post.id === postId) || null;
    setSelectedPost(postToUpdate);
    setOpen(true);
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const slicedPosts = posts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDeletePost = async (postId: number | null) => {
    try {
      await API.deletePost(postId);
      onDeletePost(postId);
    } catch (e) {
      console.error("Error deleting post:", e);
    }
  };

  const handleTableRowClick = (postId: number | null) => {
    if (postId !== null) {
      navigate(`/post/${postId}`);
    }
  };

  return (
    <>
      <div className="my-3 ">
        <MuiModal
          open={open}
          onClick={() => handleOpen()}
          onClose={() => setOpen(false)}
          selectedPost={selectedPost}
        />
      </div>
      <div className="w-screen">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span className="font-bold">Id</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold">Image</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold">Title</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold">Text</span>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <span className="font-bold">Action</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedPosts.map((data) => (
                  <TableRow
                    className="cursor-pointer  hover:bg-slate-100"
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleTableRowClick(data.id)}
                  >
                    <TableCell component="th" scope="row">
                      {data.id}
                    </TableCell>
                    <TableCell align="left">
                      <div className="w-[3rem] h-[3rem]">
                        <img src={data.url} alt="image of the post" />
                      </div>
                    </TableCell>
                    <TableCell align="left">{data.title}</TableCell>
                    <TableCell align="left">{data.text}</TableCell>

                    <TableCell align="center">
                      <div className="flex justify-center gap-2">
                        <div
                          className="cursor-pointer "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdatePost(data.id);
                          }}
                        >
                          <CreateIcon />
                        </div>
                        <div
                          className="cursor-pointer "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(data.id);
                          }}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
            component="div"
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default MuiTable;
