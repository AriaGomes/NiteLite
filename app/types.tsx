export type Package = {
  Id: string;

  Versions: string[];
  Latest: {
    Name: string;
    Publisher: string;
    Tags: string[];
    Description?: string;
    Homepage?: string;
    License?: string;
    LicenseUrl?: string;
  };

  Featured: boolean;
  IconUrl?: string;
  Banner?: string;
  Logo?: string;

  UpdatedAt: Date;
  CreatedAt: Date;

  SearchScore: number;
};

export type Query = {
  query: string;
  name?: string;
  publisher?: string;
  description?: string;
  tags?: string;
  splitQuery?: boolean;
  partialMatch?: boolean;
  ensureContains?: boolean;
  preferContains?: boolean;
  sample?: number;
};

export type QueryResult = {
  Code: number;
  Packages: Package[];
  Total: number;
};

export type PackageList = {
  name: string;
  community: boolean;
  downloads: number;
  [key: string]: string[] | string | number | boolean | undefined;
};

export type PackageListEntry = {
  id: string;
  community: boolean;
  name: string;
  download: number;
};