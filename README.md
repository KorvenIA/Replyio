# Replyio · by Korven

> *Replyio helps online academies respond faster and smarter. Powered by AI, it learns from your documents and answers student questions automatically — so no question goes unanswered, even at 3am.*

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-orange.svg)
![Made with](https://img.shields.io/badge/made%20with-Next.js%20%2B%20Supabase%20%2B%20AI-blueviolet)
![By Korven](https://img.shields.io/badge/by-Korven-black)

---

## 🎯 What is Replyio?

Replyio is an **open source AI-powered support platform** built specifically for online academies. It combines an intelligent chatbot trained on your own documents with a clean ticket management system — so your students always get fast, accurate answers without you having to be available around the clock.

No expensive subscriptions. No complex setup. Just deploy, upload your docs, and you're live.

---

## 😩 The Problem

Running an online academy means answering the same questions over and over:

- *"How much does the course cost?"*
- *"Do I get a certificate?"*
- *"How do I access the platform?"*
- *"When does the next cohort start?"*

Meanwhile, you're also creating content, managing payments, and actually teaching. There's no time — and tools like Zendesk or Intercom cost €100+/month, which is simply out of reach for most small academies.

**Replyio solves this for free.**

---

## ✨ Features

### 🤖 Module A — AI Chatbot
- Embeddable widget for any website
- Trained on your own documents (PDF, Word, plain text)
- Answers questions 24/7 without human intervention
- Automatically escalates to a ticket when it can't help
- Customizable with your academy's name and colors

### 🎫 Module B — Ticket System
- Centralized panel with all open and closed tickets
- Automatic priority detection powered by AI
- Reply to students via email directly from the panel
- Full conversation history per student

### 📚 Module C — Knowledge Base
- Upload your documents once, the bot learns instantly
- Real-time updates: change a price, the bot knows immediately
- No manual rules or programming required

---

## 🚀 Deploy in Minutes

Replyio is designed so that anyone can have it running in under 5 minutes:

1. Click the **Deploy to Vercel** button below
2. Create a free Vercel account (if you don't have one)
3. Add your free AI API Key (tutorial included)
4. Upload your academy's documents
5. Copy the chat widget code to your website

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/korven/replyio)

---

## 🛠️ Tech Stack

| Layer | Technology | Platform | Cost |
|---|---|---|---|
| Frontend | Next.js / React | Vercel | Free |
| Database | PostgreSQL | Supabase | Free |
| AI Engine | LLM API | Groq / Gemini | Free |
| Email | SMTP | Resend / Gmail | Free |
| Auth | Auth.js | — | Free |

**Total infrastructure cost: €0**

---

## 📦 Installation (Self-Hosted)

```bash
# Clone the repository
git clone https://github.com/korven/replyio.git
cd replyio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see tutorial below)

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see Replyio running.

---

## 🔑 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Provider (choose one)
GROQ_API_KEY=your_groq_api_key
# or
GEMINI_API_KEY=your_gemini_api_key

# Email
RESEND_API_KEY=your_resend_api_key
```

> 📖 **Don't know how to get these keys?** Check our [step-by-step tutorial](docs/setup.md) with screenshots for every step.

---

## 🗺️ Roadmap

- [x] Project setup and architecture definition
- [ ] v0.1 — Basic AI chatbot with web interface
- [ ] v0.2 — Ticket management panel
- [ ] v0.3 — Document upload and knowledge base
- [ ] v1.0 — Public launch with full documentation
- [ ] v1.5 — Sentiment analysis and metrics dashboard
- [ ] v2.0 — Managed cloud version (Replyio Cloud)

---

## 🤝 Contributing

Replyio is open source and contributions are very welcome. Whether it's fixing a bug, improving the docs, or suggesting a new feature — all help is appreciated.

```bash
# Fork the repo
# Create your branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add your feature"

# Push and open a Pull Request
git push origin feature/your-feature-name
```

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a PR.

---

## 📄 License

Replyio is released under the [MIT License](LICENSE). Free to use, modify and distribute.

---

## 👤 Author

Built with ❤️ by **[Korven](https://github.com/korven)**

> *"One developer. Zero budget. Real impact."*

---

<p align="center">
  <sub>Replyio · by Korven · Open Source · Free Forever</sub>
</p>
