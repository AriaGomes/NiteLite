'use client';

import { useEffect, useState } from "react";
import { PackageListEntry } from "../types";
import Link from "next/link";

interface ListsData {
    appLists: PackageListEntry[];
}

export const List = () => {
    const [lists, setLists] = useState<ListsData>({ appLists: []});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/list")
            .then(res => res.json())
            .then(data => {
                setLists(data);
                setLoading(false);
            });
    }, []);

    console.log(lists)

    const officialAppLists = lists.appLists ? lists.appLists.filter(list => !list.community) : [];
    const communityAppLists = lists.appLists ? lists.appLists.filter(list => list.community) : [];

    return (
        <div className="text-white p-10">
            {loading ? "Loading..." : (
                <>
                    <div>
                        <h2>Official App Lists</h2>
                        {officialAppLists.map((list, index) => (
                            <div key={index}>
                                <Link href={`${
                                    list.name === "Ninite" ? `/` :
                                    `/list/${list.id}`}`}>{list.name} - {list.download} Downloads</Link>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <h2>Community App Lists</h2>
                        {communityAppLists.map((list, index) => (
                            <div key={index}>
                                <Link href={`/list/${list.id}`}>{list.name} - {list.download} Downloads</Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default List;