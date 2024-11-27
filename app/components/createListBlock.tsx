import React, { useState, useEffect } from 'react';
import PackageInput from './packageInput';
import Card from './card';
import { Package } from '../types';

interface CreateListBlockProps {
    onChange: (value: { categoryName: string, selectedPackages: Package[] }) => void;
}

const CreateListBlock: React.FC<CreateListBlockProps> = ({ onChange }) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCategoryName = event.target.value;
        setCategoryName(newCategoryName);
        onChange({ categoryName: newCategoryName, selectedPackages });
    };

    useEffect(() => {
        onChange({ categoryName, selectedPackages });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPackages]);

    return (
        <div className="flex flex-col">
            <div className="flex">
                Category Name: <input className="text-black" onChange={handleCategoryChange} />
            </div>
            {
                selectedPackages.map((p) => (
                    <Card key={p.Id} packageName={p.Latest.Name} selected={selectedPackages} setSelected={setSelectedPackages} create />
                ))
            }
            <PackageInput setSelectedPackages={setSelectedPackages} />
        </div>
    );
}

export default CreateListBlock;