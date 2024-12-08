import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

const formField = {
    universityName: '',
    startDate: '',
    endDate: '',
    degree: '',
    major: '',
    description: ''
};

function Education({ enableNext }) {
    const params = useParams();
    const { resumeInfo,
            // setResumeInfo,
            educationList, 
            setEducationList } = useContext(ResumeInfoContext);
    // const [educationList, setEducationList] = useState([formField]);
    // setEducationList([{
    //     universityName: '',
    //     startDate: '',
    //     endDate: '',
    //     degree: '',
    //     major: '',
    //     description: ''
    // }]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.education?.length > 0) {
            console.log(resumeInfo.education);
            setEducationList(resumeInfo.education);
        }
    }, []);

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setEducationList(prevEducationList =>
            prevEducationList.map((item, idx) =>
                idx === index ? { ...item, [name]: value } : item
            )
        );
        enableNext(false);
    };

    const addNewEducation = () => {
        setEducationList([...educationList, formField]);
    };

    const removeEducation = () => {
        setEducationList(prevEducationList => prevEducationList.slice(0, -1));
    };

    // useEffect(() => {
    //     setResumeInfo(prevResumeInfo => ({
    //         ...prevResumeInfo,
    //         attributes: {
    //             ...prevResumeInfo.attributes,
    //             education: educationList
    //         }
    //     }));
    // }, [ resumeInfo]);

    const onSave = () => {
        setLoading(true);
        const data = { data: { education: educationList } };
        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
            (resp) => {
                setLoading(false);
                enableNext(true);
                toast('Details updated!');
            },
            (error) => {
                setLoading(false);
                toast('Something went wrong... Please check your internet and try again!');
            }
        );
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg mt-10'>Education</h2>
            <p>Enter your educational background, including schools, degrees, and dates.</p>
            <div>
                {educationList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 my-5 border p-3 rounded-lg'>
                        <div className='col-span-2'>
                            <label className='font-bold text-xs'>University/Institute Name</label>
                            <Input
                                name='universityName'
                                onChange={(e) => handleChange(e, index)}
                                value={item.universityName}
                            />
                        </div>
                        <div className='mb-2 dark:color-white'>
                            <label className='font-bold text-xs'>Start Date</label>
                            <Input
                            className=''
                                type='date'
                                name='startDate'
                                onChange={(e) => handleChange(e, index)}
                                value={item.startDate}
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold text-xs'>End Date</label>
                            <Input
                                type='date'
                                name='endDate'
                                onChange={(e) => handleChange(e, index)}
                                value={item.endDate}
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold text-xs'>Degree</label>
                            <Input
                                name='degree'
                                onChange={(e) => handleChange(e, index)}
                                value={item.degree}
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='font-bold text-xs'>Field/Studies</label>
                            <Input
                                name='major'
                                onChange={(e) => handleChange(e, index)}
                                value={item.major}
                            />
                        </div>
                        <div className='col-span-2'>
                            <label className='font-bold text-xs'>Description (Optional)</label>
                            <textarea
                                className='w-full p-2 border bg-background rounded-md'
                                name='description'
                                rows='4'
                                onChange={(e) => handleChange(e, index)}
                                value={item.description}
                            ></textarea>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between gap-3 mt-10'>
                <div className='flex gap-3'>
                    <Button onClick={addNewEducation} className='text-primary' variant='outline'>+ Add education</Button>
                    <Button onClick={removeEducation} className='text-red-500' variant='outline'>Delete</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Education;
