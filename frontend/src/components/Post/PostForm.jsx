import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";



const PostForm = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState(null);
  const { user } = useSelector((state) => state.auth);


  const handlePost = async (e) => {
    e.preventDefault()

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ddphqky8w/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newPost = {
        user: user._id,
        text,
        img: url,
      };
      await axios.post("/api/post", newPost);
    } catch (err) {
      console.log(err.message);
    }
  };

 


  return (
    <div className="form__post">
      <form onSubmit={handlePost}>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label className="file__text">Choose an image</label>
        <input
        className="file"
          type="file"
          id="file"
          accept=".png,.jpeg,.jpg,Screenshot"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn__post">make a post</button>
      </form>
    </div>
  );
};

export default PostForm;
