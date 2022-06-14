import React from "react";
import lock from "../../../Assets/lock.png"

export const Code403 = () => {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.emoji-403{\n\n  position: relative;\n  animation: mymove 2.5s infinite;\n}\n\n@keyframes mymove {\n  33%   {top: 0px;}\n  66%  {top: 20px;}\n  100%  {top: 0px}\n\n\n\n}\n",
        }}
      />
      <div className="bg-gray-100 h-screen justify-center">
        <center className="mt-2 m-auto">
          <img className="emoji-403" src={lock}/>
          <div className=" tracking-widest mt-4">
            <span className="text-gray-500 text-6xl block">
              <span>4 0 3</span>
            </span>
            <span className="text-gray-500 text-xl">
            Sorry, you don't have permission to access this page.
            </span>
          </div>
        </center>
        <center className="mt-6">
          <a
            href="{{url()->previous()}}"
            className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
          >
            Go back{" "}
          </a>
        </center>
      </div>
    </div>
  );
};