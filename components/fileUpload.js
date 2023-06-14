import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { firebaseStorage } from "../firebase/config";

function FileUploader() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(firebaseStorage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(firebaseStorage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
    </div>
  );
}
export default FileUploader;
