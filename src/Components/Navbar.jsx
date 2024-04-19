import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
const notify = () => toast("Wow so easy!");
export default function Navbar() {
  const [modelOpen, SetModelOpen] = useState(false);

  const closeModal = (status) => {
    SetModelOpen(status);
  };

  return (
    <>
      <div className="nav">
        <div className="logo">Flowdoc</div>
        <div className="">
          {
            <button onClick={() => SetModelOpen(!modelOpen)} className="btn">
              {!modelOpen ? <p>Add Node</p> : <p>Close Modal</p>}
            </button>
          }
          <div className="model-container">
            {modelOpen ? (
              <Modal
                SetModelOpen={SetModelOpen}
                modelOpen={modelOpen}
                notify={notify}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
