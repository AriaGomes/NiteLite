import { Query, QueryResult } from "../types";

export const Search = async (query: Query): Promise<QueryResult> => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    });

    const res = await fetch(`https://api.winget.run/v2/packages?${params.toString()}`);
    const data: QueryResult = await res.json();
    return data;
};

export default Search;