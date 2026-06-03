import React, { useState } from 'react';
import type { Post } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ExperienceCardProps {
  post: Post;
}

// ✅ Dùng iframe Twitter embed — không CORS, không crash
function TweetEmbed({ tweetId }: { tweetId: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-[420px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-zinc-800">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      <iframe
        src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=light&dnt=true`}
        className="w-full h-full min-h-[420px]"
        frameBorder="0"
        scrolling="no"
        onLoad={() => setLoaded(true)}
        title={`Tweet ${tweetId}`}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}

export default function ExperienceCard({ post }: ExperienceCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTweetId = (url: string): string | null => {
    const match = url.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweets = post.url
    .map((link) => getTweetId(link))
    .filter((id): id is string => id !== null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(tweets.length / itemsPerPage);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const getBadgeClass = (variant: string) => {
    switch (variant) {
      case 'emerald': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
      case 'violet':  return 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300';
      case 'blue':    return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      default:        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (tweets.length === 0) return <div className="text-gray-500">No tweets available</div>;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 bg-white dark:bg-zinc-900 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <img src={post.emoji} alt={post.name} className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-semibold">{post.name}</h3>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getBadgeClass(post.badgeVariant)}`}>
              {post.projectType}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {post.role} • {post.period}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mb-8 flex-1">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {tweets
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((tweetId) => (
                    <TweetEmbed key={tweetId} tweetId={tweetId} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <>
            <button onClick={prevSlide} className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}