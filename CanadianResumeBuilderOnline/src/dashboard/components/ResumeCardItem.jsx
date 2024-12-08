import { DotIcon, Download, DownloadIcon, EllipsisVertical, EyeIcon, Icon, Loader, Loader2Icon, Notebook, Pen, SlidersVertical, TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false)
    const [openAlert, setOpenAlert] = useState(false);

    // const onMenuClick = (url) => {
    //     navigation(url);
    // }

    const onDelete = () => {
        setLoading(true)
        GlobalApi.DeleteResumeById(resume._id).then(resp => {
            console.log(resp);
            toast('Deleted Successfully');
            refreshData();
            setLoading(false);
            setOpenAlert(false);
        }, (error) => { setLoading(false) })
    }

    const truncateTitle = (title, length) => {
        return title.length > length ? title.slice(0, length) + '...' : title;
    }

    
    return (
        <div >
            <div className='hover:scale-105 
            
              transition-all 
              mx-2
              cursor-pointer
              w-[200px]
              h-[300px]'
              >
                <Link to={'/dashboard/resume/' + resume._id + "/edit"}>
                    <div className=' py-14 border-t-8
              items-center 
              flex justify-center 
              bg-gradient-to-b  from-pink-100 via-blue-200 to-blue-200 
              mt-5 
           
              border
              
               rounded-t-lg  
               
                            ' style={{ borderColor: resume.themeColor }}>
                        <div className='h-[80px] w-[80px] '>
                            <img src="/cv.png" />
                        </div>
                    </div>
                </Link>
                <div
                    className=' font-medium text-slate- rounded-b-lg shadow-lg '
                    style={{ backgroundColor: resume.themeColor }}
                >
                    <div className='flex items-center justify-between p-2'>
                        <div className='text-sm font-bold text-gray-50'>
                            {truncateTitle(resume.Title, 16)}
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger> <SlidersVertical color="#5490c1" /> </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className='flex justify-between items-center' onClick={() => navigation('/dashboard/resume/' + resume._id + "/edit")}>    Edit <Pen size='15px' /></DropdownMenuItem>
                                    <DropdownMenuItem className='flex justify-between items-center ' onClick={() => navigation('/my-resume/' + resume._id + "/view")}>View <EyeIcon size='15' /></DropdownMenuItem>
                                    <DropdownMenuItem className='flex justify-between items-center ' onClick={() => navigation('/my-resume/' + resume._id + "/view")}>Download<DownloadIcon size='15' /></DropdownMenuItem>
                                    <DropdownMenuItem className='flex justify-between items-center ' onClick={() => setOpenAlert(true)}>Delete<TrashIcon color='red' size='15' /></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <AlertDialog open={openAlert} >
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the resume
                                            and remove the data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={onDelete} disabled={loading} >{loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeCardItem
