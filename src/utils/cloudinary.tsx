import axios from "axios";

export const upload = async (file: File): Promise<string> => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", "ml_default");
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/upload`,
    fd,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: false
    }
  );

  return data.secure_url || data.url;
};
