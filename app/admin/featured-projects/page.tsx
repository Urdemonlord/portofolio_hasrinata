import { getOptimizedGithubProjects } from "@/lib/github-optimized";
import FeaturedProjectsManager from "@/components/admin/featured-projects-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Star } from "lucide-react";

export const metadata = {
  title: "Featured Projects Management | Admin",
  description: "Manage featured projects display",
};

export default async function AdminFeaturedProjectsPage() {
  const allProjects = await getOptimizedGithubProjects();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Featured Projects Management</h1>
        <p className="text-muted-foreground">
          Kelola featured projects yang akan ditampilkan di halaman utama
        </p>
      </div>

      <div className="grid gap-8">
        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Panduan Featured Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <h4 className="font-semibold">Kriteria Featured Project:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Maksimal 6 project yang bisa dijadikan featured</li>
                <li>Project dengan stars tinggi otomatis menjadi kandidat</li>
                <li>Pilih project yang paling mewakili skill dan portfolio Anda</li>
                <li>Project featured akan muncul di halaman utama dan diberi badge khusus</li>
                <li>Deskripsi akan diambil dari README jika tersedia</li>
              </ul>
            </div>
            <div className="grid gap-2">
              <h4 className="font-semibold">Tips:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Pastikan project memiliki deskripsi yang jelas di README</li>
                <li>Pilih project dengan teknologi yang beragam</li>
                <li>Project dengan demo URL akan lebih menarik</li>
              </ul>
            </div>
          </CardContent>
        </Card>        {/* Featured Projects Manager */}
        <FeaturedProjectsManager allProjects={allProjects} />
      </div>
    </div>
  );
}
