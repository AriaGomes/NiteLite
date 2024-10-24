'use client';

import { useEffect, useState } from "react";
import Card from "./components/card";
import * as list from "./ninitePackageList.json";

export default function Home() {
  type PackageList = {
    [key: string]: string[];
  };
  
  const typedList: PackageList = list as PackageList;

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="w-full h-full">
      { 
        Object.keys(typedList).map((key) => (
          <div key={key}>
            <h1>{key === "default" ? "" : key}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.isArray(typedList[key]) ? (
                typedList[key].map((pkg, index) => (
                  <Card key={index} packageName={pkg} selected={selected} setSelected={setSelected}/>
                ))
              ) : ""}
            </div>
          </div>
        ))
      
      }
    </div>
  );
}
