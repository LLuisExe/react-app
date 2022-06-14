import React from "react";

const Comments = ({ comment }) => {

    const { description, user } = comment;

    return (
        <div className="flex flex-wrap m-2">

            <h1 className="text-indigo-800 italic font-semibold">{user?.username} </h1>
            <h4 className="text-black">: {description}</h4>
        </div>
    );
};

export default Comments;