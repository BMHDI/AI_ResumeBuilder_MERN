import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import {
  EditorProvider,
  Editor,
  BtnBold,
  BtnItalic,
  Toolbar,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnClearFormatting,
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = `
I need a detailed job description for the job title: {jobTitle}. Please provide 5-7 bullet points specifically related to the given job title. Each bullet point should describe a key responsibility or achievement in a clear and professional manner. Respond in JSON format like this:

{
  "jobDescription": {
    "title": "Job Title Here",
    "bulletPoints": [
      "Responsibility 1",
      "Responsibility 2",
      "Responsibility 3",
      "Responsibility 4",
      "Responsibility 5"
    ]
  }
}
`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue, experienceList }) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const generateSummaryFromAi = async () => {
    setLoading(true);

    const jobTitle = experienceList?.[index]?.title;
    if (!jobTitle) {

      toast('Please add a Job Title ...');
      setLoading(false);
      return;
    }
console.log(jobTitle);
    const prompt = PROMPT.replace("{jobTitle}", jobTitle);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const respText = await result.response.text();

      // Parse the response JSON
      const resp = JSON.parse(respText);

      // Construct the HTML content
      const workSummary = `
        <h4>${resp.jobDescription.title}</h4>
        <ul>
          ${resp.jobDescription.bulletPoints.map((point) => `<li>${point}</li>`).join('')}
        </ul>
      `;

    

      // Set the constructed HTML in the editor
      setValue(workSummary);
      onRichTextEditorChange(index, workSummary); // Update the parent component
    } catch (error) {
      console.error('Error generating summary:', error);
      toast('Error generating summary');
    }

    setLoading(false);
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs font-bold'>Summary</label>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(index, e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnClearFormatting />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <Button
        onClick={generateSummaryFromAi}
        size='sm'
        variant='outline'
        className='flex mt-3 gap-2 border-primary text-primary'
      >
        {loading ? <LoaderCircle className='animate-spin' /> : <> <Brain className='h-4 w-4' /> Generate from AI</>}
      </Button>
    </div>
  );
}

export default RichTextEditor;
