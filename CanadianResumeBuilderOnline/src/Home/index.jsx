import Header from "@/components/custom/Header";
import ContactUs from "@/dashboard/resume/components/ContactUs";
import { UserButton } from "@clerk/clerk-react";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <div >
        <section className=" z-50">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <a
              href="#"
              className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              role="alert"
            >
              <span
                className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3 cursor-pointer"
                onClick={() =>
                  (window.location.href =
                    "https://665e86719dd3e6a367b8c006--courageous-moxie-ae1745.netlify.app/")
                }
              >
                New
              </span>
              <span
                className="text-sm font-medium cursor-pointer"
                onClick={() =>
                  (window.location.href =
                    "https://665e86719dd3e6a367b8c006--courageous-moxie-ae1745.netlify.app/")
                }
              >
                Try our new AI summarizer tool
              </span>
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Build Your Resume <span className="text-primary">With AI</span>{" "}
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Effortlessly Craft a Standout Resume with Our AI-Powered Builder
            </p>
            <div className="flex flex-col   space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="/dashboard"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get Started
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://ca.linkedin.com/in/tarik-boumehdi-a4b91a205"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                <svg
                  className="mr-2 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.451 20.452H16.85v-5.414c0-1.29-.025-2.95-1.8-2.95-1.8 0-2.078 1.402-2.078 2.85v5.514H9.269V9.019h3.451v1.556h.048c.482-.911 1.657-1.868 3.41-1.868 3.648 0 4.324 2.401 4.324 5.518v6.227zM5.337 7.433c-1.108 0-2.008-.899-2.008-2.008 0-1.107.899-2.007 2.008-2.007 1.109 0 2.008.9 2.008 2.007s-.899 2.008-2.008 2.008zm1.726 13.02H3.611V9.02h3.451v11.432zM22.225 0H1.771C.792 0 0 .793 0 1.772v20.457c0 .979.793 1.771 1.771 1.771h20.457c.978 0 1.771-.793 1.771-1.771V1.772C24 .793 23.207 0 22.225 0z" />
                </svg>
                Get in touche
              </a>
            </div>
          </div>
        </section>
        <section className="py-8 z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className="h-8 w-8" />

              <h2 className="mt-4 text-xl font-bold ">Aout me</h2>

              <p className="mt-1 text-sm">
                Hi, I’m Tarik Boumehdi. I was born and raised in Morocco, and
                now I call Canada home. I have a passion for technology and a
                strong desire to contribute to my community. I’m always looking
                for ways to create innovative solutions that can make a real
                difference. My latest project is a resume builder assisted with
                AI, designed to simplify the job application process and help
                people present themselves confidently to potential employers.
              </p>
            </a>

            <a
              className="block rounded-xl border  p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className="h-8 w-8" />

              <h2 className="mt-4 text-xl font-bold">
                About the AI-Powered Resume Builder
              </h2>

              <p className="mt-1 text-sm ">
                The AI-assisted resume builder project leverages advanced
                technology to help you craft standout resumes effortlessly. The
                tool is designed to guide users through the resume-building
                process, offering smart suggestions and formatting to enhance
                your job application.
              </p>
            </a>

            <a
              className="block rounded-xl border   p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className="h-8 w-8" />
              <h2 className="mt-4 text-xl font-bold ">
                Special Thanks & Links
              </h2>
            
              <p className="mt-1 text-sm">
                {" "}
                I want to give special thanks to the tutorial by{" "}
                <a
                  href="https://youtu.be/RiUh_8VTGYM?si=nemCMXqrVWRmgQHs"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  this video{" "}
                </a>
                , which guided me through the development process. You can check
                out more of my work on my{" "}
                <a
                  href="https://github.com/BMHDI"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  GitHub{" "}
                </a>{" "}
                and connect with me on{" "}
                <a
                  href="https://ca.linkedin.com/in/tarik-boumehdi-a4b91a205"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  LinkedIn{" "}
                </a>
                .{" "}
              </p>
            </a>
          </div>
        </section>


  <section className="max-w-[600px] flex items-center justify-center mx-auto h-screen">
<ContactUs/>

</section>


<footer style={{ textAlign: 'center', padding: '20px', margin: '80px '}}>
      <div>
        <p>&copy; 2025 AI Resume Builder.</p>
       
      </div>
      <div>
        <p>Get in touch:</p>
        <a href="https://sky1snotthelimit.netlify.app/" style={{ textDecoration: 'none' }}>Portfolio</a> |
        <a href="https://twitter.com/yourpage" style={{ textDecoration: 'none' }}>LinkedIn</a> |
   
      </div>
    </footer>

      </div>
    </div>
  );
}

export default Home;
