import { useState } from "react";
import { Layout } from "@/components/layout";
import { MOCK_MATCHES, MOCK_LEAGUES, MOCK_NEWS } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Clock, Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import headerBg from "@assets/generated_images/atmospheric_stadium_background_for_app_header.png";

export default function Home() {
  const [activeTab, setActiveTab] = useState("live");

  const filteredMatches = MOCK_MATCHES.filter(m => {
    if (activeTab === "live") return m.status === "live";
    if (activeTab === "finished") return m.status === "finished";
    return m.status === "scheduled";
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "live": return "text-red-500 animate-pulse";
      case "finished": return "text-muted-foreground";
      default: return "text-primary";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-48 md:h-64 group">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <img 
          src={headerBg} 
          alt="Stadium" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 max-w-2xl">
          <Badge className="mb-3 bg-primary text-primary-foreground hover:bg-primary font-bold tracking-wider">FEATURED MATCH</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white italic mb-2">CHAMPIONS LEAGUE NIGHT</h2>
          <p className="text-slate-200 text-lg font-light">Real Madrid vs Man City - The clash of titans live now!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column: Matches */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-sm"></span>
              Match Center
            </h3>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-card/50 border border-border">
                <TabsTrigger value="live" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">LIVE</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="finished">Finished</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {filteredMatches.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-card/30 rounded-xl border border-dashed border-border">
                No matches found for this filter
              </div>
            ) : (
              filteredMatches.map(match => {
                const league = MOCK_LEAGUES.find(l => l.id === match.leagueId);
                return (
                  <Link key={match.id} href={`/match/${match.id}`}>
                    <Card className="hover:bg-card/80 transition-all duration-300 cursor-pointer border-l-4 border-l-transparent hover:border-l-primary group overflow-hidden">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {league?.logo.startsWith('http') ? (
                                <img src={league.logo} alt={league.name} className="w-5 h-5 object-contain" />
                            ) : (
                                <span className="text-lg">{league?.logo}</span>
                            )}
                            {league?.name} • {league?.country}
                          </div>
                          <div className={`flex items-center gap-1 text-xs font-bold ${getStatusColor(match.status)}`}>
                            {match.status === "live" && <div className="w-2 h-2 bg-current rounded-full animate-pulse" />}
                            {match.status === "live" ? `${match.minute}'` : match.status.toUpperCase()}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Home Team */}
                          <div className="flex items-center gap-4 flex-1">
                            {match.homeTeam.logo.startsWith('http') ? (
                                <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                            ) : (
                                <div className="text-3xl">{match.homeTeam.logo}</div>
                            )}
                            <span className="text-lg font-bold md:text-xl">{match.homeTeam.name}</span>
                          </div>

                          {/* Score */}
                          <div className="px-6 py-2 bg-background/50 rounded-lg font-mono font-bold text-2xl md:text-3xl tracking-widest border border-white/5 shadow-inner min-w-[100px] text-center mx-4">
                            {match.status === "scheduled" ? (
                              <span className="text-base text-muted-foreground font-sans font-medium block whitespace-nowrap">
                                {new Date(match.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                <br/>
                                {new Date(match.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                            ) : (
                              <span className="text-foreground">{match.homeScore} - {match.awayScore}</span>
                            )}
                          </div>

                          {/* Away Team */}
                          <div className="flex items-center gap-4 flex-1 justify-end">
                            <span className="text-lg font-bold md:text-xl text-right">{match.awayTeam.name}</span>
                            {match.awayTeam.logo.startsWith('http') ? (
                                <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                            ) : (
                                <div className="text-3xl">{match.awayTeam.logo}</div>
                            )}
                          </div>
                        </div>
                        
                        {match.status !== "scheduled" && (
                           <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                              <div className="flex gap-4 text-xs text-muted-foreground">
                                <span>Possession: {match.stats?.homePossession}% - {match.stats?.awayPossession}%</span>
                                <span>Shots: {match.stats?.homeShots} - {match.stats?.awayShots}</span>
                              </div>
                              {match.rating && (
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                  Rating: {match.rating}
                                </Badge>
                              )}
                           </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Column: News & Leagues */}
        <div className="space-y-8">
          {/* Top Leagues */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              Top Leagues
            </h3>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-2">
                {MOCK_LEAGUES.map(league => (
                  <div key={league.id} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                    <div className="w-8 h-8 flex items-center justify-center">
                        {league.logo.startsWith('http') ? (
                            <img src={league.logo} alt={league.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200" />
                        ) : (
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{league.logo}</span>
                        )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{league.name}</div>
                      <div className="text-xs text-muted-foreground">{league.country}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Latest News
            </h3>
            <div className="space-y-4">
              {MOCK_NEWS.map(news => (
                <Card key={news.id} className="overflow-hidden hover:ring-1 hover:ring-primary/50 transition-all cursor-pointer group">
                  <div className="h-32 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <Badge className="absolute top-2 left-2 z-20 bg-black/60 backdrop-blur-md text-white border-none">{news.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{news.title}</h4>
                    <p className="text-xs text-muted-foreground">{news.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
