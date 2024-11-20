import { useState, useEffect, useRef, memo } from "react";
import React from "react";

import Logo from "../Assets/Logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { AuthApi } from "../context/user";
import { Avatar } from "@mui/material";
// import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Navbar = memo(({ headerDash, developer }) => {
  const [navbar, setNavbar] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const headerRef = useRef(null);

  const navigate = useNavigate();

  const { user } = AuthApi();

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setIsFixed(window.scrollY > 85);
      }
    };
    // console.log(headerRef.current);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header ref={headerRef} className="bg-white shadow-lg">
        <div className="hidden sm:flex sm:flex-row justify-around items-center w-full max-w-screen-2xl mx-auto p-3 bg-black h-10 ">
          <span className="font-semibold text-base hover:text-green-400 text-white  hover:underline hover:scale-105">
            <a
              href="https://www.google.com/maps?ll=29.837213,76.935578&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=10415524260629688384"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-map-pin"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              &nbsp; Location{" "}
            </a>
          </span>
          <span className="font-semibold text-base text-white  hover:text-green-400 hover:underline hover:scale-105">
            <a
              href="mailto:gbn.alumni.nilokheri@gmail.com"
              className="flex items-center "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              &nbsp; gbn.alumni.nilokheri@gmail.com
            </a>
          </span>
        </div>
        <div
          className={` ${
            headerDash ? "hidden" : ""
          } flex justify-center items-center`}
        >
          <div>
            <img src={Logo} alt="GBN logo" className="h-20  m-3 " />
          </div>
          <p className="text m-3 heading">GBN Govt. polytechnic Nilokheri</p>
        </div>
        <nav
          className={`px-4 py-1 z-40 ${isFixed ? "hidden" : ""}  bg-green-600 `}
        >
          <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
            <div>
              <div className="flex items-center  justify-between py-3 md:py-5 md:block">
                <div className="flex">
                  {" "}
                  {user ? (
                    <div className=" md:hidden">
                      <Avatar
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                          navigate("/alumni");
                        }}
                        src={user?.profile}
                        alt="User Avatar"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <Link
                    className="LinkNav md:mx-0 mx-3"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    to="/"
                  >
                    <p className="font-serif bold text lg:text-[24px] text-[20px] text-white">
                      alma nilokheri
                    </p>
                  </Link>
                </div>

                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? "block" : "hidden"
                }`}
              >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <li
                    className="text-white hover:text-indigo-200 hover:underline"
                    onClick={() => {
                      setNavbar(false);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Link
                      className="LinkNav"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className="text-white hover:text-indigo-200 hover:underline"
                    onClick={() => {
                      setNavbar(false);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Link
                      className="LinkNav"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to="/gallery/memories"
                    >
                      Posts
                    </Link>
                  </li>

                  <li
                    className="text-white hover:text-indigo-200 hover:underline"
                    title="Find your friends"
                    onClick={() => setNavbar(false)}
                  >
                    <Link
                      className="LinkNav"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to="/member"
                    >
                      Members
                    </Link>
                  </li>

                  {/*  new tab  */}

                  {/* New Link 1: Contribute */}

                  <li className="relative group">
                    <div className=" flex text-white ">
                      <li
                        className="LinkNav mr-3 text-white hover:text-indigo-200 hover:underline cursor-pointer"
                        onClick={() => setNavbar(true)}
                      >
                        Contribute
                      </li>
                    </div>

                    <ul className="absolute w-40  p-2 z-50 hidden top-4 left-2  mt-2  space-y-5 border-green-900 border rounded-br-3xl rounded-md shadow-2xl bg-green-600 text-white group-hover:block">
                      <li className="pl-4 font-semibold hover:text-green-400 sub hover:scale-110 ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/job"
                        >
                          Job Opportunities
                        </Link>
                      </li>
                      <li className="pl-4 font-semibold hover:text-green-400 sub hover:scale-110 ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/invite"
                        >
                          Invite Friend
                        </Link>
                      </li>
                      <li className="pl-4 font-semibold hover:text-green-400 sub hover:scale-110 ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/donation"
                        >
                          Donate/Gift
                        </Link>
                      </li>
                      <li className="pl-4 font-semibold hover:text-green-400 sub hover:scale-110 ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/suggestion"
                        >
                          Suggestions
                        </Link>
                      </li>
                      <li className="pl-4 font-semibold hover:text-green-400 sub hover:scale-110 ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/volunteer"
                        >
                          Volunteer
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* New Link 2: Services */}
                  <li className="relative group">
                    <div className=" flex text-white ">
                      <li
                        className="LinkNav mr-3 text-white hover:text-indigo-200 hover:underline cursor-pointer"
                        onClick={() => setNavbar(true)}
                      >
                        Service
                      </li>
                    </div>
                    <ul className="absolute w-40  p-2 z-50 hidden top-4 left-2  mt-2 space-y-5 border-green-900 border rounded-br-3xl rounded-md shadow-2xl bg-green-600 text-white group-hover:block">
                      <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub  ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/facility"
                        >
                          Institute Facility
                        </Link>
                      </li>

                      <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                        {" "}
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/visit"
                        >
                          Plan for Campus Visit
                        </Link>
                      </li>
                      <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/stories"
                        >
                          Success Stories
                        </Link>
                      </li>
                      <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/idcard"
                        >
                          I Card
                        </Link>
                      </li>
                      <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300  sub  ">
                        <Link
                          className=""
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          to="/service/alumni"
                        >
                          Alumni Day (Gold/Silver)
                        </Link>
                      </li>
                      <li className="pl-4 font-semibold hover:scale-110 hover:text-slate-100 sub  ">
                        <a
                          href="mailto:gbn.alumni.nilokheri@gmail.com"
                          className="hover:underline"
                        >
                          Email Us
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/*  new tab  */}

                  <li
                    className="text-white hover:text-indigo-200 hover:underline"
                    onClick={() => setNavbar(false)}
                  >
                    <Link
                      className="LinkNav"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to="/gallery"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li
                    className="text-white hover:text-indigo-200 hover:underline"
                    onClick={() => setNavbar(false)}
                  >
                    <Link
                      className="LinkNav"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to="/aboutUs"
                    >
                      About
                    </Link>
                  </li>
                  <li
                    className="text-white hover:text-indigo-200 hover:underline"
                    onClick={() => setNavbar(false)}
                  >
                    <Link
                      className="LinkNav"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to="/contactUs"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="mt-3 space-y-2 lg:hidden  md:hidden sm:inline-block">
                  {/* <Link className="LinkNav"
                    onClick={() => {
                      setNavbar(false);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    to="/login"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    Sign in
                  </Link> */}

                  {user ? (
                    ""
                  ) : (
                    <Link
                      onClick={() => {
                        setNavbar(false);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to="/signUp"
                      className="inline-block text-base md:text-lg w-full px-4 py-2 text-center text-balance text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                      Join Us
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden space-x-2 md:inline-block">
              {/* <Link className="LinkNav"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                to="/login"
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign in
              </Link> */}

              {user ? (
                <Avatar
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                    navigate("/alumni");
                  }}
                  src={user?.profile}
                  alt="User Avatar"
                />
              ) : (
                <Link
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  to="/signup"
                  className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* fixed state of navbar */}

        {developer ? (
          ""
        ) : (
          <nav
            className={`fixed top-0 z-40  bg-green-500 shadow-lg w-full ${
              isFixed ? "" : "hidden"
            }`}
          >
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
              <div>
                <div className="flex items-center justify-between py-3 md:py-3 md:block">
                  <Link
                    className="LinkNav"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    to="/"
                  >
                    <div className="flex  items-center">
                      {user ? (
                        <div className=" md:hidden">
                          <Avatar
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                              navigate("/alumni");
                            }}
                            src={user?.profile}
                            alt="User Avatar"
                          />
                        </div>
                      ) : (
                        <img
                          src={Logo}
                          alt="GBN logo"
                          className="h-12 rounded-2xl"
                        />
                      )}
                      <p className="text-white font-serif bold text ml-2  heading">
                        alma nilokheri
                      </p>
                    </div>
                  </Link>
                  <div className="md:hidden">
                    <button
                      className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                      onClick={() => setNavbar(!navbar)}
                    >
                      {navbar ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                    navbar ? "block" : "hidden"
                  }`}
                >
                  <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    <li
                      className="text-white hover:text-indigo-200 hover:underline"
                      onClick={() => setNavbar(false)}
                    >
                      <Link
                        className="LinkNav"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="text-white hover:text-indigo-200 hover:underline"
                      onClick={() => setNavbar(false)}
                    >
                      <Link
                        className="LinkNav"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        to="/gallery/memories"
                      >
                        Posts
                      </Link>
                    </li>

                    <li
                      className="text-white hover:text-indigo-200 hover:underline"
                      onClick={() => setNavbar(false)}
                    >
                      <Link
                        className="LinkNav"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        to="/member"
                      >
                        Member
                      </Link>
                    </li>
                    {/*  new tab  */}

                    {/* New Link 1: Contribute */}

                    <li className="relative group">
                      <div className=" flex text-white ">
                        <li
                          className="LinkNav mr-3 text-white hover:text-indigo-200 hover:underline cursor-pointer"
                          onClick={() => setNavbar(true)}
                        >
                          Contribute
                        </li>
                      </div>
                      <ul className="absolute w-40  p-2 z-50 hidden top-4 left-2  mt-2 space-y-5 border-green-900 border rounded-br-3xl rounded-md shadow-2xl bg-green-600 text-white group-hover:block">
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/job"
                          >
                            Job Opportunities
                          </Link>
                        </li>
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/invite"
                          >
                            Invite Friend
                          </Link>
                        </li>
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/donation"
                          >
                            Donate/Gift
                          </Link>
                        </li>
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/suggestion"
                          >
                            Suggestions
                          </Link>
                        </li>
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/volunteer"
                          >
                            Volunteer
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* New Link 2: Services */}
                    <li className="relative group">
                      <div className=" flex text-white ">
                        <li
                          className="LinkNav mr-3 text-white hover:text-indigo-200 hover:underline cursor-pointer"
                          onClick={() => setNavbar(true)}
                        >
                          Service
                        </li>
                      </div>
                      <ul className="absolute w-40  p-2 z-50 hidden top-4 left-2  mt-2 space-y-5 border-green-900 border rounded-br-3xl rounded-md shadow-2xl bg-green-600 text-white group-hover:block">
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub  ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/facility"
                          >
                            Institute Facility
                          </Link>
                        </li>

                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          {" "}
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/visit"
                          >
                            Plan for Campus Visit
                          </Link>
                        </li>
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/stories"
                          >
                            Success Stories
                          </Link>
                        </li>
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/idcard"
                          >
                            I Card
                          </Link>
                        </li>
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub ">
                          <Link
                            className=""
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            to="/service/alumni"
                          >
                            Alumni Day (Gold/Silver)
                          </Link>
                        </li>
                        <li className="pl-4 font-semibold hover:scale-110 hover:text-green-300 sub  ">
                          <a
                            href="mailto:gbn.alumni.nilokheri@gmail.com"
                            className="hover:underline"
                          >
                            Email Us
                          </a>
                        </li>
                      </ul>
                    </li>

                    {/*  new tab  */}

                    <li
                      className="text-white hover:text-indigo-200 hover:underline"
                      onClick={() => setNavbar(false)}
                    >
                      <Link
                        className="LinkNav"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        to="/gallery"
                      >
                        Gallery
                      </Link>
                    </li>
                    <li
                      className="text-white hover:text-indigo-200 hover:underline"
                      onClick={() => setNavbar(false)}
                    >
                      <Link
                        className="LinkNav"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        to="/aboutUs"
                      >
                        About
                      </Link>
                    </li>
                    <li
                      className="text-white hover:text-indigo-200 hover:underline"
                      onClick={() => setNavbar(false)}
                    >
                      <Link
                        className="LinkNav"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        to="/contactUs"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                  <div className="mt-3 space-y-2 lg:hidden md:hidden sm:inline-block">
                    {/* <Link className="LinkNav"
                    onClick={() => {
                      setNavbar(false);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    to="/login"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    Sign in
                  </Link> */}

                    {user ? (
                      ""
                    ) : (
                      <Link
                        onClick={() => {
                          setNavbar(false);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        to="/signUp"
                        className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                      >
                        Join Us
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden space-x-2 md:inline-block">
                {/* <Link className="LinkNav"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                to="/login"
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign in
              </Link> */}
                {user ? (
                  <Avatar
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                      navigate("/alumni");
                    }}
                    src={user?.profile}
                    alt="User Avatar"
                  />
                ) : (
                  <Link
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    to="/signup"
                    className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Join Us
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </header>
      {/* ... */}
    </div>
  );
});

export default Navbar;
