import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/Pin.context";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("")
const [pin, setPin] = useState("")


  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };


  const {addPin} =PinData(); 
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("title",title);
  formData.append("pin",pin);
  formData.append("file",file);

  const addPinHandler =(e)=>{
    e.preventDefault();
    addPin(formData,setFilePrev,setFile,setTitle,setPin,navigate)

  }
  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
        <div className="flex justify-center items-center">
          <div className="shadow-lg rounded-lg p-6 bg-white flex flex-col items-center justify-center w-80 h-auto">
            {filePrev && <img src={filePrev} alt="" />}

            <div
              onClick={handleClick}
              className=" cursor-pointer flex flex-col items-center justify-center h-full"
            >
              <input
                onChange={changeFileHandler}
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <div className=" rounded-full w-12 h-12 mb-4 flex items-center justify-center bg-gray-200">
                <FaPlus />
              </div>
              <p className="text-gray-500">Choose a file </p>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              {" "}
              we recommend using high quality .jpg files but less than 8mb
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center bg-gray-100">
            <form  onSubmit={addPinHandler}   className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  id="title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300
                            rounded-md shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pin"
                  className="block text-sm font-medium text-gray-700"
                >
                 Pin
                </label>
                <input
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  id="tpin"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300
                            rounded-md shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <button className="common-btn"> Add+</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
