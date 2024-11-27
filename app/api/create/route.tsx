import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const randomString = Math.random().toString(36).substring(2, 15);

  const generateFileName = async () => {
    const fileName = `${randomString}.json`;
    const filePath = path.join(process.cwd(), 'app/appLists', fileName);
    try {
      await fs.access(filePath);
      return generateFileName();
    } catch {
      return filePath;
    }
  };

  const filePath = await generateFileName();

  await fs.writeFile(filePath, JSON.stringify(body));

  return NextResponse.json(randomString);
}