import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import API from "../services/api";
type Props = {
  onClose: () => void;
};
type FormData = {
  url: string;
  title: string;
  text: string;
};
const initialState = {
  url: "",
  title: "",
  text: "",
};
const MuiForm = ({ onClose }: Props) => {
  const [state, setState] = useState<FormData>(initialState);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(state).some((value) => value.trim() === "")) {
      alert("Form cannot be empty!");
    } else {
      setState(initialState);
    }
    try {
      await API.createPost({
        title: state.title,
        text: state.text,
        url: state.url,
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setState(initialState);
    onClose();
  };

  return (
    <div>
      <p>Create a new post</p>
      <form noValidate autoComplete="off" onSubmit={handleSubmitForm}>
        <div className="flex flex-col gap-y-6">
          <TextField
            fullWidth
            label="Image"
            variant="outlined"
            name="url"
            value={state.url}
            onChange={onChangeHandler}
          />
          {}
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            name="title"
            value={state.title}
            onChange={onChangeHandler}
          />
          <TextField
            fullWidth
            label="Text"
            variant="outlined"
            name="text"
            value={state.text}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex justify-end items-center gap-1 mt-6">
          <Button onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">Create a new post</Button>
        </div>
      </form>
    </div>
  );
};

export default MuiForm;
