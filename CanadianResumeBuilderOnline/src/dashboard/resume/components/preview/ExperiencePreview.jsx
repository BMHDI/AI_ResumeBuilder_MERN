import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const ExperiencePreview = () => {
    const { resumeInfo, experienceList, setExperienceList } = useContext(ResumeInfoContext);
   

    useEffect(() => {
        console.log(experienceList);
        // Set the initial value from resumeInfo.attributes.Experience
        if (resumeInfo?.Experience) {
            setExperienceList(resumeInfo?.Experience);
        }
    }, [resumeInfo]);

    // useEffect(() => {
    //     // Update the experience list if resumeInfo.experience changes
    //     if (resumeInfo?.experience) {
    //         setExperienceList(resumeInfo?.experience);
    //     }
    // }, [resumeInfo?.experience]);

    const formatDate = (date) => {
        if (!date) return '';
        return format(new Date(date), 'MMM yyyy');
    };

  

    return (
        <div className='my-6'>
            <h2 
                className='text-center font-bold text-sm mb-2'
                style={{ color: resumeInfo?.themeColor || resumeInfo?.attributes?.themeColor }}
            >
                Professional Experience
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor || resumeInfo?.attributes?.themeColor }} />

            {(experienceList || []).map((experienceList, index) => (
                <div className='my-4' key={index}>
                    <h2 
                        style={{ color: resumeInfo?.themeColor || resumeInfo?.attributes?.themeColor }}  
                        className='text-sm font-bold'
                    >
                        {experienceList?.title}
                    </h2>
                    <h2 className='text-xs flex justify-between'>
                        {experienceList?.companyName && (
                            <>
                                {experienceList?.companyName}
                                {(experienceList?.city || experienceList?.state) && ', '}
                            </>
                        )}
                        {experienceList?.city && (
                            <>
                                {experienceList?.city}
                                {experienceList?.state && ', '}
                            </>
                        )}
                        {experienceList?.state && experienceList.state}
                        <span> 
                            {formatDate(experienceList?.startDate)} to {experienceList?.currentlyWorking ? 'Present' : formatDate(experienceList?.endDate)}
                        </span>
                    </h2>
                    <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: experienceList?.workSummary }}></div>
                </div>
            ))}
        </div>
    );
};

export default ExperiencePreview;
