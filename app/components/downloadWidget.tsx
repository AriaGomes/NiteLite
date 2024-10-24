'use client';

import { useEffect, useState } from "react";
import { Package } from "../types";
import getCommand from "../util/getCommand";

export const DownloadWidget = ({ selected }: { selected: Package[]}) => {
    
    const [command, setCommand] = useState<string | null>(null);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(command || "");
    };

    useEffect(() => {
        setCommand(getCommand(selected));
    }, [selected]); 

    const handleDownloadClick = () => {
        if (command) {
            const blob = new Blob([command], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "install.ps1";
            a.click();
            URL.revokeObjectURL(url);
        } else {
            console.error("Command is null");
        }
    };
    
    return (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 p-4 shadow-lg z-50">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {
      
            handleDownloadClick()}}>
            Download
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={()=> {
  
            handleCopyClick()}}>
            Copy
          </button>
        </div>
      );
}