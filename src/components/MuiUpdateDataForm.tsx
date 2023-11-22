import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import API from "../services/api";
type Props = {
  onClose: () => void;
  singlPostData: FormData;
};
type FormData = {
  id: number | null;
  url: string;
  title: string;
  text: string;
};

const MuiUpdateDataForm = ({ onClose, singlPostData }: Props) => {
  const [state, setState] = useState<FormData>(singlPostData);

  useEffect(() => {
    setState(singlPostData);
  }, [singlPostData]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.updatePost(singlPostData.id, state);
    } catch (error) {
      console.error("Error updating post:", error);
    }

    onClose();
  };

  return (
    <div>
      <p>Edit</p>
      <form noValidate autoComplete="off" onSubmit={handleSubmitForm}>
        <div className="flex flex-col gap-y-6">
          <TextField
            fullWidth
            label="Image"
            variant="outlined"
            name="url"
            value={state.id}
            onChange={onChangeHandler}
            InputProps={{
              readOnly: true,
            }}
          />
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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default MuiUpdateDataForm;
