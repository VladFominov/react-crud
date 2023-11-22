import { Routes, Route } from "react-router-dom";

import "./App.css";
import Posts from "./components/Posts";
import Post from "./pages/Post";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
