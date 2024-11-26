import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req: NextRequest) {
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();

    const appListsPath = 'app/appLists';
    const appListsDir = path.resolve(appListsPath);
    const appListsFiles = await fs.readdir(appListsDir);

    const fileName = `${id}.json`;
    if (appListsFiles.includes(fileName)) {
        const filePath = path.join(appListsDir, fileName);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const jsonContent = JSON.parse(fileContent);
        return NextResponse.json(jsonContent);
    } else {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
}