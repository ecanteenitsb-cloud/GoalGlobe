import { Layout } from "@/components/layout";
import { MOCK_NEWS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, User, TrendingUp, Hash } from "lucide-react";

export default function News() {
  const featuredNews = MOCK_NEWS[0];
  const otherNews = MOCK_NEWS.slice(1);

  return (
    <Layout>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold italic text-foreground">
            LATEST <span className="text-primary">HEADLINES</span>
          </h1>
          <Badge variant="outline" className="border-primary text-primary animate-pulse">
            LIVE UPDATES
          </Badge>
        </div>

        {/* Featured Article */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
               <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute bottom-0 left-0 p-6 z-20">
                 <Badge className="bg-primary text-primary-foreground hover:bg-primary mb-3">{featuredNews.category}</Badge>
                 <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">{featuredNews.title}</h2>
                 <div className="flex items-center gap-4 text-slate-300 text-sm">
                   <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredNews.date}</span>
                   <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featuredNews.author}</span>
                 </div>
               </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{featuredNews.summary}</p>
          </div>

          {/* Trending Side */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-display">
                  <TrendingUp className="w-5 h-5 text-accent" /> Trending
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["#MbappeToMadrid", "#ChampionsLeague", "#Messi", "#ManUtd", "#VAR"].map((tag, i) => (
                  <div key={tag} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground font-mono text-sm">0{i + 1}</span>
                      <span className="font-medium group-hover:text-primary transition-colors">{tag}</span>
                    </div>
                    <Hash className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherNews.map(news => (
            <Card key={news.id} className="group cursor-pointer hover:bg-card/80 transition-all border-white/5 hover:border-primary/20 overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-2 right-2 z-10">
                   <Badge variant="secondary" className="backdrop-blur bg-black/50 text-white border-none">{news.category}</Badge>
                </div>
                <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <CardContent className="p-5">
                 <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Clock className="w-3 h-3" /> {news.date}
                    <span>•</span>
                    <span className="text-primary">{news.author}</span>
                 </div>
                 <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{news.title}</h3>
                 <p className="text-sm text-muted-foreground line-clamp-2">{news.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
