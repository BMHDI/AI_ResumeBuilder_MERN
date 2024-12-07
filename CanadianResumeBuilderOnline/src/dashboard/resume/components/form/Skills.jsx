import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Skills({ enableNext }) {
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo, skillsList, setSkillsList } = useContext(ResumeInfoContext);

    // Update skillsList when resumeInfo changes
    useEffect(() => {
        if (resumeInfo) {
            setSkillsList(resumeInfo.skills || []);
        }
    }, []);

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
        enableNext(false);
    };

    const addNewSkill = () => {
        setSkillsList([...skillsList, { name: '', level: '' }]); // Add new skill with default empty level
        enableNext(false);
    };

    const removeSkill = () => {
        setSkillsList(skillsList.slice(0, -1));
        enableNext(false);
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest)
            }
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                enableNext(true);
                console.log(resp);
                setLoading(false);
                toast('Details updated!');
            }, (error) => {
                setLoading(false);
                toast('Server Error, Try again!');
            });
    };

    // Update resumeInfo with skillsList
    useEffect(() => {
        setResumeInfo(prevInfo => ({
            ...prevInfo,
            attributes: {
                ...prevInfo.attributes,
                skills: skillsList
            }
        }));
    }, [skillsList, setResumeInfo]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills and Languages</h2>
            <p className='mb-2'>Add your top professional skills or languages!</p>

            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                        <div>
                            <label className='text-xs font-bold'>Name</label>
                            <Input
                                className="w-full"
                                value={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div >
                            <label className='text-xs font-bold  ' >Proficiency Level</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={item.level}
                                onChange={(e) => handleChange(index, 'level', e.target.value)}
                            >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={addNewSkill} className="text-primary">+ New Skill/Language</Button>
                    <Button variant="outline" onClick={removeSkill} className="text-red-500">Delete</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
