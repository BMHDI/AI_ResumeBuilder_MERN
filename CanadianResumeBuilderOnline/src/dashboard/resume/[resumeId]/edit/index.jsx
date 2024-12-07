import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    fetchResumeInfo();
  }, [resumeId]); // Trigger API call when `resumeId` changes

  // Define a reusable function to fetch resume data
  const fetchResumeInfo = async () => {
    try {
      const resp = await GlobalApi.GetResumeById(resumeId);
      setResumeInfo(resp.data);
      setExperienceList(resp.data.experience);
      setEducationList(resp.data.education);
      setSkillsList(resp.data.skills);
    } catch (error) {
      console.error("Error fetching resume info:", error);
    }
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
        fetchResumeInfo, // Expose the function to the context
      }}
    >
      <div className="grid grid-rows-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
