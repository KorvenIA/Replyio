'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Settings() {
  const router = useRouter();

  // 1. Academy Profile State
  const [academyName, setAcademyName] = useState('Academy Name');
  const [supportEmail, setSupportEmail] = useState('admin@academy.com');
  const [websiteUrl, setWebsiteUrl] = useState('https://academy.com');
  const [savedAcademyName, setSavedAcademyName] = useState('Academy Name');
  const [savedSupportEmail, setSavedSupportEmail] = useState('admin@academy.com');

  const [isProfileSaving, setIsProfileSaving] = useState(false);

  // 2. AI Configuration State
  const [aiProvider, setAiProvider] = useState<'Groq' | 'Gemini'>('Groq');
  const [apiKey, setApiKey] = useState('gsk_y7u3n2b8f8w90q1a2s3d4f5g6h7j8k9l');
  const [showApiKey, setShowApiKey] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'Connected' | 'Not configured'>('Connected');
  
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isAISaving, setIsAISaving] = useState(false);

  // 3. Chat Widget Code
  const widgetCode = `<script src="https://replyio.app/widget.js" data-key="YOUR_KEY"></script>`;
  const [isCopied, setIsCopied] = useState(false);

  // 4. Danger Zone Modal Triggers
  const [dangerModal, setDangerModal] = useState<'reset' | 'delete' | null>(null);
  const [dangerConfirmText, setDangerConfirmText] = useState('');
  const [isDangerActionRunning, setIsDangerActionRunning] = useState(false);

  // Success Toast States
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!academyName.trim() || !supportEmail.trim()) return;

    setIsProfileSaving(true);
    setTimeout(() => {
      setIsProfileSaving(false);
      setSavedAcademyName(academyName.trim());
      setSavedSupportEmail(supportEmail.trim());
      triggerToast('Academy profile updated successfully!');
    }, 600);
  };

  const handleTestConnection = () => {
    if (!apiKey.trim()) {
      setConnectionStatus('Not configured');
      triggerToast('Please provide an API Key first.', 'error');
      return;
    }

    setIsTestingConnection(true);
    setTimeout(() => {
      setIsTestingConnection(false);
      setConnectionStatus('Connected');
      triggerToast('AI Service connected successfully!');
    }, 800);
  };

  const handleSaveAIConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAISaving(true);
    setTimeout(() => {
      setIsAISaving(false);
      if (apiKey.trim()) {
        setConnectionStatus('Connected');
        triggerToast('AI Configuration saved successfully!');
      } else {
        setConnectionStatus('Not configured');
        triggerToast('AI credentials cleared.', 'info');
      }
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(widgetCode);
    setIsCopied(true);
    triggerToast('Embed code copied to clipboard!', 'success');
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleDangerAction = () => {
    // Validate text confirmation matches saved academy name
    if (dangerConfirmText.trim().toLowerCase() !== savedAcademyName.toLowerCase()) {
      triggerToast('Confirmation text does not match.', 'error');
      return;
    }

    setIsDangerActionRunning(true);
    setTimeout(() => {
      setIsDangerActionRunning(false);
      if (dangerModal === 'reset') {
        // Reset states to default values
        setAcademyName('Academy Name');
        setSupportEmail('admin@academy.com');
        setWebsiteUrl('https://academy.com');
        setSavedAcademyName('Academy Name');
        setSavedSupportEmail('admin@academy.com');
        setAiProvider('Groq');
        setApiKey('gsk_y7u3n2b8f8w90q1a2s3d4f5g6h7j8k9l');
        setConnectionStatus('Connected');
        setDangerModal(null);
        setDangerConfirmText('');
        triggerToast('All settings reset to defaults!', 'info');
      } else if (dangerModal === 'delete') {
        setDangerModal(null);
        triggerToast('Academy deleted. Redirecting you home...', 'info');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    }, 1200);
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

            {/* Knowledge Base Link */}
            <Link href="/dashboard/knowledge" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2A2A3E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.001c0 5.563 3.1 10.419 7.574 13.069.3.23.630.189.855-.02a.5.5 0 00.11-.557l-4.063-5.863m0 0h13.52m0 0c1.07-.629 1.948-1.596 2.519-2.585" />
              </svg>
              Knowledge Base
            </Link>

            {/* Settings Link (Active) */}
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </div>
        </nav>

        {/* User Profile dynamically synced with saved states */}
        <div className="px-6 py-6 border-t border-[#2A2A3E] flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {savedAcademyName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" title={savedAcademyName}>{savedAcademyName}</p>
            <p className="text-xs text-gray-400 truncate" title={savedSupportEmail}>{savedSupportEmail}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center flex-shrink-0 shadow-xs">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
          <span className="text-xs text-gray-400 font-semibold tracking-wide uppercase bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
            Replyio · Core Config
          </span>
        </div>

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 max-w-4xl w-full mx-auto">
          
          {/* Section 1: Academy Profile */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-800 tracking-tight mb-1">Academy Profile</h2>
            <p className="text-xs text-gray-400 mb-6 font-medium">Update the public parameters and details of your academy portal.</p>
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Academy Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="profile-name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Academy Name
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    required
                    value={academyName}
                    onChange={(e) => setAcademyName(e.target.value)}
                    placeholder="e.g. Korven Programming Academy"
                    className="px-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Support Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="profile-email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Support Email
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    required
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="e.g. support@korven.com"
                    className="px-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="profile-website" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Website URL
                </label>
                <input
                  id="profile-website"
                  type="url"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="e.g. https://academy.korven.com"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isProfileSaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProfileSaving ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving Profile...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Section 2: AI Configuration */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 tracking-tight mb-1">AI Configuration</h2>
                <p className="text-xs text-gray-400 font-medium">Link your custom AI providers to power semantic search and chatbot answering.</p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                  connectionStatus === 'Connected'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    connectionStatus === 'Connected' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                  }`} />
                  {connectionStatus}
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveAIConfig} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* AI Provider Selector */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ai-provider" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    AI Provider
                  </label>
                  <div className="relative">
                    <select
                      id="ai-provider"
                      value={aiProvider}
                      onChange={(e) => setAiProvider(e.target.value as any)}
                      className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none transition-all"
                    >
                      <option value="Groq">Groq Inference Engine</option>
                      <option value="Gemini">Google Gemini LLM</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* API Key with eye toggle */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label htmlFor="ai-key" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    API Credentials Key
                  </label>
                  <div className="relative flex-1">
                    <input
                      id="ai-key"
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter provider API Secret Token Key..."
                      className="w-full pl-3.5 pr-10 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      {showApiKey ? (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTestingConnection}
                  className="px-4 py-2 border border-gray-300 hover:border-blue-500 hover:bg-blue-50/20 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isTestingConnection ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Testing...
                    </>
                  ) : (
                    'Test Connection'
                  )}
                </button>
                <button
                  type="submit"
                  disabled={isAISaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isAISaving ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving Config...
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Section 3: Chat Widget */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-800 tracking-tight mb-1">Chat Widget</h2>
            <p className="text-xs text-gray-400 mb-6 font-medium">Embed the automated reply chatbot assistant on your academy homepage.</p>
            
            <div className="space-y-4">
              {/* Embed snippet view */}
              <div className="relative group">
                <textarea
                  readOnly
                  value={widgetCode}
                  className="w-full px-4 py-4 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-mono resize-none leading-relaxed block focus:outline-none select-all"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCopied
                      ? 'bg-emerald-600 text-white border border-emerald-500'
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-5 5h7m-7 4h7" />
                      </svg>
                      Copy Code
                    </>
                  )}
                </button>
              </div>

              {/* Instructions requested by user */}
              <p className="text-xs text-gray-500 font-medium">
                Paste this code before the closing <code className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-mono">&lt;/body&gt;</code> tag of your website
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Section 4: Danger Zone */}
          <div className="bg-red-50/30 border border-red-200 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-red-800 tracking-tight mb-1">Danger Zone</h2>
            <p className="text-xs text-red-600 mb-6 font-medium">Destructive actions that cannot be reversed. Exercise extreme caution.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setDangerModal('reset')}
                className="flex-1 py-2.5 bg-white hover:bg-red-50 border border-red-200 text-red-600 hover:text-red-700 text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
                </svg>
                Reset all data
              </button>
              <button
                type="button"
                onClick={() => setDangerModal('delete')}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 border border-red-500 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Academy
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Danger Zone High-Fidelity Alert Overlay Confirmation Modal */}
      {dangerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => {
              if (!isDangerActionRunning) {
                setDangerModal(null);
                setDangerConfirmText('');
              }
            }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-in-up">
            {/* Header */}
            <div className="px-6 py-5 bg-red-50/70 border-b border-red-100 flex items-center justify-between text-red-800">
              <div className="flex items-center gap-2.5">
                <svg className="w-5.5 h-5.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-base font-bold tracking-tight">
                  {dangerModal === 'reset' ? 'Reset All Platform Data' : 'Delete Academy Portal'}
                </h2>
              </div>
              <button
                type="button"
                disabled={isDangerActionRunning}
                onClick={() => {
                  setDangerModal(null);
                  setDangerConfirmText('');
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Warning Content */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                {dangerModal === 'reset'
                  ? 'This will wipe all historical tickets, trained knowledge base documents, and custom chatbot embeddings back to default. This action is irreversible.'
                  : 'This will completely terminate and delete this academy portal dashboard instance, clearing all domains, subscriptions, and AI setups forever.'}
              </p>

              {/* Confirm Form */}
              <div className="flex flex-col gap-2 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <label htmlFor="confirm-txt" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Type <span className="text-red-700 font-bold">"{savedAcademyName}"</span> to confirm:
                </label>
                <input
                  id="confirm-txt"
                  type="text"
                  required
                  disabled={isDangerActionRunning}
                  value={dangerConfirmText}
                  onChange={(e) => setDangerConfirmText(e.target.value)}
                  placeholder={`Confirm "${savedAcademyName}"`}
                  className="px-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-white"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex gap-3 justify-end">
              <button
                type="button"
                disabled={isDangerActionRunning}
                onClick={() => {
                  setDangerModal(null);
                  setDangerConfirmText('');
                }}
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDangerAction}
                disabled={isDangerActionRunning || dangerConfirmText.trim().toLowerCase() !== savedAcademyName.toLowerCase()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:cursor-not-allowed"
              >
                {isDangerActionRunning ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Executing...
                  </>
                ) : dangerModal === 'reset' ? (
                  'Reset Data'
                ) : (
                  'Delete Academy'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating success/notification toast */}
      <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-800 transition-all duration-300 transform ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
          toastType === 'error' ? 'bg-red-500' : toastType === 'info' ? 'bg-blue-500' : 'bg-green-500'
        }`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {toastType === 'error' ? 'Action Failed' : toastType === 'info' ? 'System Notification' : 'Success'}
          </p>
          <p className="text-xs text-slate-400">{toastMessage}</p>
        </div>
      </div>
    </div>
  );
}
