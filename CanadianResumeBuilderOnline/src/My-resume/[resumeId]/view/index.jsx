import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { DownloadIcon, Share2Icon } from "lucide-react";


function ViewResume() {
  const { resumeId } = useParams();

  // Initialize the state properly
  const [resumeInfo, setResumeInfo] = useState(null);
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

  // Fetch resume data from API
  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data);
      // Set the fetched data to state
      setResumeInfo(resp.data);
      setExperienceList(resp.data.experience || []); // Ensure experienceList is always an array
      setEducationList(resp.data.education || []);   // Ensure educationList is always an array
      setSkillsList(resp.data.skills || []);         // Ensure skillsList is always an array
    });
  };

  const HandleDownload = () => {
    window.print(); // Trigger print for download
  };

  return (
    <ResumeInfoContext.Provider
      value={{
        resumeInfo,
        setResumeInfo,
        experienceList,
        setExperienceList,
        educationList,
        setEducationList,
        skillsList,
        setSkillsList,
      }}
    >
      <div>
        <div id="no-print">
          <Header />
        </div>
        <div>
          <div id="no-print">
            <h2 className="text-center text-2xl font-medium">
              Your resume is ready 🥳 !
            </h2>
            <p className="text-center">Your resume is ready to share and download</p>
            <div className="flex justify-between px-16 my-10">
              <Button onClick={HandleDownload}>
                Download
                <DownloadIcon />
              </Button>
              <RWebShare
                data={{
                  text: "Check This out! My resume with the help of AI ...",
                  url: import.meta.env.VITE_BASE_URL + "my-resume/" + resumeId + "/view",
                  title: resumeInfo?.firstName + " " + resumeInfo?.lastName,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button>
                  Share <Share2Icon />
                </Button>
              </RWebShare>
            </div>
          </div>
          <div className="m-12 max-w-screen-lg mx-auto">
            <div className="flex justify-center ml-10 mr-10" id="print-area" >
            <div >
              <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
