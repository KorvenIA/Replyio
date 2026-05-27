export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-100 sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Replyio · by Korven</span>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#deploy"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Deploy Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
            <span className="text-sm font-semibold text-blue-600">Open Source · Free Forever</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            No question goes unanswered, even at 3am
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Replyio is an open-source AI-powered customer support platform designed for online academies to automate and streamline student inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#deploy"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Deploy Free
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors w-full sm:w-auto"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sound familiar?
            </h2>
            <p className="text-lg text-gray-600">
              Every academy owner knows these problems
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem Card 1 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v12m8-12v12M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Repetitive Questions</h3>
              <p className="text-gray-600">
                Students ask the same questions over and over, wasting valuable time and resources.
              </p>
            </div>

            {/* Problem Card 2 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.666" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Support Team</h3>
              <p className="text-gray-600">
                Hiring dedicated support staff is expensive and impractical for many academies.
              </p>
            </div>

            {/* Problem Card 3 */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Slow Response Times</h3>
              <p className="text-gray-600">
                Students need answers instantly, not days or weeks later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features Built for Academies
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to provide exceptional student support
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Chatbot</h3>
            <p className="text-gray-600">
              Intelligent chatbot powered by state-of-the-art AI to answer student questions instantly and accurately.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2m0 0V3a2 2 0 00-2-2h-2a2 2 0 00-2 2v2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ticket System</h3>
            <p className="text-gray-600">
              Manage complex inquiries with a robust ticket system that keeps everything organized and tracked.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.001c0 5.563 3.1 10.419 7.574 13.069.3.23.630.189.855-.02a.5.5 0 00.11-.557l-4.063-5.863m0 0h13.52m0 0c1.07-.629 1.948-1.596 2.519-2.585" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Knowledge Base</h3>
            <p className="text-gray-600">
              Build and maintain a comprehensive knowledge base so students can find answers independently.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-gray-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built on the Best Tech Stack
            </h2>
            <p className="text-lg text-gray-600">
              All free and open source, so you can deploy without vendor lock-in
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Technology</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Purpose</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Next.js</td>
                    <td className="px-6 py-4 text-sm text-gray-600">React framework for web apps</td>
                    <td className="px-6 py-4 text-sm"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Free</span></td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Supabase</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Open source Firebase alternative</td>
                    <td className="px-6 py-4 text-sm"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Free</span></td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Groq</td>
                    <td className="px-6 py-4 text-sm text-gray-600">AI inference engine</td>
                    <td className="px-6 py-4 text-sm"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Free</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Resend</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Email delivery service</td>
                    <td className="px-6 py-4 text-sm"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Free</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="deploy" className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Academy's Support?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Deploy Replyio in minutes and start delivering exceptional student support today.
          </p>
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Deploy to Vercel
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            Replyio · by Korven · <a href="https://github.com" className="text-blue-600 hover:text-blue-700">Open Source</a> · <a href="https://github.com" className="text-blue-600 hover:text-blue-700">MIT License</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
