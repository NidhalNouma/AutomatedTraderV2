import React, { useState, useEffect } from "react";
import {
  Globe,
  RefreshCw,
  ExternalLink,
  TrendingUp,
  Activity,
  Clock,
  AlertTriangle,
  Search,
  Bookmark,
  Share2,
  Zap,
} from "lucide-react";
import { Card } from "../ui";
import { getBannersByCategory, getBannerById, Banner } from "../hooks/banners";
import { useBanner } from "../hooks";

interface NewsArticle {
  title: string;
  description: string;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
  image?: string | null;
}

const TradingNewsPage: React.FC = () => {
  // Function to get banner images
  const getBannerImage = (bannerId: string) => {
    const bannerImages: { [key: string]: string } = {
      "platform-main":
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
      "discord-community":
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      "hankox-trading":
        "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=800",
      "trusted-signals":
        "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
      "isalgo-signals":
        "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800",
      "trade-alerts":
        "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800",
    };
    return (
      bannerImages[bannerId] ||
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800"
    );
  };

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Get community, education, and signals banners for news page
  const newsBanners = [
    getBannerById("platform-main"), // Connect to broker
    getBannerById("discord-community"), // Discord
    getBannerById("hankox-trading"), // Hankox
    getBannerById("trusted-signals"), // TrustedSignals
    getBannerById("isalgo-signals"), // IsAlgo
    getBannerById("trade-alerts"), // TradeAlerts
  ].filter(Boolean) as Banner[];

  const { currentBannerData, touchHandlers } = useBanner(
    newsBanners,
    true,
    8000
  );
  const ButtonIcon = currentBannerData?.buttonIcon || Globe;

  const fetchTradingNews = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let articles: NewsArticle[] = [];

      const newsSources = [
        {
          name: "CoinGecko",
          url: "https://api.coingecko.com/api/v3/news",
          transform: (data: any) =>
            (data.data || []).slice(0, 12).map((item: any) => ({
              title: item.title,
              description: item.description || item.title,
              publishedAt: item.created_at,
              source: { name: item.domain || "CoinGecko" },
              url: item.url,
              image: item.thumb_2x || item.thumb || null,
            })),
        },
        {
          name: "CryptoPanic",
          url: "https://cryptopanic.com/api/v1/posts/?public=true&kind=news&filter=hot",
          transform: (data: any) =>
            (data.results || []).slice(0, 12).map((item: any) => ({
              title: item.title,
              description: item.title,
              publishedAt: item.published_at,
              source: { name: item.source?.title || "CryptoPanic" },
              url: item.url,
              image: null, // CryptoPanic doesn't provide images in free tier
            })),
        },
        {
          name: "RSS2JSON-Cointelegraph",
          url: "https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss",
          transform: (data: any) =>
            (data.items || []).slice(0, 12).map((item: any) => ({
              title: item.title,
              description:
                item.description?.replace(/<[^>]*>/g, "").substring(0, 200) +
                  "..." || item.title,
              publishedAt: item.pubDate,
              source: { name: "Cointelegraph" },
              url: item.link,
              image: item.enclosure?.link || item.thumbnail || null,
            })),
        },
        {
          name: "RSS2JSON-CoinDesk",
          url: "https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/",
          transform: (data: any) =>
            (data.items || []).slice(0, 12).map((item: any) => ({
              title: item.title,
              description:
                item.description?.replace(/<[^>]*>/g, "").substring(0, 200) +
                  "..." || item.title,
              publishedAt: item.pubDate,
              source: { name: "CoinDesk" },
              url: item.link,
              image: item.enclosure?.link || item.thumbnail || null,
            })),
        },
      ];

      for (const source of newsSources) {
        try {
          console.log(`🔄 Trying ${source.name}...`);
          const response = await fetch(source.url, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(10000),
          });

          if (response.ok) {
            const data = await response.json();
            articles = source.transform(data);

            if (articles.length > 0) {
              console.log(
                `✅ ${source.name} success:`,
                articles.length,
                "articles"
              );
              break;
            }
          }
        } catch (sourceError) {
          console.warn(`❌ ${source.name} failed:`, sourceError);
          continue;
        }
      }

      setNews(articles);

      // Sort articles by date (newest first)
      const sortedArticles = articles.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA; // Newest first
      });

      setNews(sortedArticles.slice(0, 3));
      setLastUpdate(new Date());

      if (articles.length === 0) {
        setError("Unable to fetch news from any source");
        console.log("❌ No news sources returned data");
      } else {
        console.log(
          "✅ News updated successfully at:",
          new Date().toLocaleTimeString()
        );
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to fetch trading news");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTradingNews();
    const interval = setInterval(fetchTradingNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInMinutes = Math.abs(
      Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60))
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
          return `${diffInDays}d ago`;
        } else {
          const diffInWeeks = Math.floor(diffInDays / 7);
          return `${diffInWeeks}w ago`;
        }
      }
    }
  };

  const filteredNews = news.filter((article) => {
    const matchesSearch =
      searchTerm === "" ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.source.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Trading News
            </h1>
            <p className="text-gray-400 mt-1">
              Real-time financial and cryptocurrency news
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
              />
            </div>
            <button
              onClick={fetchTradingNews}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
              title="Refresh news"
            >
              <RefreshCw
                className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Featured Banner */}
        {currentBannerData && (
          <div className="mb-8">
            <div
              className={`bg-gradient-to-r ${currentBannerData.gradient} border ${currentBannerData.borderColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-500 shadow-lg hover:shadow-xl cursor-pointer overflow-hidden`}
              {...touchHandlers}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-purple-500/20 rounded-full flex-shrink-0">
                      <ButtonIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                    </div>
                    <div className="min-w-0 flex-1 pr-12">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-purple-400">🚀</span>
                        <h3 className="text-base sm:text-xl font-semibold text-white truncate">
                          {currentBannerData.title}
                        </h3>
                      </div>
                      {currentBannerData.subtitle && (
                        <p className="text-blue-300 text-xs sm:text-sm font-medium mb-2">
                          {currentBannerData.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                    Featured
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentBannerData.description}
                </p>

                <div className="w-full">
                  {currentBannerData.buttonLink ? (
                    <a
                      href={currentBannerData.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-sm w-full"
                    >
                      <ButtonIcon className="h-4 w-4" />
                      {currentBannerData.buttonText}
                    </a>
                  ) : (
                    <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-sm w-full">
                      <ButtonIcon className="h-4 w-4" />
                      {currentBannerData.buttonText}
                    </button>
                  )}
                </div>
              </div>

              {/* Banner Navigation Dots */}
              <div className="flex justify-center mt-4 gap-2 sm:hidden">
                {newsBanners.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index ===
                      newsBanners.findIndex(
                        (b) => b.id === currentBannerData?.id
                      )
                        ? "bg-white"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-white mb-6">Latest News</h2>

        {isLoading && news.length === 0 ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-800 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-800 rounded"></div>
                  <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-800 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/10 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    News Unavailable
                  </h3>
                  <p className="text-gray-400 text-sm">Unable to fetch news</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {error}
              </p>

              <button
                onClick={fetchTradingNews}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all text-sm w-full"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        ) : filteredNews.length === 0 ? (
          /* No Results */
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-500/10 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    No News Found
                  </h3>
                  <p className="text-gray-400 text-sm">Try different search</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                No articles match your search criteria. Try adjusting your
                search terms.
              </p>

              <button
                onClick={() => setSearchTerm("")}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-all text-sm w-full"
              >
                <Search className="h-4 w-4" />
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          /* News Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredNews.map((article, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-500/10 relative"
              >
                {/* Article Image */}
                {article.image && (
                  <div className="mb-4 -mx-6 -mt-6">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Header */}
                <div
                  className="flex items-center justify-between mb-4"
                  style={{ marginTop: article.image ? "0" : undefined }}
                >
                  <div className="flex items-center gap-3">
                    {!article.image && (
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg border border-blue-500/30 flex-shrink-0">
                        📰
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-base leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {article.source.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {getTimeAgo(article.publishedAt)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] border border-blue-500/30 flex-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Read Article
                  </a>
                  <button className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] border border-green-500/30 flex-1">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </button>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-3">
                    <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <div className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingNewsPage;
