# Luna Pictures - VFX & Video Production Portfolio

A modern, high-performance portfolio website for Luna Pictures, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

![MIT License](https://img.shields.io/badge/license-MIT-blue) [![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)

## 🎬 About Luna Pictures

Luna Pictures is a creative production studio specializing in VFX and video production. This website showcases our portfolio, team, and services with a beautiful, performant, and content-manageable architecture.

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript 5** - Type-safe code
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **EmailJS** - Contact form handling
- **Bun** - Fast JavaScript runtime and package manager

## 📦 Getting Started

### Prerequisites

- **Bun**: Version 1.2.19 or higher (recommended) OR
- **Node.js**: Version 20.18.0 or higher
- **Git**: For cloning the repository

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/trung-hao-tran/lunapic.git
   cd lunapic
   ```

2. **Install Dependencies** (using Bun - recommended):
   ```bash
   bun install
   ```

   Or with npm:
   ```bash
   npm install
   ```

3. **Environment Setup**:

   Create a `.env.local` file in the root directory:
   ```env
   # EmailJS Configuration (for contact form)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

   # Optional: Analytics, etc.
   # NEXT_PUBLIC_GA_ID=your_google_analytics_id
   ```

4. **Run Development Server**:
   ```bash
   bun dev
   ```

   Or with npm:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 🔨 Build for Production

**Using Bun (recommended)**:
```bash
bun run build
```

**Using npm**:
```bash
npm run build
```

**Start production server**:
```bash
bun start
# or
npm start
```

### 🐳 Docker Deployment

**Build with Bun (recommended)**:
```bash
docker build . -t lunapic -f Dockerfile.bun
docker run -p 3000:3000 lunapic
```

**Build with Node.js**:
```bash
docker build . -t lunapic
docker run -p 3000:3000 lunapic
```

## 📁 Project Structure

```
lunapic/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   ├── work/              # Work/Portfolio page
│   │   ├── vfx/               # VFX team page
│   │   ├── production/        # Production team page
│   │   ├── contact/           # Contact page
│   │   └── portfolio/[id]/    # Portfolio detail pages
│   ├── components/            # React components
│   ├── lib/                   # Utilities and data loaders
│   ├── types/                 # TypeScript type definitions
│   └── config/                # App configuration
├── content/                   # JSON-based content management
│   ├── pages/                 # Page-specific content
│   │   ├── homepage/
│   │   ├── about/
│   │   ├── work/
│   │   ├── vfx/
│   │   ├── production/
│   │   └── contact/
│   └── shared/                # Shared content pool
│       ├── portfolio-items/   # Portfolio projects
│       └── team-members/      # Team member profiles
└── public/                    # Static assets
```

## ✏️ Content Management

This project uses a **JSON-based content management system** for easy updates without touching code.

### Managing Portfolio Items

Portfolio items are stored in `content/shared/portfolio-items/`. Each project has:
- `data.json` - Project metadata (title, date, categories, tags, crew, etc.)
- `images/` - Project images (thumbnail, gallery images)

**Important**: Projects must have appropriate **tags** to appear in sections:
- Use `"VFX"` tag for VFX projects
- Use `"Production"` tag for Production projects
- Items can have both tags to appear in both sections

Example `data.json`:
```json
{
  "id": "project-slug",
  "title": "Project Title",
  "date": "Jan 15 2024",
  "categories": ["Commercial", "Documentary"],
  "tags": ["VFX", "Production"],
  "thumbnail": "/images/projects/thumbnail.jpg",
  "description": "Project description...",
  "crew": ["John Doe", "Jane Smith"],
  "gallery": ["/images/projects/img1.jpg"]
}
```

### Managing Team Members

Team members are stored in `content/shared/team-members/`. Each member has:
- `data.json` - Basic info (name, role, tags, contact)
- `bio.md` - Full biography (markdown)
- `photo.jpg` - Profile photo

### Configuring Pages

Each page has a `config.json` in `content/pages/{page-name}/`:
- Gallery settings (hasViewMoreButton, etc.)
- Section settings
- Page-specific configurations

### Work Page - VFX & Production Sections

The Work page displays two sections (VFX and Production) with **automatic tag filtering**:

**File**: `content/pages/work/portfolio.json`

```json
{
  "vfxItems": [
    { "itemId": "project-slug", "order": 1, "ratio": "16:9" }
  ],
  "productionItems": [
    { "itemId": "project-slug", "order": 1, "ratio": "4:3" }
  ]
}
```

**Safety Feature**: Even if you add an item to `vfxItems` without the "VFX" tag, it will be automatically filtered out to prevent mistakes. Same applies to `productionItems` and "Production" tag.

### Category Filters

Category filters on the Work page are **automatically generated** from portfolio items' `categories` field.

To manually control which categories appear, edit `content/pages/work/categories.json`:
```json
{
  "whitelist": ["Commercial", "Documentary", "Music Video"]
}
```

Leave `whitelist` empty (`[]`) to show all categories automatically.

## 🎨 Customization

### Styling
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline with Tailwind classes

### Navigation
Edit navigation items in `src/config/navigation.ts`

### Contact Form
Configure EmailJS in `.env.local` and update settings in `src/config/contactForm.ts`

## 📝 Available Scripts

```bash
bun dev          # Start development server
bun run build    # Build for production
bun start        # Start production server
bun run lint     # Run ESLint
bun run format   # Format code with Prettier
```

## 🛠️ Development Tools

### ESLint & Prettier
This project uses ESLint for linting and Prettier for code formatting. Configuration is in:
- `eslint.config.mjs`
- `.prettierrc`

### VS Code Integration
Recommended extensions are listed in `.vscode/extensions.json`. Install them for the best development experience.

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Docker
Use the provided Dockerfiles for containerized deployment:
- `Dockerfile` - Node.js based
- `Dockerfile.bun` - Bun based (faster)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

This is a private project for Luna Pictures. For questions or issues, please contact the development team.

---

**Repository**: [https://github.com/trung-hao-tran/lunapic.git](https://github.com/trung-hao-tran/lunapic.git)

Built with ❤️ for Luna Pictures
