"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, GitCommit, Github, GitPullRequest } from "lucide-react";
import Link from "next/link";

export function GitHubContributions() {
  // Mock data for GitHub contributions
  const contributionData = {
    totalContributions: 827,
    currentStreak: 12,
    longestStreak: 34,
    pullRequests: 47,
    issues: 28,
    commitsByMonth: [
      { month: "Jan", commits: 62 },
      { month: "Feb", commits: 48 },
      { month: "Mar", commits: 72 },
      { month: "Apr", commits: 56 },
      { month: "May", commits: 89 },
      { month: "Jun", commits: 103 },
    ],
  };
  
  // Find the max commits for scaling
  const maxCommits = Math.max(...contributionData.commitsByMonth.map(m => m.commits));
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Activity
          </CardTitle>
          <CardDescription>
            Summary of my GitHub contributions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Contributions</p>
              <p className="text-2xl font-bold">{contributionData.totalContributions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">{contributionData.currentStreak} days</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pull Requests</p>
              <div className="flex items-center gap-1">
                <GitPullRequest className="h-4 w-4 text-primary" />
                <p className="text-lg font-semibold">{contributionData.pullRequests}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Longest Streak</p>
              <p className="text-lg font-semibold">{contributionData.longestStreak} days</p>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-sm font-medium mb-3">Commits (Last 6 Months)</p>
            <div className="space-y-2">
              {contributionData.commitsByMonth.map((month) => (
                <div key={month.month} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{month.month}</span>
                    <span className="text-muted-foreground">{month.commits} commits</span>
                  </div>
                  <Progress value={(month.commits / maxCommits) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <Button asChild variant="outline" className="w-full mt-4">
            <Link href="https://github.com/hasrinataarya" target="_blank" rel="noopener noreferrer">
              View GitHub Profile
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Commits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <GitCommit className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium line-clamp-1">
                    Fixed responsive layout in dashboard component
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ai-project-repo • {i} day{i > 1 ? "s" : ""} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}