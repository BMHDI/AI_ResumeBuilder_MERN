import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from "sonner"
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = `Create a JSON array of summaries for three  levels: -junior, mid level, and senior level experience for the given job title: {jobTitle}. Each entry should include a brief 3-4 line summary and the experience level. The experience levels are: "Entry Level", "Mid Level", and "Experienced/Senior". Format each entry with the fields "summary" and "experience_level give me the final result to write in my resume ".`


function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summary, setSummary] = useState(resumeInfo?.summary || ""); // Ensure summary is initialized
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(null); // Added state for selected summary index
  
  useEffect(() => {
    summary&&setResumeInfo({
      ...resumeInfo,
      summary: summary
    })
  }, [summary])
  
  const GenerateSummaryFromAI = async () => { 
    setLoading(true)
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle)
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiGeneratedSummaryList(JSON.parse(result.response.text()))
    setLoading(false);
  }

  const onSave = (e) => { 
    e.preventDefault();
    setLoading(true)
    const data = { data: { summary: summary } }
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
      console.log(resp); 
      enableNext(true); // Enable next only after a successful save
      setLoading(false); 
      toast("Your information has been saved.")
    }, (error) => setLoading(false));
  }

  console.log(resumeInfo)

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label className='font-bold text-'>Add summary</label>
            <Button variant="outline"
              type="button" size="sm" className="border-primary text-primary flex gap-2" disabled={loading} onClick={() => GenerateSummaryFromAI()}> 
              <Brain className='h-4 w-4' />  Generate from AI</Button>
          </div>
          <Textarea className="mt-5" required
            
            value={summary ? summary : resumeInfo?.attributes?.summary}
            onChange={(e) => {setSummary(e.target.value); enableNext(false)}}
          />
          <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
          {aiGeneratedSummaryList.length > 0 &&
        <div>
          <h2 className='font-bold text-lg mt-10'>Suggestions from AI</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div key={index} className={`p-2 rounded ${selectedSummaryIndex === index ? 'border-solid border-2 bg-slate-100' : 'bg-white'}`}>
              <h2 className='font-bold mt-2'>Level: {item?.experience_level}</h2>
              <p>{item?.summary}</p>
              <Button variant="outline" type="button" size="sm" className="border-primary text-primary mt-2"
                onClick={() => {
                  setSummary(item.summary);
                  setSelectedSummaryIndex(index); // Set the selected summary index
                  enableNext(false); // Enable next when a summary is selected
                }}>Use this summary</Button>
                
            </div>
            
          ))}
   <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </div>
      }
        </form>
        
      </div>
    
    </div>
  )
}

export default Summary
