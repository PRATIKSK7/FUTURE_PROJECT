<div align="center">
  <img src="https://img.icons8.com/color/96/000000/bot.png" alt="CopyCraft AI Logo"/>
  <h1>CopyCraft AI 🤖✨</h1>
  <p><strong>Enterprise Prompt Engineering Platform | Context-Aware AI Copywriting</strong></p>
  
  ![Future Interns Task 1](https://img.shields.io/badge/Future_Interns-Task_1_Submission-FF6B6B?style=for-the-badge&logo=github)

  <p>
    <a href="#features"><img src="https://img.shields.io/badge/Features-Extensive-blue.svg" alt="Features"/></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Tech_Stack-Next.js_15_|_Prisma_|_Gemini-indigo.svg" alt="Tech Stack"/></a>
    <a href="#license"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"/></a>
  </p>
</div>

---

## 📖 Project Overview
**CopyCraft AI** is a production-grade, context-aware AI platform designed specifically to streamline the generation of high-converting digital copy. It bridges the gap between raw LLM capabilities and professional marketing needs by aggressively engineering the prompts sent to the Google Gemini API. 

## ⚠️ Problem Statement
Freelance copywriters and digital marketing agencies waste countless hours attempting to wrangle generic LLMs into producing brand-aligned website copy. The primary issue is **Context Loss**. When users type basic commands like "Write my homepage," the LLM hallucinates formatting, ignores target demographics, and loses the brand voice. 

## 💡 Solution
CopyCraft AI solves this by enforcing a strict context initialization pipeline and using modular, few-shot prompt engineering techniques. Users first define their business identity, and then the platform automatically wraps their requests in highly structured system prompts tailored for specific marketing outcomes.

## 🏢 Business Chosen: Blue Ribbon Travel
For this submission, the platform has been tailored and tested around a mock business context: **Blue Ribbon Travel**. 
* **Industry**: Luxury Travel & Hospitality
* **Target Audience**: High-net-worth individuals, honeymooners, and corporate executives seeking bespoke travel experiences.
* **Tone**: Elegant, Exclusive, Reassuring, and Professional.

## ⚙️ Prompt Engineering Workflow
The platform utilizes a multi-layered prompt architecture:
1. **System Persona Injection:** Forces the LLM to adopt a master copywriter persona.
2. **Context Aggregation:** Injects the specific Blue Ribbon Travel profile into every request.
3. **Task-Specific Few-Shot Constraints:** Provides exact formatting rules (e.g., Markdown headers, bullet points, tone restrictions) based on the module chosen.

## 🧠 AI Generation Workflow
```mermaid
graph TD;
    A[User Selects Blue Ribbon Travel Profile] --> B[Context Engine Loads Profile];
    B --> C[User Selects Generation Module];
    C --> D[Prompt Compiler Merges Rules + Context];
    D --> E[Google Gemini API Receives Payload];
    E --> F[Live Streaming Text Output];
```

## ✨ Features
* 🚀 **Business Wizard Context Injection**
* 🤖 **Specialized Prompt Modules** (Homepage, SEO, Email, etc.)
* ✏️ **Interactive AI Editor with Streaming**
* 📊 **Analytics & Token Tracking**
* 💾 **Markdown & HTML Exporting**

## 💻 Tech Stack
| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, Framer Motion, Radix UI, Shadcn UI |
| **Database** | PostgreSQL via Prisma ORM |
| **Auth** | Clerk |
| **AI API** | Google Gemini API (`@google/genai`) |

## 📁 Folder Structure
```text
FUTURE_PE_01/
├── apps/
│   ├── web/           # Next.js Frontend
│   └── api/           # FastAPI Backend Service
├── packages/          # Shared internal monorepo packages
├── screenshots/       # Application screenshots
├── README.md
└── .gitignore
```

---

## 📸 Screenshots

### Landing Page
![Dashboard](screenshots/dashboard.png)

### Business Wizard
![Business Wizard](screenshots/projects.png)

### AI Generation
![AI Generation](screenshots/generation-workspace.png)

### Generated Content
![Generated Content](screenshots/generated-content.png)

### Analytics
![Analytics](screenshots/analytics.png)

---

## 🚀 Installation Guide

### Prerequisites
- Node.js (v18+)
- pnpm (`npm i -g pnpm`)

### 1. Clone the Repository
```bash
git clone https://github.com/PRATIKSK7/FUTURE_PE_01.git
cd FUTURE_PE_01
```

### 2. Install Dependencies
```bash
pnpm install
```

## 🔐 Environment Variables
Create an `.env.local` file in `apps/web/` with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL="postgresql://user:password@localhost:5432/copycraft"
GEMINI_API_KEY="AIzaSy..."
```

## 🌐 Running Frontend
Navigate to the web app directory and start the Next.js development server:
```bash
cd apps/web
pnpm run dev
```
Navigate to `http://localhost:3000`.

## ⚙️ Running Backend
If testing the decoupled API (Optional):
```bash
cd apps/api
source .venv/bin/activate
uvicorn main:app --reload
```

## 🧩 Prompt Modules
The system currently supports highly engineered modules for:
* Homepage Copy
* Services Page
* CTA Generation
* SEO Meta Tags

## 📈 Analytics
The analytics dashboard tracks token usage, API latency, and generation counts to help monitor Gemini API usage costs.

## 💾 Export Features
Generated copy can be seamlessly exported to **HTML** for immediate website insertion or **Markdown** for documentation and GitHub.

## 🛡️ Security
The application uses Clerk for robust authentication. All API routes are protected by middleware, ensuring that LLM generation endpoints cannot be abused by unauthenticated users. API Keys are safely stored server-side.

## 🚀 Future Improvements
* Integration with Anthropic Claude 3.5 Sonnet for comparative generation.
* Real-time collaboration features in the AI Editor.
* Webhook integrations for direct WordPress deployment.

## 🎓 Internship Information
This repository is submitted as **Task 1** for the **Future Interns Prompt Engineering Internship (2026)**. It serves as a comprehensive demonstration of Full Stack Engineering, AI API Integration, and Advanced Prompt Design.

## 🧑‍💻 Author Section

**Pratik S Kanoj**

**Artificial Intelligence & Data Science Engineer**

I am a passionate AI Engineer specializing in Machine Learning, Computer Vision, and full-stack integration. I build robust, production-ready AI systems that solve real-world problems. My expertise lies in taking complex Deep Learning architectures and deploying them into scalable, user-centric web applications.

**Technical Expertise:**

- **AI & Data Science:** Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Generative AI, MLOps, Data Science.
- **Backend & Cloud:** Python, FastAPI, Docker, RESTful APIs.
- **Frontend:** React, JavaScript, HTML, CSS, Streamlit.

**Connect with me:**

- 💼 **LinkedIn:** [Pratik S Kanoj](https://www.linkedin.com/in/pratik-kanoj/)
- 🐙 **GitHub:** [github.com/PRATIKSK7](https://github.com/PRATIKSK7)
- ✉️ **Email:** pratiksk0077@gmail.com

*If you found this project interesting or helpful, please consider giving it a ⭐ on GitHub!*

## 📄 License
This project is licensed under the MIT License.

## 🙏 Acknowledgements
Special thanks to the Future Interns team for providing this challenging and insightful Prompt Engineering task.
