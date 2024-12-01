import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const MeetTheDeveloper = () => {
  return (
    <>
      <div className="bg-slate-200">
        {/* Navbar */}
        <Navbar developer={true} />

        {/* Developer Section */}
        <div className="bg-green-400 py-10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl lg:text-5xl text-white font-bold mb-6">
                Meet the Developer
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
              {/* Profile Section */}
              <div className="lg:w-2/5 flex flex-col items-center mb-6 lg:mb-0">
                <img
                  src="https://raw.githubusercontent.com/vishu7im/personal-asset/vishal/vishal.jpeg"
                  alt="Vishal Munday"
                  className="rounded-full w-72 h-72 object-cover border-4 border-white shadow-lg"
                />

                <h2 className="text-2xl lg:text-3xl text-white font-semibold mt-6">
                  Vishal Munday
                </h2>

                <div className="flex justify-center mt-6 space-x-6">
                  <a
                    href="https://www.linkedin.com/in/vishal-munday-869024223/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-4xl" />
                  </a>
                  <a
                    href="mailto:vishu.im.0007@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200"
                    aria-label="Email"
                  >
                    <FaEnvelope className="text-4xl" />
                  </a>
                  <a
                    href="https://github.com/vishu7im/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-4xl" />
                  </a>
                  <a
                    href="https://www.instagram.com/_vi.shu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-4xl" />
                  </a>
                </div>
              </div>

              {/* About Section */}
              <div className="lg:w-3/5 text-white">
                <p className="text-lg lg:text-xl mb-6">
                  Hello! My name is <span className="font-semibold">Vishal</span>, a Computer Engineering student
                  from the batch of <span className="font-semibold">2021–2024</span>, ID: <span className="font-semibold">210090800122</span>.
                  I am the developer behind this website.
                </p>

                <p className="text-lg lg:text-xl mb-6">
                  I am a passionate web developer with expertise in the MERN
                  stack and other modern web technologies. This website is a
                  project that showcases my skills and provides a platform for
                  alumni of <span className="font-semibold">GBN Govt Polytechnic Nilokheri</span> to connect, collaborate,
                  and stay in touch.
                </p>

                <p className="text-lg lg:text-xl mb-6">
                  If you have any feedback, suggestions, or just want to say hi,
                  I’d love to hear from you! Feel free to reach out via the{" "}
                  <a
                    href="/contactus"
                    className="underline hover:text-gray-300 transition"
                  >
                    Contact Us
                  </a>{" "}
                  page. I’m always happy to connect with fellow developers and
                  members of our alumni community.
                </p>

                <p className="text-lg lg:text-xl">
                  Thank you for visiting, and I hope you enjoy exploring the website!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetTheDeveloper;
