
import { Query, QueryResult } from "../types";

export const Search = async (query: Query) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const res = await fetch(`https://api.winget.run/v2/packages?${new URLSearchParams(query as any)}`);
    const data: QueryResult = await res.json();
    return data;
    }

export default Search;