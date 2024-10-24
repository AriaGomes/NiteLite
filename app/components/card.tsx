import { useEffect, useState } from "react";
import Search from "../apiFunctions/search";
import { Package } from "../types";

const Card = ({ packageName, selected, setSelected }: { packageName: string, selected: string[], setSelected: (selected: string[]) => void }) => {
    const [pkg, setPkg] = useState<Package | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const data = await Search({
                query: packageName,
                splitQuery: false,
                partialMatch: true,
                ensureContains: true,
                preferContains: false
            });

            const foundPkg = data.Packages.find((p) => p.Latest.Name === packageName);
            setPkg(foundPkg);
        };

        fetchData();
    }, [packageName]);

    const handleClick = () => {
        if (selected.includes(packageName)) {
            setSelected(selected.filter((pkg: string) => pkg !== packageName));
        } else {
            setSelected([...selected, packageName]);
        }
    };

    return (
        pkg ? (
            <div className="rounded" onClick={handleClick}>
                <input type="checkbox" checked={selected.includes(packageName)} readOnly />
                <h2>{packageName}</h2>
            </div>
        ) : null
    );
};

export default Card;