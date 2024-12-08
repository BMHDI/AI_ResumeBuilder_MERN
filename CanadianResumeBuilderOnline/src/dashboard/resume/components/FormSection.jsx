import React, { useContext, useState } from 'react'
import PersonalDetail from './form/PersonalDetail'
import  Summary  from './form/Summary'
import { Button }from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Experience from './form/Experience'
import Education from './form/Education'
import Skills from './form/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ThemeColor from './ThemeColor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function FormSection() {
    const resumeInfo = useContext(ResumeInfoContext)
    const [activeFormIndex,setActiveFormIndex]= useState(1);
    const [enableNext,setEnableNext]= useState(false)
    const {resumeId} = useParams();
   
  return (

    <div className=' rounded-lg border p-3  '>
        {/* Personal detail */}
       
        <div className='flex justify-between items-center'>

            <div className='flex gap-2'>

            
            <Link to='/dashboard'>
            <Button><Home className='mr-2 h-4 w-4'/>Home</Button>
            </Link>
            <ThemeColor/>
            </div>

        </div>

     {activeFormIndex==1?  <PersonalDetail resumeInfo={resumeInfo} enableNext= {(v)=>setEnableNext(v)}/> 
     :activeFormIndex==2?<Summary enableNext= {(v)=>setEnableNext(v)}/>
     :activeFormIndex==3?<Experience enableNext= {(v)=>setEnableNext(v)}/>
     :activeFormIndex==4?<Education enableNext= {(v)=>setEnableNext(v)}/>
     :activeFormIndex==5?<Skills enableNext= {(v)=>setEnableNext(v)}/>
     :activeFormIndex==6?
     <Navigate to={'/my-resume/'+resumeId+"/view"}/>
         
     :null}
     <div className='flex justify-end gap-2 m-5'>
            {activeFormIndex>1&&<Button className='flex  gap-2' size='sm' onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}

            <Button className='flex gap-2 ' size='sm' onClick={()=>setActiveFormIndex(activeFormIndex+1)} disabled={!enableNext}><><ArrowRight /></>Next</Button>
            </div>

        {/* Summary */}
       
        {/* Experience */}

        {/* education */}

        {/* skills */}

    </div>
  )
}

export default FormSection