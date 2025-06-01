'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface NewCertificate {
  title: string;
  description: string;
  platform: string;
  category: string;
  date: string;
  issuedBy: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  pdfFile?: File;
}

const platforms = [
  'Dicoding',
  'Oracle',
  'AWS',
  'Google',
  'Microsoft',
  'Coursera',
  'Udemy',
  'Robotics Competition',
  'Other'
];

const categories = [
  'Programming',
  'Web Development',
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'DevOps',
  'Cloud Computing',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Database',
  'Software Engineering',
  'Version Control',
  'Robotics',
  'Cybersecurity',
  'Other'
];

export default function AddCertificateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [certificate, setCertificate] = useState<NewCertificate>({
    title: '',
    description: '',
    platform: '',
    category: '',
    date: '',
    issuedBy: '',
    credentialId: '',
    verificationUrl: '',
    skills: []
  });

  const addSkill = () => {
    if (newSkill.trim() && !certificate.skills.includes(newSkill.trim())) {
      setCertificate(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setCertificate(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCertificate(prev => ({ ...prev, pdfFile: file }));
    } else {
      alert('Please select a PDF file');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!certificate.title.trim()) {
      alert('Please enter a certificate title');
      return;
    }
    if (!certificate.platform) {
      alert('Please select a platform');
      return;
    }
    if (!certificate.category) {
      alert('Please select a category');
      return;
    }
    if (!certificate.description.trim()) {
      alert('Please enter a description');
      return;
    }
    if (!certificate.date.trim()) {
      alert('Please enter a date');
      return;
    }
    if (!certificate.issuedBy.trim()) {
      alert('Please enter who issued the certificate');
      return;
    }

    setIsLoading(true);

    try {
      // Generate ID from title
      const id = `cert-${certificate.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}`;
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append('certificate', JSON.stringify({
        id,
        title: certificate.title.trim(),
        description: certificate.description.trim(),
        platform: certificate.platform,
        category: certificate.category,
        date: certificate.date.trim(),
        issuedBy: certificate.issuedBy.trim(),
        credentialId: certificate.credentialId.trim(),
        verificationUrl: certificate.verificationUrl.trim() || '#',
        skills: certificate.skills.filter(skill => skill.trim()),
        pdfUrl: certificate.pdfFile ? `/certificates/${certificate.pdfFile.name}` : '#'
      }));

      if (certificate.pdfFile) {
        formData.append('pdfFile', certificate.pdfFile);
      }

      // Send to API endpoint
      const response = await fetch('/api/certificates/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('✅ Certificate added successfully! The page will refresh to show your new certificate.');
        // Reset form
        setCertificate({
          title: '',
          description: '',
          platform: '',
          category: '',
          date: '',
          issuedBy: '',
          credentialId: '',
          verificationUrl: '',
          skills: []
        });
        setIsOpen(false);
        // Refresh page to show new certificate
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const errorData = await response.json();
        alert(`❌ Error: ${errorData.error || 'Failed to add certificate'}`);
      }
    } catch (error) {
      console.error('Error adding certificate:', error);
      alert('❌ Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New Certificate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Certificate</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Certificate Title *</Label>
              <Input
                id="title"
                value={certificate.title}
                onChange={(e) => setCertificate(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder="e.g., AWS Cloud Practitioner"
              />
            </div>
            
            <div>
              <Label htmlFor="platform">Platform *</Label>
              <Select 
                value={certificate.platform} 
                onValueChange={(value) => setCertificate(prev => ({ ...prev, platform: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map(platform => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={certificate.category} 
                onValueChange={(value) => setCertificate(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="text"
                value={certificate.date}
                onChange={(e) => setCertificate(prev => ({ ...prev, date: e.target.value }))}
                required
                placeholder="e.g., January 2024 or 15 Jan 2024"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={certificate.description}
              onChange={(e) => setCertificate(prev => ({ ...prev, description: e.target.value }))}
              required
              placeholder="Describe what this certificate covers..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="issuedBy">Issued By *</Label>
              <Input
                id="issuedBy"
                value={certificate.issuedBy}
                onChange={(e) => setCertificate(prev => ({ ...prev, issuedBy: e.target.value }))}
                required
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            
            <div>
              <Label htmlFor="credentialId">Credential ID</Label>
              <Input
                id="credentialId"
                value={certificate.credentialId}
                onChange={(e) => setCertificate(prev => ({ ...prev, credentialId: e.target.value }))}
                placeholder="e.g., AWS-12345"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="verificationUrl">Verification URL</Label>
            <Input
              id="verificationUrl"
              type="url"
              value={certificate.verificationUrl}
              onChange={(e) => setCertificate(prev => ({ ...prev, verificationUrl: e.target.value }))}
              placeholder="https://verify.example.com/certificate/12345"
            />
          </div>

          <div>
            <Label>Skills</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="pdfFile">Certificate PDF</Label>
            <Input
              id="pdfFile"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {certificate.pdfFile && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected: {certificate.pdfFile.name}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
