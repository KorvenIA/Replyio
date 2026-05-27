'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Ticket {
  id: string;
  student: string;
  email: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  date: string;
}

// 10 realistic fake rows with mixed statuses and priorities
const initialTickets: Ticket[] = [
  { id: 'TK-001', student: 'Sarah Johnson', email: 'sarah.johnson@email.com', subject: 'How to access course materials?', status: 'Open', priority: 'High', date: '2 hours ago' },
  { id: 'TK-002', student: 'Miguel Rodriguez', email: 'miguel.rodriguez@email.com', subject: 'Certificate generation issue', status: 'In Progress', priority: 'Medium', date: '4 hours ago' },
  { id: 'TK-003', student: 'Emma Chen', email: 'emma.chen@email.com', subject: 'Payment method not accepted', status: 'Resolved', priority: 'High', date: 'Yesterday' },
  { id: 'TK-004', student: 'James Wilson', email: 'james.wilson@email.com', subject: 'Can I get a refund?', status: 'Open', priority: 'Low', date: '1 day ago' },
  { id: 'TK-005', student: 'Priya Patel', email: 'priya.patel@email.com', subject: 'Module 3 is not loading', status: 'In Progress', priority: 'High', date: '2 days ago' },
  { id: 'TK-006', student: 'Alex Thompson', email: 'alex.thompson@email.com', subject: 'WSL2 environment setup error', status: 'Open', priority: 'High', date: '2 days ago' },
  { id: 'TK-007', student: 'Sofia Martinez', email: 'sofia.martinez@email.com', subject: 'Inquiry about enterprise pricing', status: 'Resolved', priority: 'Low', date: '3 days ago' },
  { id: 'TK-008', student: 'David Kim', email: 'david.kim@email.com', subject: 'API rate limits on free sandbox', status: 'In Progress', priority: 'Medium', date: '4 days ago' },
  { id: 'TK-009', student: 'Chloe Dupont', email: 'chloe.dupont@email.com', subject: 'Incorrect invoice billing details', status: 'Open', priority: 'Medium', date: '5 days ago' },
  { id: 'TK-010', student: 'Marcus Aurelius', email: 'marcus.aurelius@email.com', subject: 'Feedback on Chapter 4 exercises', status: 'Resolved', priority: 'Low', date: '1 week ago' },
];

export default function TicketsList() {
  const router = useRouter();

  // Core List State
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  // Filters State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  // Pagination State (5 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // New Ticket Slide-over State
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newStudent, setNewStudent] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [showToast, setShowToast] = useState(false);

  // Filter Tickets dynamically
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.student.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calculate pages
  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / ITEMS_PER_PAGE));

  // Reset to page 1 if current page becomes out of bounds after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [search, statusFilter, priorityFilter, totalPages, currentPage]);

  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'In Progress':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'Resolved':
        return 'bg-green-50 text-green-700 border border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 font-semibold';
      case 'Medium':
        return 'text-yellow-600 font-semibold';
      case 'Low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.trim() || !newEmail.trim() || !newSubject.trim()) return;

    const newIdNum = tickets.length + 1;
    const newId = `TK-${newIdNum.toString().padStart(3, '0')}`;

    const newTicket: Ticket = {
      id: newId,
      student: newStudent,
      email: newEmail,
      subject: newSubject,
      status: 'Open',
      priority: newPriority,
      date: 'Just now',
    };

    setTickets([newTicket, ...tickets]);

    // Reset Form
    setNewStudent('');
    setNewEmail('');
    setNewSubject('');
    setNewPriority('Medium');
    setIsNewTicketOpen(false);

    // Show Success Toast
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
            <Link href="/dashboard/tickets" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium transition-colors">
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

            {/* Settings Link */}
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2A2A3E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tickets</h1>
          <button
            onClick={() => setIsNewTicketOpen(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            + New Ticket
          </button>
        </div>

        {/* Outer Scroll Area */}
        <div className="flex-1 overflow-auto px-8 py-8 flex flex-col gap-6">
          
          {/* Filter Bar */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48 flex flex-col gap-1">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full pl-3 pr-8 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none transition-all"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Priority Filter */}
            <div className="w-full md:w-48 flex flex-col gap-1">
              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as any)}
                  className="w-full pl-3 pr-8 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none transition-all"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tickets Table Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs flex-1 flex flex-col overflow-hidden">
            {/* Table wrapper */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-slate-50/70">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedTickets.length > 0 ? (
                    paginatedTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        onClick={() => router.push(`/dashboard/tickets/${ticket.id}`)}
                        className="hover:bg-slate-50/50 cursor-pointer transition-colors group"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-blue-600 group-hover:underline">
                          {ticket.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {ticket.student}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate font-medium">
                          {ticket.subject}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                          {ticket.date}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                        <div className="flex flex-col items-center gap-3">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="font-semibold">No tickets found</p>
                          <p className="text-xs text-gray-400">Try adjusting your filters or search query.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 bg-slate-50/70 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0">
              <p className="text-sm text-gray-600">
                Showing{' '}
                <span className="font-semibold">
                  {filteredTickets.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}
                </span>{' '}
                to{' '}
                <span className="font-semibold">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredTickets.length)}
                </span>{' '}
                of <span className="font-semibold">{filteredTickets.length}</span> tickets
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Slide-over New Ticket Panel */}
      <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isNewTicketOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div
          onClick={() => setIsNewTicketOpen(false)}
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
        />

        {/* Panel Wrapper */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <div className={`w-screen max-w-md bg-white shadow-2xl border-l border-gray-100 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
            isNewTicketOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Header */}
            <div className="px-6 py-5 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Create Support Ticket</h2>
                <p className="text-xs text-gray-500 mt-0.5">Add a new inquiry record into the system.</p>
              </div>
              <button
                onClick={() => setIsNewTicketOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleCreateTicket} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Student Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="new-student-name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Student Name
                </label>
                <input
                  id="new-student-name"
                  type="text"
                  required
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Student Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="new-student-email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="new-student-email"
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. john.doe@email.com"
                  className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="new-ticket-subject" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Ticket Subject
                </label>
                <input
                  id="new-ticket-subject"
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Course access Pending verification"
                  className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Priority Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="new-ticket-priority" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Priority level
                </label>
                <div className="relative">
                  <select
                    id="new-ticket-priority"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none transition-all"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer text-center"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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
          <p className="text-sm font-semibold">Ticket Created</p>
          <p className="text-xs text-slate-400">The support ticket has been added successfully.</p>
        </div>
      </div>
    </div>
  );
}
