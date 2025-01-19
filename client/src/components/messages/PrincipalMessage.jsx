// import { useState } from "react";

const PrincipalMessage = () => {
  // const [open, setOpen] = useState(false);
  return (
    <div className="max-w-screen-2xl w-full mx-auto h-full  sm:px-10 px-5 sm:py-10 py-5 bg-gradient-to-r from-green-500 via-green-400 to-green-500 rounded-tr-3xl    rounded-bl-3xl ">
      <h3 className="text-4xl text-center font-bold leading-relaxed mx-auto mb-10 ">
        Principal's Message
      </h3>
      <div className="lg:flex-row sm:w-11/12 mx-auto w-full h-full flex-col flex justify-between items-center ">
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

        <div className="lg:w-1/2 w-11/12 mx-auto md:px-10 px-1 mt-4">
          {/* <h3 className="text-4xl font-bold leading-relaxed mx-auto  ">
            Principal's Message
          </h3> */}
          <div className="text-ellipsis text-lg md:w-11/12 w-full mx-auto md:px-4 px-2  text-pretty py-1 leading-relaxed">
            <p className="text-xl font-medium text-slate-800 whitespace-normal">
              Dear Alumni,
            </p>
            <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp; I feel ecstatic and proud to write the inaugural
            message for 'Alumni Website' of this monumental institution. The
            Institute's alumni remain our organization's ambassadors, and it is
            a pleasure to observe as they excel in reaching new heights in their
            professional careers. I extend my token of gratitude to them for
            their achievements in their professional and personal domains. I
            want to address them as all of you hold a special place in our
            hearts as you embody our Institute's success and legacy. Alums
            achievements inspire the current students and serve as a testament
            to the quality of education and the values instilled at GP
            Nilokheri.
            {/**
             * 
                      The association with alums has been a pillar to the
            upcoming generations and the Institute, and their generosity will
            help us to ensure that none of the roads remain unexplored in this
            wonderful journey. We invite you to explore our alumni website, your
            central hub for news, updates, and opportunities to engage with our
            community. Whether you're looking to reconnect with classmates,
            share your professional achievements, or participate in alumni
            events, this platform is designed to support your ongoing connection
            with our institution. We are proud of your achievements and value
            your connection with our institution. So Stay updated, share your
            stories, and relive memories on our alumni website. Additionally, we
            encourage you to consider delivering expert lectures, providing
            technical guidance, and offering financial support to our students.
            Your contributions will have a profound impact on their academic and
            professional journeys. We look forward to your active participation
            and support. Best regards Jwala Prasad Principal GBN Govt
            Polytechnic, Nilokheri
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalMessage;
