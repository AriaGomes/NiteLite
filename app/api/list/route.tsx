import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { PackageList } from '@/app/types';

export async function GET() {
    const appListsPath = 'app/appLists';

    const appListDir = path.resolve(appListsPath);

    const appListFiles = await fs.readdir(appListDir);

    const officialAppLists = await Promise.all(appListFiles.map(async (file) => {
        const fileNameWithoutExtension = path.parse(file).name;
        const filePath = path.join(appListDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const jsonContent: PackageList = JSON.parse(fileContent);
        console.log(`Official file: ${file}, Name: ${jsonContent.name} Download: ${jsonContent.downloads}`);
        return {
            id: fileNameWithoutExtension,
            name: jsonContent.name,
            download: jsonContent.downloads,
            community: jsonContent.community
        };
    }));

    return NextResponse.json({
        appLists: officialAppLists
    });
}