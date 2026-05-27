'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DocumentFile {
  id: string;
  name: string;
  extension: 'pdf' | 'docx';
  size: string;
  date: string;
  content: string; // Mock content for preview modal
}

// 8 realistic fake documents matching "Documents (8)" stats card
const initialDocuments: DocumentFile[] = [
  { id: 'DOC-001', name: 'Course FAQ 2026.pdf', extension: 'pdf', size: '1.2 MB', date: 'May 25, 2026', content: 'This document contains the Frequently Asked Questions for the 2026 Academy Courses, detailing system requirements, schedule policies, exam formats, and teacher support hours. All students should read this prior to starting Module 1.' },
  { id: 'DOC-002', name: 'Pricing Guide.pdf', extension: 'pdf', size: '840 KB', date: 'May 24, 2026', content: 'Our 2026 Pricing Guide covers basic subscription tiers, enterprise packages, student discount coupons, installment plans, and regional pricing adjustments. Currency rates and platform transaction taxes are listed on Page 4.' },
  { id: 'DOC-003', name: 'Refund Policy.docx', extension: 'docx', size: '120 KB', date: 'May 22, 2026', content: 'Refund Policy: Students are eligible for a 100% money-back guarantee within 14 days of purchase, provided they have completed less than 20% of course lessons. Submit requests directly via billing@academy.com.' },
  { id: 'DOC-004', name: 'Syllabus - Javascript Basics.pdf', extension: 'pdf', size: '2.4 MB', date: 'May 20, 2026', content: 'Javascript Basics Syllabus covering: Variables, Scope, Control Flow, Arrays, Object Prototypes, Asynchronous JavaScript (Promises & async/await), and modern ES6+ paradigms. Includes 12 practice exercises and a final project.' },
  { id: 'DOC-005', name: 'Student Handbook.pdf', extension: 'pdf', size: '4.1 MB', date: 'May 15, 2026', content: 'Official Student Handbook covering code of conduct, grading criteria, certificate eligibility criteria, forum moderation guidelines, and plagiarism policy. Violation of these policies may result in account termination.' },
  { id: 'DOC-006', name: 'API Integration Sandbox Guide.pdf', extension: 'pdf', size: '1.8 MB', date: 'May 12, 2026', content: 'API Sandbox Guide: Details rate limiting headers, sandbox authentication keys, webhook signature validations, and testing mock JSON payloads for all academy REST endpoints. Production endpoints require verification.' },
  { id: 'DOC-007', name: 'Welcome Package.docx', extension: 'docx', size: '310 KB', date: 'May 10, 2026', content: 'Welcome to the Academy! This package contains Discord server invitations, initial workspace setup checklists, Git workflow configurations, and calendar invites for weekly live programming office hours.' },
  { id: 'DOC-008', name: 'Support Guidelines.pdf', extension: 'pdf', size: '650 KB', date: 'May 05, 2026', content: 'Guidelines for student support queries. Details ticket response SLA guarantees (High: 4 hours, Medium: 12 hours, Low: 24 hours), how to request code reviews, and acceptable formats for logs and screenshots.' },
];

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<DocumentFile[]>(initialDocuments);
  const [lastUpdated, setLastUpdated] = useState('Today');

  // Slide-over & Modal Interactive States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeViewDoc, setActiveViewDoc] = useState<DocumentFile | null>(null);

  // New Upload Form Fields
  const [uploadName, setUploadName] = useState('');
  const [uploadExtension, setUploadExtension] = useState<'pdf' | 'docx'>('pdf');
  const [uploadSize, setUploadSize] = useState('450 KB');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDeleteDoc = (id: string, name: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    setToastMessage(`"${name}" deleted successfully.`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) return;

    // Standardize file name extensions
    let finalizedName = uploadName.trim();
    if (!finalizedName.toLowerCase().endsWith(`.${uploadExtension}`)) {
      finalizedName += `.${uploadExtension}`;
    }

    const newIdNum = documents.length + 1;
    const newId = `DOC-${newIdNum.toString().padStart(3, '0')}`;

    const newDoc: DocumentFile = {
      id: newId,
      name: finalizedName,
      extension: uploadExtension,
      size: uploadSize,
      date: 'May 27, 2026',
      content: `This is a mock training document uploaded for "${finalizedName}". This file will be processed, chunked, and embedded into the vector database to train the AI Support Chatbot context.`,
    };

    setDocuments([newDoc, ...documents]);
    setLastUpdated('Just now');
    setIsUploadOpen(false);

    // Reset Form
    setUploadName('');
    setUploadExtension('pdf');
    setUploadSize('450 KB');

    // Success Toast
    setToastMessage(`"${finalizedName}" uploaded and trained successfully.`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A2E] text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-[#2A2A3E]">
          <Link href="/dashboard" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Replyio
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8">
          <div className="space-y-4">
            {/* Dashboard Link */}
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2A2A3E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m0 0v4m0-4h4m-4 0H9" />
              </svg>
              Dashboard
            </Link>

            {/* Tickets Link */}
            <Link href="/dashboard/tickets" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2A2A3E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Tickets
            </Link>

            {/* Knowledge Base Link (Active) */}
            <Link href="/dashboard/knowledge" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.001c0 5.563 3.1 10.419 7.574 13.069.3.23.630.189.855-.02a.5.5 0 00.11-.557l-4.063-5.863m0 0h13.52m0 0c1.07-.629 1.948-1.596 2.519-2.585" />
              </svg>
              Knowledge Base
            </Link>

            {/* Settings Link */}
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2A2A3E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </a>
          </div>
        </nav>

        {/* User Profile */}
        <div className="px-6 py-6 border-t border-[#2A2A3E] flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Academy Name</p>
            <p className="text-xs text-gray-400 truncate">admin@academy.com</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center flex-shrink-0 shadow-xs">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Knowledge Base</h1>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            + Upload Document
          </button>
        </div>

        {/* Workspace Container */}
        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-shrink-0">
            {/* Documents Count Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Documents</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{documents.length}</span>
                <span className="text-xs text-gray-400">Total trained</span>
              </div>
            </div>

            {/* Last Updated Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Updated</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 tracking-tight">{lastUpdated}</span>
                <span className="text-xs text-gray-400">Sync with vector DB</span>
              </div>
            </div>

            {/* Chatbot Status Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Chatbot Status</p>
              <div className="flex items-center gap-3.5 mt-1.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Documents Grid / Workspace */}
          <div className="flex-1 flex flex-col">
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => {
                  const isPdf = doc.extension === 'pdf';
                  return (
                    <div
                      key={doc.id}
                      className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-blue-100 transition-all group"
                    >
                      {/* Top Row - Title & Icon */}
                      <div className="flex gap-4.5">
                        {/* Dynamic styled file type icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-[10px] tracking-wide uppercase text-white shadow-xs ${
                          isPdf ? 'bg-red-500 shadow-red-100' : 'bg-blue-500 shadow-blue-100'
                        }`}>
                          {doc.extension}
                        </div>

                        {/* Title details */}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-gray-800 truncate leading-snug group-hover:text-blue-600 transition-colors" title={doc.name}>
                            {doc.name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1 font-medium flex items-center gap-2">
                            <span>{doc.size}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                            <span>{doc.date}</span>
                          </p>
                        </div>
                      </div>

                      {/* Snippet / Context */}
                      <p className="text-xs text-gray-500 line-clamp-2 my-4 leading-relaxed font-medium bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                        {doc.content}
                      </p>

                      {/* Action buttons */}
                      <div className="flex gap-3 pt-2 border-t border-gray-50">
                        <button
                          onClick={() => handleDeleteDoc(doc.id, doc.name)}
                          className="flex-1 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/70 border border-red-100 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                        <button
                          onClick={() => setActiveViewDoc(doc)}
                          className="flex-1 py-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 border border-blue-100 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Beautiful dynamic Central Empty State if all documents are deleted */
              <div className="flex-1 flex items-center justify-center py-12">
                <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-2xl p-10 shadow-xs flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2 shadow-xs">
                    <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 tracking-tight">No Documents Found</h2>
                  <p className="text-xs text-gray-400 font-semibold px-4">
                    Trained files are chunked and compiled into semantic embeddings to inform AI responses.
                  </p>
                  <div className="w-full h-px bg-gray-100 my-2" />
                  {/* Empty state message requested by user */}
                  <p className="text-sm font-semibold text-blue-600 leading-relaxed max-w-xs">
                    Upload your first document to train the chatbot
                  </p>
                  <button
                    onClick={() => setIsUploadOpen(true)}
                    className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Slide-over File Upload Panel */}
      <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isUploadOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div
          onClick={() => setIsUploadOpen(false)}
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
        />

        {/* Panel Wrapper */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <div className={`w-screen max-w-md bg-white shadow-2xl border-l border-gray-100 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
            isUploadOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Header */}
            <div className="px-6 py-5 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Upload Document</h2>
                <p className="text-xs text-gray-500 mt-0.5">Train chatbot with static academy documents.</p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUploadSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Document Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="upload-name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Document Name
                </label>
                <input
                  id="upload-name"
                  type="text"
                  required
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="e.g. Grading Guidelines"
                  className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Format selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Document Format
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`border rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    uploadExtension === 'pdf'
                      ? 'border-blue-500 bg-blue-50/50 text-blue-600 font-bold'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="extension"
                      checked={uploadExtension === 'pdf'}
                      onChange={() => setUploadExtension('pdf')}
                      className="sr-only"
                    />
                    <span>PDF Document</span>
                  </label>
                  <label className={`border rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    uploadExtension === 'docx'
                      ? 'border-blue-500 bg-blue-50/50 text-blue-600 font-bold'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="extension"
                      checked={uploadExtension === 'docx'}
                      onChange={() => setUploadExtension('docx')}
                      className="sr-only"
                    />
                    <span>Word (DOCX)</span>
                  </label>
                </div>
              </div>

              {/* Document Size Input (Simulated metadata) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="upload-size" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  File Size (Estimate)
                </label>
                <select
                  id="upload-size"
                  value={uploadSize}
                  onChange={(e) => setUploadSize(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all"
                >
                  <option value="120 KB">120 KB (Small)</option>
                  <option value="450 KB">450 KB (Medium)</option>
                  <option value="1.5 MB">1.5 MB (Large)</option>
                  <option value="3.2 MB">3.2 MB (Extra Large)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer text-center"
                >
                  Upload & Train
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* High-Fidelity preview modal reader */}
      {activeViewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setActiveViewDoc(null)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] animate-slide-in-up">
            {/* Header */}
            <div className="px-6 py-5 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`px-2.5 py-1 rounded-lg text-[9px] font-bold text-white uppercase tracking-wider ${
                  activeViewDoc.extension === 'pdf' ? 'bg-red-500' : 'bg-blue-500'
                }`}>
                  {activeViewDoc.extension}
                </div>
                <h2 className="text-base font-bold text-gray-800 tracking-tight truncate max-w-[400px]">
                  {activeViewDoc.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveViewDoc(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Document Content View */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Document metadata table */}
              <div className="grid grid-cols-3 gap-4 border border-gray-100 rounded-xl p-4 bg-slate-50/50">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">File ID</span>
                  <span className="text-xs font-semibold text-gray-700 mt-0.5 block">{activeViewDoc.id}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">File Size</span>
                  <span className="text-xs font-semibold text-gray-700 mt-0.5 block">{activeViewDoc.size}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Date Uploaded</span>
                  <span className="text-xs font-semibold text-gray-700 mt-0.5 block">{activeViewDoc.date}</span>
                </div>
              </div>

              {/* Text viewer */}
              <div className="border border-gray-100 rounded-xl p-6 bg-white flex flex-col gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 pb-2">
                  Trained Vector Context
                </span>
                <p className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-wrap">
                  {activeViewDoc.content}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActiveViewDoc(null)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating success toast */}
      <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-800 transition-all duration-300 transform ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Trained Successfully</p>
          <p className="text-xs text-slate-400">{toastMessage}</p>
        </div>
      </div>
    </div>
  );
}
