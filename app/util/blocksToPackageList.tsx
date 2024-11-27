import { PackageList } from '../types';
import { BlockData } from '../types';

const blocksToPackageList = (listName: string, blocks: BlockData[]): PackageList => {
    const packageList: PackageList = {
        name: listName,
        community: true,
        downloads: 0,
    };

    blocks.forEach(block => {
        if (block.categoryName && block.selectedPackages.length > 0) {
            packageList[block.categoryName] = block.selectedPackages.map(pkg => pkg.Latest.Name);
        }
    });

    return packageList;
};

export default blocksToPackageList;