import { useEffect, useState } from "react";
import Search from "../util/search";
import { Package } from "../types";
import Image from "next/image";
import GetSiteFavicon from "../util/getSiteFavicon";

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

            if (!foundPkg) {
                console.error(`Could not find package with name ${packageName}`);
            }
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
            <div className="rounded flex items-center justify-between w-full h-full p-3 cursor-pointer bg-slate-600" onClick={handleClick}>
                <input type="checkbox" checked={selected.some((p) => p.Id === pkg.Id)} readOnly className="mr-2" />
                <h2 className="flex-1 text-center">{packageName}</h2>
                <div className="flex-shrink-0">
                    {GetSiteFavicon(pkg.Latest.Homepage) ? <Image src={GetSiteFavicon(pkg.Latest.Homepage)} alt={`${packageName} icon`} width={32} height={32} /> : null}
                </div>
            </div>
        ) : null
    );
};

export default Card;