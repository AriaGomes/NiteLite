const GetSiteFavicon = (site?: string) => {
    return site ? `https://www.google.com/s2/favicons?sz=32&domain_url=${site}` : "";
};

export default GetSiteFavicon;