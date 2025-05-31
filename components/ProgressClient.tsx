"use client";

import { Progress } from "@/components/ui/progress"; // Import Progress dari ui/progress
import * as React from "react"; // Import React

interface Props {
  value: number;
  max?: number;
  className?: string;
}

export default function ProgressClient({ value, max = 100, className }: Props) {
  return <Progress value={value} max={max} className={className} />;
} 