import { useRef } from 'react';
import React from "react";
import axios from 'axios'

const AddComments = ({ postId }) => {


    const ref = useRef(null);

    async function onSubmit(e) {
        e.preventDefault();

        const body = {
            description: ref?.current?.value,
        };

        await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/` + postId, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        Reload();
    };

    const timeOut = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
      };
    
      async function Reload() {
        await timeOut(2 * 1000);
        window.location.reload();
      }

    return (
        <form className="flex flex-wrap m-2" onSubmit={onSubmit}>
            <div className="m-1 ">
                <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="focus:ring-indigo-500 focus:border-indigo-500  w-full rounded-full  text-black "
                    placeholder="Escribe un comentario"
                    ref={ref}
                />
            </div>
        </form>
    );
};

export default AddComments;