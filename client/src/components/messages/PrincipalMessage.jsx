import { useState } from "react";
import { principleMessage } from "./message";
const PrincipalMessage = () => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 550;
  const toggleExpand = () => setExpanded((prev) => !prev);
  return (
    <div className="max-w-screen-2xl w-full mx-auto h-full overflow-y-auto sm:px-5 md:px-8 max-h-screen px-2 sm:py-10 py-5 bg-gradient-to-r from-green-500 via-green-400 to-green-500 rounded-tr-3xl    rounded-bl-3xl ">
      <h3 className="text-4xl text-center font-bold leading-relaxed mx-auto mb-5 ">
        Principal's Message
      </h3>
      <div className="lg:flex-row sm:w1-11/12 mx-auto w-full h-full flex-col flex justify-between items-center ">
        <div className="lg:w-1/2 w-full  align-bottom flex flex-col items-center justify-center">
          <img
            src="./jwala.jpeg"
            alt=""
            className="rounded-3xl w-3/4 h-full  object-cover "
          />
          <p className="text-lg font-bold italic text-right mt-5 ">
            Sh. Jwala Prasad
            <br />
          </p>
          Principal GBN Govt Polytechnic, Nilokheri
        </div>

        <div className="lg:w-2/3 w1-11/12 h-2/3  mx-auto  px-1 mt-4">
          {/* <h3 className="text-4xl font-bold leading-relaxed mx-auto  ">
            Principal's Message
          </h3> */}
          <div className="text-start text-lg md:w-11/12 w-full mx-auto md:px-4 text-pretty py-1 leading-relaxed mb-5">
            <p className="text-xl font-medium text-slate-800 whitespace-normal md:-ml-4">
              Dear Alumni,
            </p>
            <br />
            {principleMessage.length > maxLength && !expanded
              ? `${principleMessage.slice(0, maxLength)}...`
              : ""}
            {expanded && principleMessage}

            {principleMessage.length > maxLength && (
              <button
                onClick={toggleExpand}
                className={`${
                  expanded ? "text-white " : "text-white"
                }  animate-bounce ml-2 text-xl`}
              >
                {expanded ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalMessage;
