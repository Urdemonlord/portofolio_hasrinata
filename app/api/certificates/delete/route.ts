import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { verifyAuth, createUnauthorizedResponse } from '@/lib/auth-utils';

export async function DELETE(request: NextRequest) {
  // Check authentication
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return createUnauthorizedResponse();
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    // Read current certificates data
    const certificatesPath = join(process.cwd(), 'lib', 'data', 'certificates.ts');
    const currentContent = await readFile(certificatesPath, 'utf-8');

    // Find the certificate to get PDF path before deletion
    const certMatch = currentContent.match(new RegExp(`{[^}]*id:\\s*"${id}"[^}]*}`, 'gs'));
    let pdfToDelete = null;

    if (certMatch && certMatch[0]) {
      const pdfUrlMatch = certMatch[0].match(/pdfUrl:\s*"([^"]+)"/);
      if (pdfUrlMatch && pdfUrlMatch[1] !== '#') {
        pdfToDelete = pdfUrlMatch[1];
      }
    }

    // Remove the certificate object from the content
    // This regex matches the entire certificate object including the comma
    const certRegex = new RegExp(`\\s*{[^}]*id:\\s*"${id}"[^}]*},?`, 'gs');
    let newContent = currentContent.replace(certRegex, '');

    // Clean up any double commas or trailing commas
    newContent = newContent.replace(/,(\s*,)+/g, ','); // Remove double commas
    newContent = newContent.replace(/,(\s*\])/g, '$1'); // Remove trailing comma before closing bracket

    // Write back to file
    await writeFile(certificatesPath, newContent, 'utf-8');

    // Delete PDF file if it exists
    if (pdfToDelete) {
      const pdfPath = join(process.cwd(), 'public', pdfToDelete);
      if (existsSync(pdfPath)) {
        try {
          await unlink(pdfPath);
          console.log(`PDF deleted: ${pdfPath}`);
        } catch (error) {
          console.error(`Error deleting PDF: ${error}`);
        }
      }
    }

    return NextResponse.json({ 
      message: 'Certificate deleted successfully',
      deletedId: id 
    });

  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json(
      { error: 'Failed to delete certificate' },
      { status: 500 }
    );
  }
}
