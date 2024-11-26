// When a user copies or downloads their selection increment the download count in the app list json file

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    return NextResponse.json(req);
};