import React, { useContext, useEffect, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {
    const colors = [
        "#FF5733", "#FF7133", "#FF6600", "#FF33A1", "#FF3371", 
        "#993366", "#660066", "#A133FF", "#7133FF", "#3357FF", 
        "#003366", "#006699", "#333399", "#33A1FF", "#5E4D74", 
        "#808080", "#333333", "#000000", "#800000", "#993333"
    ];

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const { resumeId } = useParams();
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad && resumeInfo) {
            if (resumeInfo?.attributes?.themeColor === null || resumeInfo?.attributes?.themeColor === undefined) {
                setSelectedColor("#000000");
                setResumeInfo(prev => ({
                    ...prev,
                    themeColor: "#000000"
                }));

                const data = {
                    data: {
                        themeColor: "#000000"
                    }
                };
                GlobalApi.UpdateResumeDetail(resumeId, data).then(resp => {
                    console.log(resp);
                    toast('Theme Color Updated');
                    setInitialLoad(false);
                });
            } else {
                setSelectedColor(resumeInfo.themeColor);
                setInitialLoad(false);
            }
        }
    }, []);
    // initialLoad, resumeInfo, setResumeInfo, resumeId

    const onColorSelect = (color) => {
        setSelectedColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        });

        const data = {
            data: {
                themeColor: color
            }
        };
        GlobalApi.UpdateResumeDetail(resumeId, data).then(resp => {
            console.log(resp);
            toast('Theme Color Updated');
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='flex gap-2'>
                    <LayoutGrid />Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer
                            hover:border-black border
                            ${selectedColor === item && 'border border-black'}`}
                            style={{ background: item }}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;
