import {useState} from "react";
import { GoChevronDown,GoChevronLeft } from "react-icons/go";

type expandablePanelProps = {
  children: React.ReactNode;
  header:React.ReactNode;
  className?:string
};

function ExpandedPanel({ children,header,className }: expandablePanelProps) {
  const[expanded,setExpanded]=useState<boolean>(false);

  const handleClick=()=>{
    setExpanded((c)=>!c)
  }

  return (
    <div className={`mb-2 border rounded ${className?className:''}`}>
      <div className="flex mx-3 p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">{header}</div>
        <div onClick={handleClick} className="cursor-pointer">
        {expanded?<GoChevronDown/>:<GoChevronLeft/>}
        </div>
      </div>
      {expanded&&<div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandedPanel;
