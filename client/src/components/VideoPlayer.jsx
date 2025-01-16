import ReactYoutubePlayer from "react-player/youtube";
const VideoPlayer = () => {
  return (
    <>
      <div className="w-full h-full  -z-10 ">
        <h1 className="text-center text-2xl font-semibold pt-8 ">
          A Glimpse Into the State of GBN Govt. polytechnic Nilokheri:
        </h1>{" "}
        <br />
        <p className="text-slate-700 text-lg text-center font-normal pb-4">
          Explore the heart of GBN Govt. polytechnic Nilokheri through this
          insightful video that highlights our growth, achievements, and vision
          for the future.
        </p>
        <div className="sm:w-11/12 mx-auto  w-full max-w-4xl relative scrollbar flex items-center justify-center overflow-y-auto">
          <ReactYoutubePlayer
            url={"https://youtu.be/zrifF0VuKmU?si=IQoD4NdTobrAfdlM"}
            // width="auto%"
            // height="100%"
            controls={true}
            playing={false}
            muted={true}
            volume={true}
          />
        </div>
      </div>
    </>
  );
};
export default VideoPlayer;
