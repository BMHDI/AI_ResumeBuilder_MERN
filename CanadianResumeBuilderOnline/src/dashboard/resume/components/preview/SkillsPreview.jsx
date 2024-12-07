import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";

function SkillsPreview({ resumeInfo }) {
  const { skillsList } = useContext(ResumeInfoContext);

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo.themeColor,
        }}
      >
        Skills and Languages
      </h2>
      <hr
        style={{
          borderColor: resumeInfo.themeColor,
        }}
      />

      <div className="grid grid-cols-2 gap-3 my-4">
        {skillsList.map((skill, index) => (
          <div key={index} className="flex items-center ">
            <h2 className="text-xs font-bold">{skill?.name} :</h2>
            <span
              className="text-xs font-medium  px-4"
              style={{
               
                color: "black",
              }}
            >
              {skill?.level || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
