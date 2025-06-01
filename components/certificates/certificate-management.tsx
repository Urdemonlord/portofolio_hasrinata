'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Eye, FileText, Download, Archive } from 'lucide-react';
import { mockCertificates } from '@/lib/data/certificates';
import AddCertificateForm from './add-certificate-form';

export default function CertificateManagement() {
  const [certificates, setCertificates] = useState(mockCertificates);

  const deleteCertificate = async (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        const response = await fetch(`/api/certificates/delete`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        
        if (response.ok) {
          setCertificates(prev => prev.filter(cert => cert.id !== id));
          alert('Certificate deleted successfully!');
        } else {
          alert('Error deleting certificate');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting certificate');
      }
    }
  };

  const createBackup = async () => {
    try {
      const response = await fetch('/api/certificates/backup', {
        method: 'GET'
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`✅ Backup created successfully!\nFile: ${result.backupFile}\nTime: ${new Date(result.timestamp).toLocaleString()}`);
      } else {
        alert('❌ Error creating backup');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error creating backup');
    }
  };

  return (
    <div className="container py-10">      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Certificate Management</h1>
          <p className="text-muted-foreground">Manage your certificates collection</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={createBackup}>
            <Archive className="h-4 w-4 mr-2" />
            Create Backup
          </Button>
          <AddCertificateForm />
        </div>
      </div>

      <div className="grid gap-4">
        {certificates.map((cert) => (
          <Card key={cert.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cert.platform} • {cert.category} • {cert.date}
                    </p>
                    <p className="text-sm mb-3 line-clamp-2">{cert.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cert.skills.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{cert.skills.length - 5} more
                        </Badge>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p>ID: {cert.credentialId || 'N/A'}</p>
                      <p>Issued by: {cert.issuedBy}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                {cert.pdfUrl && cert.pdfUrl !== '#' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(cert.pdfUrl, '_blank')}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                )}
                
                {cert.verificationUrl && cert.verificationUrl !== '#' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(cert.verificationUrl, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => alert('Edit functionality coming soon!')}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => deleteCertificate(cert.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No certificates found.</p>
          <AddCertificateForm />
        </div>
      )}
    </div>
  );
}
