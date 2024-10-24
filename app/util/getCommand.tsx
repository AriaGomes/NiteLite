import { Package } from "../types";

const getCommand = (packages: Package[]): string => {
  return packages.map(pkg => `winget install -e --id ${pkg.Id}`).join('; ');
};

export default getCommand;