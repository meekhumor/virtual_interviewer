import React, { useState } from 'react';
import LottieAnimation from '../Lottie';
import animation from './file-upload.json';
import { useNavigate } from "react-router-dom";

export default function Resume() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        localStorage.setItem('resume', reader.result);
        alert('File saved successfully');
        navigate('/cam-permission'); 
      };
      
      reader.readAsDataURL(file); 
    } else {
      setErrorMessage('Please select a file first by clicking on animation');
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl flex flex-col gap-4 items-center bg-darkblue bg-opacity-40 py-14 my-28 rounded-3xl">
      <h1 className="text-white text-3xl text-center">
        Upload a resume to improve your interview
      </h1>
      <p className="text-gray-400 text-center w-4/6 text-sm">
        We&apos;ll use it to generate better questions, relevant to your unique skills and experience.
      </p>

      <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex justify-center items-center overflow-hidden w-56 h-44"> 
          <LottieAnimation animationData={animation} loop={true} />
        </div>
      </label>

      <div className="flex items-center justify-between gap-4 bg-darkblue bg-opacity-40 py-4 px-6 rounded-xl w-4/5">
        <div className="flex items-center gap-4">
          <img
            src="/file-upload.png"
            className="w-8 h-8"
          />
          <p className="text-gray-400 text-sm">
            Click the icon to select files. <br/>Upload PDF or DOCX.
          </p>
        </div>
        
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-blue1 hover:bg-darkblue rounded-xl text-white"
        >
          Upload
        </button>
      </div>

      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
}
