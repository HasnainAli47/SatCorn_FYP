import React from "react";
import { Link } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75 brightness-150">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                //"url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
                //"url('https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80')",
                "url('https://plus.unsplash.com/premium_photo-1661944447290-c36119d0028f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')",
              filter: "brightness(170%)",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Sow the Data, Reap the Rewards.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Welcome to the future of corn farming.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                style={{ fill: "#FFB000" }}
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section
          className="pb-20 bg-blueGray-200 -mt-24"
          style={{ backgroundColor: "#D4E2D4" }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="w-24 h-24 mb-5 rounded-full overflow-hidden">
                      <img
                        src="https://images.squarespace-cdn.com/content/v1/6479f1b5ce062e6da6b0ab18/95e2fbe9-001f-4549-8e82-d1e7f95f07af/2_map.png?format=1500w"
                        alt="Your Image"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Living Map of your Farm
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Easily map your farm in 30 minutes, track crops, and plan
                      rotations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    {/* <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div> */}
                    <div className="w-24 h-24 mb-5 rounded-full overflow-hidden">
                      <img
                        src="https://editor.analyticsvidhya.com/uploads/57480crop-Precision-Agriculture.jpg"
                        alt="Your Image"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h6 className="text-xl font-semibold">Plan Field Jobs</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Track and manage seed, spray, and fertilizer inputs
                      efficiently. Delegate tasks, set dates, and record
                      completion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    {/* <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div> */}
                    <div className="w-24 h-24 mb-5 rounded-full overflow-hidden">
                      <img
                        src="https://s3.amazonaws.com/s3-biz4intellia/images/Role-of-IoT-in-Bettering-Crop-Health-Management-img.jpg"
                        alt="Your Image"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Analyze vegetation indices
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Explore advanced tools for in-depth analysis of vegetation
                      indices, helping you gain valuable insights into the
                      health and vitality of your crops.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i
                    className="fas fa-user-friends text-xl"
                    style={{ color: "#004225" }}
                  ></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Elevate Your Corn Farming Experience
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Our advanced corn monitoring solutions empower farmers like
                  you to harness the power of data-driven agriculture. From
                  real-time soil moisture measurements to predictive yield
                  forecasting, we're here to help you optimize your crop's
                  potential.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Explore our tools, gain insights, and unlock the secrets
                  hidden within your fields. Join us on the journey to smarter,
                  more sustainable, and more bountiful corn farming.
                </p>
                <Link to="/" className="font-bold text-blueGray-700 mt-8">
                  Lets get started!
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div
                  className="relative flex flex-col min-w-0 break-words bg-yellow-400 w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500"
                  style={{ backgroundColor: "#004225" }}
                >
                  <img
                    alt="..."
                    //src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    src="https://plus.unsplash.com/premium_photo-1664478328993-13f17a1ecadb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                        style={{ fill: "#004225" }}
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Monitor your Farm with Us
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      Join us in shaping the future of farming, one field at a
                      time.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  //src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  src="https://images.squarespace-cdn.com/content/v1/6479f1b5ce062e6da6b0ab18/1685713334718-WXPHLJI9A7WHKSJN8X2R/2_livestock_map.jpg?format=1500w"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div
                    className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-green-300"
                    style={{ backgroundColor: "#B0D9B1" }}
                  >
                    <i class="fas fa-cogs" style={{ color: "#004225" }}></i>
                  </div>
                  <h3 className="text-3xl font-semibold">
                    Our Comprehensive Services
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    We are committed to providing you with a suite of
                    cutting-edge services designed to elevate your corn farming
                    experience. Our comprehensive services encompass:
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3"
                            style={{ backgroundColor: "#B0D9B1" }}
                          >
                            <i
                              class="fas fa-arrows-alt-h"
                              style={{ color: "#004225" }}
                            ></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Real-time Monitoring
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3"
                            style={{ backgroundColor: "#B0D9B1" }}
                          >
                            <i
                              class="fas fa-chart-line"
                              style={{ color: "#004225" }}
                            ></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Predictive Analytics
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3"
                            style={{ backgroundColor: "#B0D9B1" }}
                          >
                            <i
                              class="fas fa-puzzle-piece"
                              style={{ color: "#004225" }}
                            ></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Customized Solutions
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3"
                            style={{ backgroundColor: "#B0D9B1" }}
                          >
                            <i
                              class="fas fa-bullhorn"
                              style={{ color: "#004225" }}
                            ></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Support and Guidance
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3"
                            style={{ backgroundColor: "#B0D9B1" }}
                          >
                            <i
                              class="fas fa-robot"
                              style={{ color: "#004225" }}
                            ></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Advanced Technology
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48" style={{ backgroundColor: "#D4E2D4" }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Get to Know Us</h2>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-2xl font-bold">Minahil Sadiq</h5>
                    <p className="mt-1 text-sm uppercase font-semibold">
                      Machine Learning Engineer
                    </p>
                    <p className="mt-2 mb-4">
                      I'm deeply passionate about the potential of machine
                      learning to revolutionize industries. With a strong
                      background in development and a keen interest in
                      cutting-edge technology, I'm dedicated to exploring the
                      transformative possibilities of machine learning.{" "}
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <a href="https://www.linkedin.com/in/minahil-sadiq">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-linkedin"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-2xl font-bold">Hasnain Ali</h5>
                    <p className="mt-1 text-sm uppercase font-semibold">
                      Web Developer
                    </p>
                    <p className="mt-2 mb-4 ">
                      A dedicated web developer. My skills in web development
                      enable me to turn design concepts into fully functional
                      and responsive websites. I thrive on solving complex
                      challenges and creating web solutions that deliver
                      outstanding user experiences.
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <a href="https://www.linkedin.com/in/hasnainali4">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-linkedin"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-3-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-2xl font-bold">Sheeza Ali</h5>
                    <p className="mt-1 text-sm uppercase font-semibold">
                      UI/UX Designer
                    </p>
                    <p className="mt-2 mb-4">
                      A talented UX/UI designer with a keen eye for aesthetics
                      and user-centric design. My design sensibilities are
                      grounded in creating visually appealing and highly
                      intuitive interfaces. I believe in crafting experiences
                      that seamlessly blend functionality and beauty.
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <a href="https://www.linkedin.com/in/sheeza-ali-aa5327255">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-linkedin"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-4-470x470.png").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Jenna Kardi</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* <section className="pb-20 relative block bg-blueGray-800" style={{ backgroundColor: "#016A70" }}>
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Build something
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />

    </>
  );
}
