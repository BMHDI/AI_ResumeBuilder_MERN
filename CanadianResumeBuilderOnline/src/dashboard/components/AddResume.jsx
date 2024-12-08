import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume(resume) {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();

    const data = {
      data: {
        Title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        themeColor: "#000000",
      },
    };
    console.log(data);

    GlobalApi.CreateNewResume(data.data).then(
      (resp) => {
        if (resp) {
          setLoading(false);
          navigation("/dashboard/resume/" + resp.data._id + "/edit");
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className=" mt-5 mx-2 border  rounded-lg hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <div
            className="    border 
                           items-center 
                           flex justify-center 
                           bg-secondary 
                           rounded-t-lg
                           w-[200px]
                           h-[200px]
        "
          onClick={() => setOpenDialog(true)}
        >
          <PlusSquare />
        </div>
        <div
          className="rounded-b-lg shadow-lg"
          style={{
            background: resume?.attributes?.themeColor,
          }}
        >
          <div className="flex items-center justify-between p-2">
            <div className=" justify-start">
              <h2 className="m-1 text-sm text-center font-medium">
                Get Strated
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <input
                className="my-3 w-full h-9 border-2"
                placeholder="Title"
                onChange={(e) => {
                  setResumeTitle(e.target.value);
                }}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
