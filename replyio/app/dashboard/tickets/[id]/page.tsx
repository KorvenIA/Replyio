'use client';

import { useState } from 'react';

export default function TicketDetail() {
  const [messages, setMessages] = useState([
    { id: 1, author: 'Sarah Johnson', type: 'student', content: 'Hi, I\'ve been trying to access the course materials for Module 3, but I keep getting an error. Can you help me?', timestamp: '2 hours ago' },
    { id: 2, author: 'Academy Support', type: 'academy', content: 'Hi Sarah! Thanks for reaching out. Can you tell me what error message you\'re seeing? This will help me diagnose the issue faster.', timestamp: '1.5 hours ago' },
    { id: 3, author: 'Sarah Johnson', type: 'student', content: 'It says "Error 403: Access Denied". I\'ve already paid for the course and my account should be active.', timestamp: '1 hour ago' },
    { id: 4, author: 'Academy Support', type: 'academy', content: 'Thank you for the details. I\'ve checked your account and found the issue. Your course access was pending verification. I\'ve manually approved it now, so you should be able to access Module 3 immediately. Please try refreshing your browser.', timestamp: '30 minutes ago' },
  ]);

  const [replyText, setReplyText] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Open');
  const [ticketPriority, setTicketPriority] = useState('High');

  const handleSendReply = () => {
    if (replyText.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        author: 'Academy Support',
        type: 'academy',
        content: replyText,
        timestamp: 'just now'
      }]);
      setReplyText('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A2E] text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-[#2A2A3E]">
          <h1 className="text-2xl font-bold text-blue-400">Replyio</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8">
          <div className="space-y-4">
            {/* Dashboard Link */}
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2A2A3E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m0 0v4m0-4h4m-4 0H9" />
              </svg>
              Dashboard
            </a>

            {/* Tickets Link */}
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Tickets
            </a>

            {/* Knowledge Base Link */}
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2A2A3E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.001c0 5.563 3.1 10.419 7.574 13.069.3.23.630.189.855-.02a.5.5 0 00.11-.557l-4.063-5.863m0 0h13.52m0 0c1.07-.629 1.948-1.596 2.519-2.585" />
              </svg>
              Knowledge Base
            </a>

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
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tickets
            </a>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">TK-001</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(ticketStatus)}`}>
              {ticketStatus}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex gap-6 px-8 py-8 bg-gray-50">
          {/* Left Column - Conversation */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'academy' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'academy'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}>
                    <p className="text-sm font-semibold mb-1">{message.author}</p>
                    <p className="text-sm mb-2">{message.content}</p>
                    <p className={`text-xs ${message.type === 'academy' ? 'text-blue-100' : 'text-gray-600'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                rows={4}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSendReply}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Ticket Details */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Card Header */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Ticket Details</h2>
              </div>

              {/* Card Content */}
              <div className="px-6 py-6 space-y-6">
                {/* Student Info */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Student</p>
                  <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email</p>
                  <p className="text-sm text-gray-600">sarah.johnson@email.com</p>
                </div>

                {/* Date Created */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Date Created</p>
                  <p className="text-sm text-gray-600">May 27, 2026 at 2:30 PM</p>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option selected>High</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">Status</label>
                  <select
                    value={ticketStatus}
                    onChange={(e) => setTicketStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>

                {/* Save Button */}
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
