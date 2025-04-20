import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return alert("No image selected");

    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
        console.log("File available at", downloadURL);
      });
    });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>

      {url && (
        <div>
          <p>Image uploaded:</p>
          <img src={url} alt="uploaded" width="300" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
