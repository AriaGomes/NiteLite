"use client";

import { useEffect, useState } from "react";
import Card from "./components/card";
import * as list from "./appLists/ninite.json";
import { Package, PackageList } from "./types";
import { DownloadWidget } from "./components/downloadWidget";

export default function Home() {
  const typedList: PackageList = list as PackageList;

  const [selected, setSelected] = useState<Package[]>([]);

  const excludeKeys = ["Community", "newProperty2"];
  const filteredList = Object.entries(typedList)
    .filter(([key]) => !excludeKeys.includes(key))
    .reduce((obj: PackageList, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {} as PackageList);

  return (
    <div className="w-full h-full">
      <div className="pb-20">
      {
        Object.keys(filteredList).map((key) => (
          <div key={key}>
            <h1 className="text-lg ">{key === "default" ? "" : key}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.isArray(typedList[key]) ? (
                typedList[key].map((pkg, index) => (
                  <Card key={index} packageName={pkg} selected={selected} setSelected={setSelected} />
                ))
              ) : ""}
            </div>
          </div>
        ))
      }
      </div>

      {
        selected.length > 0 ? <DownloadWidget selected={selected} /> : ""
      }
    </div>
  );
}
