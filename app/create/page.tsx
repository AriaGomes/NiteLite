"use client";

import React, { useState } from "react";
import CreateListBlock from "../components/createListBlock";
import { BlockData, Package } from '../types';
import blocksToPackageList from "../util/blocksToPackageList";
import { useRouter } from "next/navigation";

const CreatePage = () => {
    const [listName, setListName] = useState<string>("");
    const [blocks, setBlocks] = useState<BlockData[]>([{ id: Date.now(), categoryName: "", selectedPackages: [] }]);
    const router = useRouter();
    const addBlock = () => {
        setBlocks([...blocks, { id: Date.now(), categoryName: "", selectedPackages: [] }]);
    };

    const handleDataChange = (id: number, data: { categoryName: string, selectedPackages: Package[] }) => {
        setBlocks(blocks.map(block => block.id === id ? { ...block, ...data } : block));
    };

    const handleSubmit = async () => {
        console.log(blocks);
        const response = await fetch("/api/create", {
            method: "POST",
            body: JSON.stringify(blocksToPackageList(listName, blocks)),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const id = await response.json();
            router.push(`/list/${id}`);
        } else {
            console.error("Failed to create list");
        }
    };

    return (
        <div className="text-white p-10">
            List Name: <input className="text-black" value={listName} onChange={(e) => setListName(e.target.value)} />
            {blocks.map(block => (
                <CreateListBlock key={block.id} onChange={(data) => handleDataChange(block.id, data)} />
            ))}
            <div onClick={addBlock} style={{ cursor: "pointer" }}>
                +
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CreatePage;