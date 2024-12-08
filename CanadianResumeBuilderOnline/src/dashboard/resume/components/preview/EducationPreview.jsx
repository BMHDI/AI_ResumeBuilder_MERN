import React, { useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function EducationPreview({ resumeInfo }) {
  const formatDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'MMM yyyy');
  };
  const { educationList, setEducationList  } = useContext(ResumeInfoContext);
  useEffect(() => {
    console.log(educationList);
    // Set the initial value from resumeInfo.attributes.Experience
    if (resumeInfo?.education) {
      setEducationList(resumeInfo?.education);
    }
}, [resumeInfo]);
  return (
    <div className='my-6 '>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor ||resumeInfo?.attributes?.themeColor
        }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor ||resumeInfo?.attributes?.themeColor }} />

      {educationList.map((education, index) => (
        <div className='my-5' key={index}>
          <h2
            style={{ color: resumeInfo?.themeColor ||resumeInfo?.attributes?.themeColor }}
            className='text-sm font-bold'
          >
            {education?.universityName}
          </h2>
          <h2 className='text-xs flex justify-between'>
            {education?.degree} in {education?.major}, 
            <span> 
              {formatDate(education?.startDate)} - {formatDate(education?.endDate)}
            </span>
          </h2>
          <p className='text-xs my-2'>{education?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationPreview;
