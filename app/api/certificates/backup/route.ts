import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    // Read current certificates data
    const certificatesPath = join(process.cwd(), 'lib', 'data', 'certificates.ts');
    const content = await readFile(certificatesPath, 'utf-8');

    // Create backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = join(process.cwd(), 'backups', `certificates-${timestamp}.ts`);

    // Create backups directory if it doesn't exist
    const { mkdirSync, existsSync } = require('fs');
    const backupsDir = join(process.cwd(), 'backups');
    if (!existsSync(backupsDir)) {
      mkdirSync(backupsDir, { recursive: true });
    }

    // Write backup
    await writeFile(backupPath, content, 'utf-8');

    return NextResponse.json({ 
      message: 'Backup created successfully',
      backupFile: `certificates-${timestamp}.ts`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating backup:', error);
    return NextResponse.json(
      { error: 'Failed to create backup' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { backupFile } = await request.json();
    
    if (!backupFile) {
      return NextResponse.json({ error: 'Backup file name is required' }, { status: 400 });
    }

    // Read backup file
    const backupPath = join(process.cwd(), 'backups', backupFile);
    const backupContent = await readFile(backupPath, 'utf-8');

    // Restore to main certificates file
    const certificatesPath = join(process.cwd(), 'lib', 'data', 'certificates.ts');
    await writeFile(certificatesPath, backupContent, 'utf-8');

    return NextResponse.json({ 
      message: 'Certificates restored successfully',
      restoredFrom: backupFile,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error restoring backup:', error);
    return NextResponse.json(
      { error: 'Failed to restore backup' },
      { status: 500 }
    );
  }
}
