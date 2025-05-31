"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, GitCommit, Github, GitPullRequest } from "lucide-react";
import Link from "next/link";
import { GitHubContributionData } from "@/lib/github";

interface GitHubContributionsProps {
  contributionData?: GitHubContributionData;
}

export function GitHubContributions({ contributionData }: GitHubContributionsProps) {
  // Use provided data or fallback to mock data
  const data = contributionData || {
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    pullRequests: 0,
    issues: 0,
    commitsByMonth: [],
    recentCommits: [],
  };
  
  // Find the max commits for scaling
  const maxCommits = data.commitsByMonth.length > 0 
    ? Math.max(...data.commitsByMonth.map(m => m.commits))
    : 1;
  
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
              <p className="text-2xl font-bold">{data.totalContributions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">{data.currentStreak} days</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pull Requests</p>
              <div className="flex items-center gap-1">
                <GitPullRequest className="h-4 w-4 text-primary" />
                <p className="text-lg font-semibold">{data.pullRequests}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Longest Streak</p>
              <p className="text-lg font-semibold">{data.longestStreak} days</p>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-sm font-medium mb-3">Commits (Last 6 Months)</p>
            {data.commitsByMonth.length > 0 ? (
              <div className="space-y-2">
                {data.commitsByMonth.map((month) => (
                  <div key={month.month} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{month.month}</span>
                      <span className="text-muted-foreground">{month.commits} commits</span>
                    </div>
                    <Progress value={(month.commits / maxCommits) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No commit data available</p>
            )}
          </div>
          
          <Button asChild variant="outline" className="w-full mt-4">
            <Link href="https://github.com/Urdemonlord" target="_blank" rel="noopener noreferrer">
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
            {data.recentCommits.length > 0 ? (
              data.recentCommits.map((commit, i) => (
                <div key={commit.sha || i} className="flex gap-3">
                  <GitCommit className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">
                      {commit.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {commit.repo} • {commit.date}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent commits available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}