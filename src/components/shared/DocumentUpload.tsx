'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Upload,
  FileText,
  Image,
  Video,
  File,
  X,
  CheckCircle,
  AlertCircle,
  Brain,
  Eye,
  Download,
  Calendar,
  Tag,
  Loader2
} from 'lucide-react';
import { Document, DocumentType, DocumentCategory, AIAnalysis } from '@/types';

interface DocumentUploadProps {
  childId?: string;
  onUploadComplete?: (documents: Document[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  showAIAnalysis?: boolean;
}

interface UploadFile extends File {
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  document?: Document;
  aiAnalysis?: AIAnalysis;
}

export function DocumentUpload({
  childId,
  onUploadComplete,
  maxFiles = 10,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.mp4', '.mov'],
  showAIAnalysis = true
}: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const documentTypes: { value: DocumentType; label: string; icon: React.ReactNode }[] = [
    { value: 'assessment_report', label: 'Assessment Report', icon: <FileText className="h-4 w-4" /> },
    { value: 'medical_report', label: 'Medical Report', icon: <FileText className="h-4 w-4" /> },
    { value: 'therapy_report', label: 'Therapy Report', icon: <FileText className="h-4 w-4" /> },
    { value: 'school_report', label: 'School Report', icon: <FileText className="h-4 w-4" /> },
    { value: 'ehc_plan', label: 'EHC Plan', icon: <FileText className="h-4 w-4" /> },
    { value: 'legal_document', label: 'Legal Document', icon: <FileText className="h-4 w-4" /> },
    { value: 'correspondence', label: 'Correspondence', icon: <FileText className="h-4 w-4" /> },
    { value: 'photo', label: 'Photo/Image', icon: <Image className="h-4 w-4" /> },
    { value: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
    { value: 'other', label: 'Other', icon: <File className="h-4 w-4" /> }
  ];

  const documentCategories: { value: DocumentCategory; label: string }[] = [
    { value: 'diagnosis', label: 'Diagnosis' },
    { value: 'assessment', label: 'Assessment' },
    { value: 'intervention', label: 'Intervention' },
    { value: 'education', label: 'Education' },
    { value: 'legal', label: 'Legal' },
    { value: 'medical', label: 'Medical' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'personal', label: 'Personal' }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    if (files.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const uploadFiles: UploadFile[] = newFiles.map(file => ({
      ...file,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...uploadFiles]);

    // Start uploading files
    uploadFiles.forEach(uploadFile);
  };

  const uploadFile = async (file: UploadFile) => {
    try {
      setFiles(prev => prev.map(f =>
        f.id === file.id ? { ...f, status: 'uploading' } : f
      ));

      // Simulate file upload with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, progress } : f
        ));
      }

      // Create document object
      const document: Document = {
        id: file.id,
        childId: childId || '',
        title: file.name,
        type: detectDocumentType(file.name),
        category: detectDocumentCategory(file.name),
        uploadedBy: 'current-user-id',
        uploadedDate: new Date(),
        fileUrl: URL.createObjectURL(file),
        fileSize: file.size,
        mimeType: file.type,
        isConfidential: false,
        tags: []
      };

      setFiles(prev => prev.map(f =>
        f.id === file.id ? {
          ...f,
          status: showAIAnalysis ? 'processing' : 'completed',
          document
        } : f
      ));

      // AI Analysis (if enabled)
      if (showAIAnalysis) {
        const aiAnalysis = await performAIAnalysis(file);

        setFiles(prev => prev.map(f =>
          f.id === file.id ? {
            ...f,
            status: 'completed',
            aiAnalysis,
            document: {
              ...document,
              aiAnalysis
            }
          } : f
        ));
      }

    } catch (error) {
      setFiles(prev => prev.map(f =>
        f.id === file.id ? {
          ...f,
          status: 'error',
          error: 'Upload failed'
        } : f
      ));
    }
  };

  const performAIAnalysis = async (file: UploadFile): Promise<AIAnalysis> => {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockAnalysis: AIAnalysis = {
      extractedText: `Extracted text from ${file.name}...`,
      keyInformation: {
        documentType: detectDocumentType(file.name),
        dateCreated: new Date().toISOString(),
        author: 'System Analysis',
        confidenceScore: 0.95
      },
      recommendations: [
        'Consider scheduling follow-up assessment',
        'Review intervention strategies',
        'Update care plan accordingly'
      ],
      identifiedNeeds: [
        'Communication support',
        'Sensory accommodations',
        'Educational modifications'
      ],
      timeline: [],
      confidence: 0.95,
      processedDate: new Date()
    };

    return mockAnalysis;
  };

  const detectDocumentType = (filename: string): DocumentType => {
    const lower = filename.toLowerCase();
    if (lower.includes('assessment')) return 'assessment_report';
    if (lower.includes('medical') || lower.includes('diagnosis')) return 'medical_report';
    if (lower.includes('therapy') || lower.includes('ot') || lower.includes('slt')) return 'therapy_report';
    if (lower.includes('school') || lower.includes('education')) return 'school_report';
    if (lower.includes('ehc') || lower.includes('plan')) return 'ehc_plan';
    if (lower.includes('legal') || lower.includes('tribunal')) return 'legal_document';
    if (lower.includes('letter') || lower.includes('email')) return 'correspondence';
    if (lower.match(/\.(jpg|jpeg|png|gif)$/)) return 'photo';
    if (lower.match(/\.(mp4|mov|avi)$/)) return 'video';
    return 'other';
  };

  const detectDocumentCategory = (filename: string): DocumentCategory => {
    const lower = filename.toLowerCase();
    if (lower.includes('diagnosis')) return 'diagnosis';
    if (lower.includes('assessment')) return 'assessment';
    if (lower.includes('therapy') || lower.includes('intervention')) return 'intervention';
    if (lower.includes('school') || lower.includes('education')) return 'education';
    if (lower.includes('legal') || lower.includes('tribunal')) return 'legal';
    if (lower.includes('medical')) return 'medical';
    return 'administrative';
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const updateFileMetadata = (fileId: string, field: string, value: any) => {
    setFiles(prev => prev.map(f =>
      f.id === fileId && f.document ? {
        ...f,
        document: { ...f.document, [field]: value }
      } : f
    ));
  };

  const handleCompleteUpload = () => {
    const completedDocuments = files
      .filter(f => f.status === 'completed' && f.document)
      .map(f => f.document!);

    onUploadComplete?.(completedDocuments);
  };

  const getFileIcon = (file: UploadFile) => {
    if (file.type.startsWith('image/')) return <Image className="h-6 w-6 text-blue-500" />;
    if (file.type.startsWith('video/')) return <Video className="h-6 w-6 text-purple-500" />;
    if (file.type.includes('pdf')) return <FileText className="h-6 w-6 text-red-500" />;
    return <File className="h-6 w-6 text-slate-500" />;
  };

  const getStatusColor = (status: UploadFile['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'processing': return 'text-blue-600';
      case 'uploading': return 'text-orange-600';
      default: return 'text-slate-600';
    }
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'processing': return <Brain className="h-4 w-4 text-blue-600 animate-pulse" />;
      case 'uploading': return <Loader2 className="h-4 w-4 text-orange-600 animate-spin" />;
      default: return <FileText className="h-4 w-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Document Upload</span>
          </CardTitle>
          <CardDescription>
            Upload medical reports, assessments, and other relevant documents for AI analysis and organization
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Drag and drop files here
                </h3>
                <p className="text-slate-600">
                  or click to browse your computer
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Supported formats: {acceptedTypes.join(', ')}
                </p>
              </div>

              <div>
                <input
                  type="file"
                  multiple
                  accept={acceptedTypes.join(',')}
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button type="button" className="cursor-pointer">
                    Choose Files
                  </Button>
                </Label>
              </div>

              {showAIAnalysis && (
                <Alert className="border-blue-200 bg-blue-50">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    AI analysis enabled: Documents will be automatically processed to extract key information and generate insights.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Uploaded Files ({files.length})</h3>
                {files.some(f => f.status === 'completed') && (
                  <Button
                    onClick={handleCompleteUpload}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Upload
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {files.map((file) => (
                  <Card key={file.id} className="p-4">
                    <div className="space-y-4">
                      {/* File Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file)}
                          <div>
                            <h4 className="font-medium text-slate-900">{file.name}</h4>
                            <p className="text-sm text-slate-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusIcon(file.status)}
                          <span className={`text-sm font-medium ${getStatusColor(file.status)}`}>
                            {file.status === 'pending' && 'Pending'}
                            {file.status === 'uploading' && 'Uploading...'}
                            {file.status === 'processing' && 'Processing...'}
                            {file.status === 'completed' && 'Complete'}
                            {file.status === 'error' && 'Error'}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {(file.status === 'uploading' || file.status === 'processing') && (
                        <div className="space-y-2">
                          <Progress value={file.progress} className="h-2" />
                          <p className="text-xs text-slate-500">
                            {file.status === 'uploading' && `Uploading... ${file.progress}%`}
                            {file.status === 'processing' && 'Analyzing with AI...'}
                          </p>
                        </div>
                      )}

                      {/* Error Message */}
                      {file.status === 'error' && file.error && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700">
                            {file.error}
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Document Metadata (for completed files) */}
                      {file.status === 'completed' && file.document && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                          <div className="space-y-2">
                            <Label>Document Type</Label>
                            <Select
                              value={file.document.type}
                              onValueChange={(value: DocumentType) => updateFileMetadata(file.id, 'type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {documentTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    <div className="flex items-center space-x-2">
                                      {type.icon}
                                      <span>{type.label}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                              value={file.document.category}
                              onValueChange={(value: DocumentCategory) => updateFileMetadata(file.id, 'category', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {documentCategories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label>Title</Label>
                            <Input
                              value={file.document.title}
                              onChange={(e) => updateFileMetadata(file.id, 'title', e.target.value)}
                              placeholder="Document title"
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label>Tags</Label>
                            <Input
                              placeholder="Add tags separated by commas"
                              onChange={(e) => updateFileMetadata(file.id, 'tags', e.target.value.split(',').map(t => t.trim()))}
                            />
                          </div>
                        </div>
                      )}

                      {/* AI Analysis Results */}
                      {file.aiAnalysis && (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2">
                            <Brain className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium text-blue-900">AI Analysis Results</h4>
                            <Badge className="bg-blue-100 text-blue-700">
                              {Math.round(file.aiAnalysis.confidence * 100)}% confidence
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-slate-900 mb-2">Key Information</h5>
                              <ul className="text-sm text-slate-600 space-y-1">
                                {Object.entries(file.aiAnalysis.keyInformation).map(([key, value]) => (
                                  <li key={key} className="flex justify-between">
                                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                    <span className="font-medium">{String(value)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-medium text-slate-900 mb-2">Identified Needs</h5>
                              <div className="flex flex-wrap gap-1">
                                {file.aiAnalysis.identifiedNeeds.map((need, index) => (
                                  <Badge key={index} className="bg-purple-100 text-purple-700 text-xs">
                                    {need}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="md:col-span-2">
                              <h5 className="font-medium text-slate-900 mb-2">Recommendations</h5>
                              <ul className="text-sm text-slate-600 space-y-1">
                                {file.aiAnalysis.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
