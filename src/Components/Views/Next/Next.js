import React from "react";

const Next = ({ onNextPage = () => {} }) => {

    return (
        <div className="m-4" >
            <button 
            className="bg-indigo-800 rounded-full text-white w-20 "
            onClick={() => {
                onNextPage();
              }}>
                Siguiente
            </button>
        </div>
    );
}

export default Next;

