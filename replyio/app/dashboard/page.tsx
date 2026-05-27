'use client';

export default function Dashboard() {
  const stats = [
    { label: 'Open Tickets', value: '12', change: '+2 this week' },
    { label: 'Resolved Today', value: '8', change: '+12% vs yesterday' },
    { label: 'Avg Response Time', value: '2h', change: '↓ 15 min' },
    { label: 'Total Students', value: '340', change: '+18 new' },
  ];

  const tickets = [
    { id: 'TK-001', student: 'Sarah Johnson', subject: 'How to access course materials?', status: 'Open', priority: 'High', date: '2 hours ago' },
    { id: 'TK-002', student: 'Miguel Rodriguez', subject: 'Certificate generation issue', status: 'In Progress', priority: 'Medium', date: '4 hours ago' },
    { id: 'TK-003', student: 'Emma Chen', subject: 'Payment method not accepted', status: 'Resolved', priority: 'High', date: 'Yesterday' },
    { id: 'TK-004', student: 'James Wilson', subject: 'Can I get a refund?', status: 'Open', priority: 'Low', date: '1 day ago' },
    { id: 'TK-005', student: 'Priya Patel', subject: 'Module 3 is not loading', status: 'In Progress', priority: 'High', date: '2 days ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'In Progress':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'Resolved':
        return 'bg-green-50 text-green-700 border border-green-200';
      default:
        return 'bg-gray-50 text-gray-700';
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
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m0 0v4m0-4h4m-4 0H9" />
              </svg>
              Dashboard
            </a>

            {/* Tickets Link */}
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2A2A3E] transition-colors">
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Ticket
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto px-8 py-8 bg-gray-50">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-600 font-medium mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-3">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tickets</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">{ticket.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{ticket.student}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{ticket.subject}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{ticket.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <p className="text-sm text-gray-600">Showing 5 of 12 tickets</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                View All Tickets →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
