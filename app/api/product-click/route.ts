import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_FILE = path.join(process.cwd(), 'data', 'productClicks.json');

interface ClickData {
  clicks: number;
  lastClick: string | null;
}

function readData(): Record<string, ClickData> {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {
      alioli: { clicks: 0, lastClick: null },
      chile: { clicks: 0, lastClick: null },
      matcha: { clicks: 0, lastClick: null },
      ajo_perejil: { clicks: 0, lastClick: null },
    };
  }
}

function writeData(data: Record<string, ClickData>): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { error: 'productId is required' },
        { status: 400 }
      );
    }

    const data = readData();

    if (!data[productId]) {
      data[productId] = { clicks: 0, lastClick: null };
    }

    data[productId].clicks += 1;
    data[productId].lastClick = new Date().toISOString();

    writeData(data);

    return NextResponse.json({ success: true, clicks: data[productId].clicks });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}
