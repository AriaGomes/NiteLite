import { useEffect, useState } from "react";
import Search from "../util/search";
import { Package } from "../types";

const Card = ({ packageName, selected, setSelected }: { packageName: string, selected: Package[], setSelected: (selected: Package[]) => void }) => {
    const [pkg, setPkg] = useState<Package | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await Search({
                query: packageName,
                splitQuery: false,
                partialMatch: true,
                ensureContains: true,
                preferContains: false
            });

            const foundPkg = data.Packages.find((p) => p.Latest.Name === packageName) || null;
            setPkg(foundPkg);
        };

        fetchData();
    }, [packageName]);

    const handleClick = () => {
        if (pkg) {
            if (selected.some((p) => p.Id === pkg.Id)) {
                setSelected(selected.filter((p) => p.Id !== pkg.Id));
            } else {
                setSelected([...selected, pkg]);
            }
        }
    };

    return (
        pkg ? (
            <div className="rounded" onClick={handleClick}>
                <input type="checkbox" checked={selected.some((p) => p.Id === pkg.Id)} readOnly />
                <h2>{packageName}</h2>
            </div>
        ) : null
    );
};

export default Card;