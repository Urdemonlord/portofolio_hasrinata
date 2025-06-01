# Portfolio Hasrinata Arya Afendi

Modern portfolio website showcasing projects, certificates, and GitHub activities with real-time data integration and dynamic animations.

## ✨ Features Overview

### 🚀 **Projects Integration**
- **Real-time GitHub Data**: Automatically fetches and displays all GitHub repositories
- **Smart README Extraction**: Intelligent description parsing from repository README files
- **Advanced Filtering**: Filter by technology, search terms, and custom sorting options
- **Featured Projects**: Auto-highlighting based on stars, activity, and technology stack
- **Live Statistics**: Real-time project metrics and contribution tracking

### 📊 **GitHub Activity Dashboard**
- **Contribution Analytics**: Total contributions, current streaks, and historical data
- **Monthly Commit Graphs**: Visual representation of coding activity over 6 months
- **Recent Activity Feed**: Latest commits, pull requests, and repository updates
- **Technology Stack Analysis**: Automated detection and categorization of used technologies

### 🏆 **Certificate Management System**
- **Dynamic Certificate Display**: Showcasing professional achievements and certifications
- **Advanced Filtering**: Filter by platform (AWS, Google, Microsoft, etc.) and categories
- **PDF Integration**: Built-in PDF viewer for certificate documents
- **Admin Panel**: Complete certificate management system with CRUD operations
- **Automatic File Management**: Auto-saves certificates to filesystem with proper organization

### 🎨 **Dynamic Animations & UI**
- **Page Transitions**: Smooth animations between different sections
- **Hover Effects**: Interactive card animations and hover states
- **Staggered Loading**: Sequential animations for lists and grids
- **Floating Elements**: Dynamic floating animations for action buttons
- **Responsive Design**: Optimized for all device sizes with beautiful UI

### 📺 **YouTube Integration**
- **Embedded Video Player**: Seamless YouTube video integration
- **Thumbnail Previews**: Click-to-play functionality with custom thumbnails
- **Responsive Embedding**: Proper aspect ratio handling across devices

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui Components
- **Language**: TypeScript with strict type checking
- **API Integration**: GitHub REST API with intelligent caching
- **State Management**: React Hooks with optimized re-renders
- **Animations**: CSS Keyframes with dynamic timing
- **File Management**: Node.js filesystem operations
- **Deployment**: Vercel-ready configuration

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Urdemonlord/portofolio_hasrinata.git
cd portofolio_hasrinata
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env.local` file:
```env
GITHUB_USERNAME=Urdemonlord
GITHUB_TOKEN=your_github_personal_access_token_here
```

> **Note**: GitHub token is optional but recommended for higher API rate limits

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
Visit `http://localhost:3000`

## 📁 Project Architecture

```
📦 Portfolio Structure
├── 📁 app/                          # Next.js App Router
│   ├── 📁 certificates/             # Certificate management pages
│   ├── 📁 projects/                 # GitHub projects showcase
│   ├── 📁 about/                    # About page with animations
│   ├── 📁 admin/                    # Admin panel for certificate management
│   └── 📁 api/                      # API routes for data operations
├── 📁 components/                   # React components
│   ├── 📁 certificates/            # Certificate-related components
│   ├── 📁 projects/                # Project display components
│   ├── 📁 home/                    # Homepage sections
│   ├── 📁 ui/                      # shadcn/ui component library
│   └── 📁 layout/                  # Layout components (header, footer)
├── 📁 lib/                         # Utility libraries
│   ├── 📄 github.ts               # GitHub API integration
│   ├── 📄 animations.ts           # Animation utilities
│   ├── 📄 types.ts                # TypeScript definitions
│   └── 📁 data/                   # Static data files
└── 📁 public/                     # Static assets
    ├── 📁 certificates/           # Certificate PDF files
    └── 📁 img/                    # Images and media files
```

## 🔧 Core Features Deep Dive

### Certificate Management System
- **Add New Certificates**: Dynamic form with validation and file upload
- **PDF Storage**: Automatic file organization in `/public/certificates/`
- **Data Persistence**: Auto-updates `lib/data/certificates.ts`
- **Admin Interface**: Complete CRUD operations at `/admin/certificates`
- **Export Functions**: PDF, CSV, and JSON export capabilities
- **Backup System**: Automatic backup generation with restore functionality

### GitHub Integration API
- **Repository Fetching**: `getGithubProjects()` with smart filtering
- **README Processing**: Intelligent content extraction and parsing
- **Contribution Analysis**: `getGithubContributions()` for activity tracking
- **Technology Detection**: Automatic parsing from repository languages and topics
- **Performance Optimization**: Caching with ISR (Incremental Static Regeneration)

### Animation System
- **CSS Keyframes**: Custom animations defined in `globals.css`
- **Utility Classes**: Ready-to-use animation classes
- **Stagger Timing**: Sequential animations with configurable delays
- **Responsive Animations**: Optimized for different screen sizes

## 🎯 Animation Classes Available

```css
/* Slide Animations */
.animate-slide-in-up        /* Slide from bottom */
.animate-slide-in-left      /* Slide from left */

/* Scale & Fade */
.animate-fade-in-scale      /* Fade in with scale */
.animate-bounce-custom      /* Custom bounce effect */

/* Interactive Effects */
.hover-lift                 /* Lift on hover */
.card-hover                 /* Card hover animation */
.animate-float              /* Floating animation */

/* Page Transitions */
.page-transition            /* Smooth page transitions */
```

## 📊 GitHub API Integration

### Endpoints Used
- `GET /users/{username}/repos` - Repository listing
- `GET /repos/{username}/{repo}/readme` - README content
- `GET /users/{username}/events/public` - Public activity
- `GET /users/{username}` - User profile data

### Features
- **Rate Limit Handling**: Intelligent API call management
- **Error Recovery**: Graceful fallbacks for API failures
- **Data Caching**: ISR with 30-60 minute revalidation
- **Type Safety**: Full TypeScript coverage for API responses

## 🔐 Certificate Management API

### Available Endpoints
- `POST /api/certificates/add` - Add new certificate
- `DELETE /api/certificates/delete` - Remove certificate
- `GET /api/certificates/backup` - Generate backup
- `POST /api/certificates/backup` - Restore from backup

### Form Fields
**Required:**
- Title, Platform, Category, Date, Description, Issued By

**Optional:**
- Credential ID, Verification URL, Skills, PDF Upload

## 🎨 UI/UX Features

- **Dark/Light Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Loading States**: Skeleton animations for smooth user experience
- **Error Boundaries**: Graceful error handling with user feedback
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Deployment Guide

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Manual Build
```bash
npm run build
npm start
```

### Environment Variables
Required for production:
- `GITHUB_USERNAME`: Your GitHub username
- `GITHUB_TOKEN`: GitHub Personal Access Token (optional, for rate limits)

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Hasrinata Arya Afendi**  
*Full-stack & AI Developer*

---

**Hasrinata Arya Afendi**  
[GitHub](https://github.com/Urdemonlord) | [Portfolio](https://portofolio-hasrinata.vercel.app)
