import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MuiForm from "./MuiForm";
import MuiUpdateDataForm from "./MuiUpdateDataForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Post {
  id: number | null;
  title: string;
  text: string;
  url: string;
}

type Props = {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
  selectedPost: Post | null;
};

const MuiModal = ({ open, onClose, selectedPost, onClick }: Props) => {
  return (
    <>
      <Button variant="contained" onClick={onClick}>
        CREATE NEW POST
      </Button>

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedPost !== null && selectedPost !== undefined ? (
            <MuiUpdateDataForm onClose={onClose} singlPostData={selectedPost} />
          ) : (
            <MuiForm onClose={onClose} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MuiModal;
