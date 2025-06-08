import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { verifyAuth, createUnauthorizedResponse } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  // Check authentication
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return createUnauthorizedResponse();
  }

  try {
    const formData = await request.formData();
    const certificateData = JSON.parse(formData.get('certificate') as string);
    const pdfFile = formData.get('pdfFile') as File;

    // Validate required fields
    if (!certificateData.title || !certificateData.platform || !certificateData.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }    // Handle PDF file upload if provided
    if (pdfFile) {
      const bytes = await pdfFile.arrayBuffer();
      const buffer = new Uint8Array(bytes);

      // Create certificates directory if it doesn't exist
      const certificatesDir = join(process.cwd(), 'public', 'certificates');
      if (!existsSync(certificatesDir)) {
        mkdirSync(certificatesDir, { recursive: true });
      }

      // Save PDF file
      const pdfPath = join(certificatesDir, pdfFile.name);
      await writeFile(pdfPath, buffer);
      console.log(`PDF saved to: ${pdfPath}`);
    }

    // Read current certificates data
    const certificatesPath = join(process.cwd(), 'lib', 'data', 'certificates.ts');
    const currentContent = await readFile(certificatesPath, 'utf-8');

    // Parse the existing data structure
    const importMatch = currentContent.match(/import { Certificate } from "@\/lib\/types";/);
    const exportMatch = currentContent.match(/export const mockCertificates: Certificate\[\] = \[/);
    const closingMatch = currentContent.match(/\];\s*$/);

    if (!importMatch || !exportMatch || !closingMatch) {
      return NextResponse.json({ error: 'Could not parse certificates file' }, { status: 500 });
    }

    // Create new certificate object string
    const newCertificateString = `  {
    id: "${certificateData.id}",
    title: "${certificateData.title}",
    description: "${certificateData.description.replace(/"/g, '\\"')}",
    platform: "${certificateData.platform}",
    category: "${certificateData.category}",
    date: "${certificateData.date}",
    issuedBy: "${certificateData.issuedBy}",
    credentialId: "${certificateData.credentialId}",
    verificationUrl: "${certificateData.verificationUrl}",
    skills: [${certificateData.skills.map((skill: string) => `"${skill}"`).join(', ')}],
    pdfUrl: "${certificateData.pdfUrl}",
  },`;

    // Find where to insert the new certificate (at the beginning of the array)
    const beforeArray = currentContent.substring(0, exportMatch.index! + exportMatch[0].length);
    const afterArrayStart = currentContent.substring(exportMatch.index! + exportMatch[0].length);
    
    // Insert new certificate at the beginning
    const newContent = beforeArray + '\n' + newCertificateString + afterArrayStart;

    // Write back to file
    await writeFile(certificatesPath, newContent, 'utf-8');

    return NextResponse.json({ 
      message: 'Certificate added successfully',
      certificate: certificateData 
    });

  } catch (error) {
    console.error('Error adding certificate:', error);
    return NextResponse.json(
      { error: 'Failed to add certificate' },
      { status: 500 }
    );
  }
}
