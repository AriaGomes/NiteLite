'use client';

import { useEffect, useState } from "react";
import { Package } from "../types";
import getCommand from "../util/getCommand";

export const DownloadWidget = ({ selected, setSelected }: { selected: Package[], setSelected: (selected: Package[]) => void }) => {
    
    const [command, setCommand] = useState<string | null>(null);

    useEffect(() => {
        console.log(command);
    }, [command]);


    const handleClick = () => {
        setCommand(getCommand(selected))
        navigator.clipboard.writeText(command || "");
    };
    return (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 p-4 shadow-lg z-50">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleClick}>
            Download
          </button>
        </div>
      );
}