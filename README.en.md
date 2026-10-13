# 👋 Tran Anh Tu — Portfolio

A personal portfolio website showcasing who I am, my skills, and the projects I've built.

🔗 **Live demo:** [myportfolio-anh-tu-tran.vercel.app](https://myportfolio-anh-tu-tran.vercel.app)

<!-- Tip: add a screenshot to the public/ folder and uncomment the line below -->
<!-- ![Preview](./public/preview.png) -->

---

## ✨ About

This is where I share information about myself, the projects I've worked on, and how to get in touch. Content is managed through **Sanity CMS**, so it can be updated without touching the code.

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| CMS | [Sanity](https://www.sanity.io) |
| Linting | [ESLint](https://eslint.org) |
| Deployment | [Vercel](https://vercel.com) |

## 📁 Project Structure

```
myportfolio/
├── public/      # Static assets (images, icons, ...)
├── sanity/      # Sanity configuration and schemas
├── src/         # Main Next.js application source code
├── next.config.ts
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18.18 or later
- npm (or yarn / pnpm / bun)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tranannhtu21012006/myportfolio.git
   cd myportfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** by creating a `.env.local` file in the project root

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   > Variable names may differ depending on the project's configuration — check the source in `src/` and `sanity/`.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The page auto-updates as you edit the code.

### Available Scripts

```bash
npm run dev     # Start the development server
npm run build   # Build for production
npm run start   # Run the production build
npm run lint    # Lint the code with ESLint
```

## ☁️ Deployment

The site is deployed on **Vercel**. Every push to the `main` branch triggers an automatic build and update.

To deploy your own copy, import the repository into [Vercel](https://vercel.com/new) and add the environment variables from the setup step above.

## 📬 Contact

- GitHub: [@tranannhtu21012006](https://github.com/tranannhtu21012006)
- Email: _your-email@example.com_
- LinkedIn: _your-linkedin-url_

---

⭐ If you find this project useful, consider giving it a star!
