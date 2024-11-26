'use client';

import { useEffect, useState } from "react";

export const List = () => {

    const [lists, setLists] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("/api/list")
        .then(res => res.json())
        .then(data => {
            setLists(data);
            setLoading(false);
        });
    }, []);

    return(
    <div className="text-white p-10">
        {loading ? "Loading..." : lists.map((list, index) => (
            <div key={index}>
                {list}                
            </div>
        ))}
    </div>
    )
}

export default List;