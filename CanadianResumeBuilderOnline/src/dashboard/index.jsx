import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import GlobalApi from './../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList,setResumeList]=useState([]);
  

  useEffect(() => {
    user&&GetResumesList();
  }, [user]);
  const GetResumesList = () => {
    if (user?.primaryEmailAddress.emailAddress) {
     
      GlobalApi.GetUserResumes(user?.primaryEmailAddress.emailAddress).then(resp => {
        
        setResumeList(resp.data)
      });
    }
  };

 

  return (
    <div className='px-6 md:px-2 lg:px-32'>
      <h2 className='font-bold text-2xl'>My Resume</h2>
      <p>Start Creating AI resume for your next Job role</p>

      <div className='display-flex mx-5 flex  flex-wrap justify-center'>
        <AddResume />
        {resumeList.length>0&&resumeList.map((resume,index)=> (
        <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>  
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
