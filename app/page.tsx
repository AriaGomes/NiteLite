"use client";

import { useEffect, useState } from "react";
import Card from "./components/card";
import { Package, PackageList } from "./types";
import { DownloadWidget } from "./components/downloadWidget";

export default function Home() {

  const [selected, setSelected] = useState<Package[]>([]);
  const [list, setList] = useState<PackageList>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/list/ninite`)
        .then(res => res.json())
        .then(data => {
            setList(data);
            setLoading(false);
        });
}, []);

  const excludeKeys = ["name", "downloads", "community"];
  const filteredList = list ? Object.entries(list)
    .filter(([key]) => !excludeKeys.includes(key))
    .reduce((obj: PackageList, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {} as PackageList) : {};

  return (
    <>
            {loading ? "Loading..." : (
                <>
                    <h2>{list?.name} - {list?.downloads} Downloads</h2>
                    <div className="pb-40">
                        {list && Object.keys(filteredList).map((key) => (
                            <div key={key}>
                                <h1 className="text-lg ">{key === "default" ? "" : key}</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {Array.isArray(list[key]) ? (
                                        list[key].map((pkg, index) => (
                                            <Card key={index} packageName={pkg} selected={selected} setSelected={setSelected} />
                                        ))
                                    ) : ""}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {
        selected.length > 0 ? <DownloadWidget selected={selected} /> : ""
      }
        </>
  );
}
