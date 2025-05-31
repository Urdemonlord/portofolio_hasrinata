# Portfolio Hasrinata Arya Afendi

Portfolio website yang menampilkan project, sertifikat, dan aktivitas GitHub secara real-time menggunakan GitHub API.

## Fitur Utama

### 🚀 Projects Page
- **GitHub Integration**: Menampilkan semua repository GitHub secara otomatis
- **README Extraction**: Deskripsi project diambil dari README masing-masing repository
- **Real-time Data**: Data project selalu up-to-date dari GitHub API
- **Smart Filtering**: Filter berdasarkan teknologi, pencarian, dan sorting
- **Featured Projects**: Otomatis menandai project berdasarkan stars dan teknologi

### 📊 GitHub Activity
- **Contribution Stats**: Total kontribusi, streak terkini, dan streak terpanjang
- **Monthly Commits**: Grafik commit dalam 6 bulan terakhir
- **Recent Activity**: Menampilkan commit terbaru dengan detail
- **Pull Requests & Issues**: Statistik kontribusi lengkap

### 📋 Certificates Display
- Menampilkan sertifikat yang diperoleh
- Filter berdasarkan platform dan kategori
- PDF viewer untuk sertifikat

## Teknologi yang Digunakan

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **API Integration**: GitHub REST API
- **State Management**: React Hooks
- **Deployment**: Vercel (ready)

## Setup & Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/Urdemonlord/portofolio_hasrinata.git
   cd portofolio_hasrinata
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Buat file `.env.local` dan tambahkan:
   ```env
   GITHUB_USERNAME=Urdemonlord
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

   > **Note**: GitHub token opsional untuk meningkatkan rate limit API

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Buka di browser**
   ```
   http://localhost:3000
   ```

## GitHub API Integration

### Features
- **Auto Project Detection**: Secara otomatis mengambil semua repository
- **README Parsing**: Ekstraksi deskripsi dari README dengan algoritma cerdas
- **Activity Tracking**: Menganalisis event GitHub untuk statistik
- **Rate Limiting**: Menangani API rate limits dengan caching

### API Endpoints Used
- `/users/{username}/repos` - Mengambil daftar repository
- `/repos/{username}/{repo}/readme` - Mengambil konten README
- `/users/{username}/events/public` - Mengambil aktivitas publik
- `/users/{username}` - Mengambil profil user

## Project Structure

```
components/
├── projects/
│   ├── github-contributions.tsx    # GitHub activity widget
│   ├── project-card.tsx           # Individual project card
│   ├── projects-client-content.tsx # Client-side logic
│   ├── projects-filter.tsx        # Filter & search
│   ├── projects-list.tsx          # Project listing
│   └── loading-skeletons.tsx      # Loading states
├── ui/                            # shadcn/ui components
└── ...

lib/
├── github.ts                      # GitHub API integration
├── types.ts                       # TypeScript definitions
└── data/                         # Static data

app/
├── projects/
│   ├── page.tsx                  # Main projects page
│   └── loading.tsx              # Loading page
└── ...
```

## API Functions

### `getGithubProjects()`
- Mengambil semua repository dari GitHub
- Filter repository fork dengan aktivitas rendah
- Ekstraksi README untuk deskripsi yang lebih baik
- Parsing teknologi dari language dan topics
- Sorting berdasarkan featured status dan stars

### `getGithubContributions()`
- Menganalisis aktivitas GitHub dari public events
- Menghitung streak kontribusi
- Statistik commit per bulan
- Recent commits dengan detail repo

## Optimizations

- **Caching**: ISR dengan revalidation 30-60 menit
- **Error Handling**: Graceful fallback untuk API failures
- **Loading States**: Skeleton loading untuk UX yang baik
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized API calls dan data processing

## Deployment

Project ini siap deploy ke Vercel:

```bash
npm run build
```

Environment variables perlu dikonfigurasi di platform deployment.

## Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - Lihat [LICENSE](LICENSE) file untuk detail.

---

**Hasrinata Arya Afendi**  
[GitHub](https://github.com/Urdemonlord) | [Portfolio](https://portofolio-hasrinata.vercel.app)
