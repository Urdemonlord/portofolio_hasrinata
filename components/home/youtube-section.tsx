"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Youtube } from "lucide-react";

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const featuredVideo: VideoData = {
  id: "SzXMacu80o8",
  title: "Featured Video",
  description: "Check out this amazing content and don't forget to subscribe!",
  thumbnail: `https://img.youtube.com/vi/SzXMacu80o8/maxresdefault.jpg`,
  url: "https://youtu.be/SzXMacu80o8?si=WKqwaE8BLJC_D1As"
};

export default function YouTubeSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            Featured Content
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch my latest videos and educational content. Subscribe to stay updated with new releases!
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden group hover:shadow-xl transition-all duration-500">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">              {!isPlaying ? (
                // Thumbnail with play button
                <div className="relative w-full h-full">
                  <Image
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button
                      onClick={handlePlayVideo}
                      size="lg"
                      className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-110 shadow-2xl"
                    >
                      <Play className="h-8 w-8 text-white ml-1" />
                    </Button>
                  </div>
                  
                  {/* YouTube logo overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded px-2 py-1 flex items-center gap-1">
                    <Youtube className="h-4 w-4 text-red-600" />
                    <span className="text-xs font-medium">YouTube</span>
                  </div>
                </div>
              ) : (
                // Embedded YouTube player
                <iframe
                  src={`https://www.youtube.com/embed/${featuredVideo.id}?autoplay=1&rel=0`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </CardContent>
          
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{featuredVideo.title}</span>
              <Button asChild variant="outline" size="sm">
                <a 
                  href={featuredVideo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Watch on YouTube
                </a>
              </Button>
            </CardTitle>
            <p className="text-muted-foreground">{featuredVideo.description}</p>
          </CardHeader>
        </Card>

        {/* Call to action */}
        <div className="text-center mt-8">
          <Button asChild size="lg" className="animate-pulse">
            <a 
              href="https://youtube.com/@YourChannel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Youtube className="h-5 w-5" />
              Subscribe to My Channel
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}