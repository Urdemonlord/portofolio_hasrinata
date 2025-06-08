"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, GitCommit, Calendar, TrendingUp, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ContributionData {
  totalCommits: number;
  recentCommits: Array<{
    message: string;
    repo: string;
    date: string;
    sha: string;
  }>;
  commitsByMonth: Array<{
    month: string;
    commits: number;
  }>;
  recentCommitsCount: number;
  repositories: number;
  lastActivity: string | null;
}

interface GitHubContributionsProps {
  contributionData?: ContributionData;
}

export function GitHubContributions({ contributionData }: GitHubContributionsProps) {
  // Safe data access with fallbacks
  const data = contributionData || {
    totalCommits: 0,
    recentCommits: [],
    commitsByMonth: [],
    recentCommitsCount: 0,
    repositories: 0,
    lastActivity: null
  };

  const commitsByMonth = data?.commitsByMonth || [];
  const recentCommits = data?.recentCommits || [];
  const totalCommits = data?.totalCommits || 0;
  const recentCommitsCount = data?.recentCommitsCount || 0;
  const repositories = data?.repositories || 0;

  // Find the max commits for scaling
  const maxCommits = commitsByMonth.length > 0 
    ? Math.max(...commitsByMonth.map(m => m?.commits || 0))
    : 1;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Unknown date';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCommits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentCommitsCount}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repositories</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repositories}</div>
            <p className="text-xs text-muted-foreground">Active repos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentCommits.length}</div>
            <p className="text-xs text-muted-foreground">Recent commits</p>
          </CardContent>
        </Card>
      </div>

      {/* Commit Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Commit Activity</CardTitle>
          <CardDescription>Commits over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commitsByMonth.map((month, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{month.month}</div>
                <div className="flex-1 bg-muted rounded-full h-2 relative overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${maxCommits > 0 ? (month.commits / maxCommits) * 100 : 0}%` 
                    }}
                  />
                </div>
                <div className="w-8 text-sm text-muted-foreground text-right">
                  {month.commits}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Commits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Commits</CardTitle>
          <CardDescription>Latest development activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCommits.length > 0 ? (
              recentCommits.slice(0, 5).map((commit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <GitCommit className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {commit.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {commit.repo?.split('/')[1] || commit.repo}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(commit.date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <GitCommit className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No recent commits found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* GitHub Profile Link */}
      <Button asChild variant="outline" className="w-full">
        <Link href="https://github.com/Urdemonlord" target="_blank" rel="noopener noreferrer">
          <Github className="h-4 w-4 mr-2" />
          View GitHub Profile
          <ArrowUpRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
}