import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import Search from '../util/search';
import { Package, QueryResult } from '../types';

interface PackageInputProps {
    setSelectedPackages: React.Dispatch<React.SetStateAction<Package[]>>;
}

const PackageInput: React.FC<PackageInputProps> = ({ setSelectedPackages }) => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Package[]>([]);

    const fetchResults = async (searchQuery: string): Promise<void> => {
        try {
            const data: QueryResult = await Search({ query: searchQuery });
            setResults(data.Packages);
        } catch (error) {
            console.error('Error fetching search results', error);
        }
    };

    const debouncedFetchResults = debounce((searchQuery: string) => {
        fetchResults(searchQuery);
    }, 300);

    useEffect(() => {
        if (query) {
            debouncedFetchResults(query);
        } else {
            setResults([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(e.target.value);
    };

    const handleResultClick = (result: Package): void => {
        setQuery(result.Id);
        setResults([]);
        setSelectedPackages((prevSelectedPackages) => [...prevSelectedPackages, result]);
    };

    return (
        <div className="relative">
            <div>
                App Search:
            <input
                className="text-black"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            </div>
            {results.length > 0 && (
                <ul className="absolute bg-slate-500 border border-gray-300 w-full mt-1 z-40">
                    {results.map((result, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleResultClick(result)}
                        >
                            {result.Id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PackageInput;