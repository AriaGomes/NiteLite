import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req: NextRequest) {
    const dir = path.resolve('app/appLists');
    const files = await fs.readdir(dir);
    const filesWithoutExtension = files.map(file => path.parse(file).name);
    return NextResponse.json(filesWithoutExtension);
}