import { useRoute, Link } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_MATCHES, MOCK_LEAGUES } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User } from "lucide-react";

export default function MatchDetails() {
  const [match, params] = useRoute("/match/:id");
  const id = params?.id;
  const matchData = MOCK_MATCHES.find(m => m.id === id);

  if (!matchData) {
    return <Layout>Match not found</Layout>;
  }

  const league = MOCK_LEAGUES.find(l => l.id === matchData.leagueId);

  // Calculate SofaScore-style momentum/rating based on random
  const homeRating = matchData.rating ? (matchData.rating).toFixed(1) : (Math.random() * (9 - 6) + 6).toFixed(1);
  const awayRating = matchData.rating ? (matchData.rating - 0.5).toFixed(1) : (Math.random() * (9 - 6) + 6).toFixed(1);

  return (
    <Layout>
      <Link href="/">
        <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 cursor-pointer transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Matches
        </div>
      </Link>

      {/* Match Header */}
      <Card className="bg-card/50 border-primary/20 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 z-0" />
        <CardContent className="p-8 relative z-10">
          <div className="text-center mb-8">
             <Badge variant="outline" className="bg-background/50 backdrop-blur text-muted-foreground border-white/10 mb-2">
                {league?.name} • Round of 16
             </Badge>
             <div className="text-sm text-muted-foreground">
               {new Date(matchData.startTime).toLocaleDateString()} • Stadium Name
             </div>
          </div>

          <div className="flex items-center justify-between max-w-3xl mx-auto">
             {/* Home */}
             <div className="flex flex-col items-center gap-4 flex-1">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {matchData.homeTeam.logo.startsWith('http') ? (
                      <img src={matchData.homeTeam.logo} alt={matchData.homeTeam.name} className="w-full h-full object-contain drop-shadow-2xl" />
                  ) : (
                      <div className="text-6xl md:text-7xl drop-shadow-2xl">{matchData.homeTeam.logo}</div>
                  )}
                  <div className={`absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 border-background ${Number(homeRating) > 7.5 ? 'bg-emerald-500 text-black' : 'bg-yellow-500 text-black'}`}>
                    {homeRating}
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-center">{matchData.homeTeam.name}</h2>
             </div>

             {/* Score */}
             <div className="flex flex-col items-center px-4 md:px-12">
                <div className="text-5xl md:text-7xl font-mono font-bold tracking-tighter text-white drop-shadow-glow">
                   {matchData.status === 'scheduled' ? 'vs' : `${matchData.homeScore ?? 0} - ${matchData.awayScore ?? 0}`}
                </div>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border animate-pulse ${matchData.status === 'live' ? 'bg-red-500/20 text-red-400 border-red-500/20' : 'bg-muted text-muted-foreground border-white/10'}`}>
                  {matchData.status === 'live' ? `${matchData.minute}' Live` : matchData.status}
                </div>
             </div>

             {/* Away */}
             <div className="flex flex-col items-center gap-4 flex-1">
                 <div className="relative w-24 h-24 flex items-center justify-center">
                  {matchData.awayTeam.logo.startsWith('http') ? (
                      <img src={matchData.awayTeam.logo} alt={matchData.awayTeam.name} className="w-full h-full object-contain drop-shadow-2xl" />
                  ) : (
                      <div className="text-6xl md:text-7xl drop-shadow-2xl">{matchData.awayTeam.logo}</div>
                  )}
                  <div className={`absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 border-background ${Number(awayRating) > 7.5 ? 'bg-emerald-500 text-black' : 'bg-yellow-500 text-black'}`}>
                    {awayRating}
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-center">{matchData.awayTeam.name}</h2>
             </div>
          </div>

          {/* Events Timeline (Simplified) */}
          {matchData.events.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/5 max-w-2xl mx-auto space-y-2">
                {matchData.events.map(event => (
                <div key={event.id} className={`flex items-center gap-4 ${event.teamId === matchData.homeTeam.id ? 'flex-row' : 'flex-row-reverse text-right'}`}>
                    <div className="flex-1 text-sm font-medium">{event.player}</div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-mono text-muted-foreground border border-white/10">
                        {event.minute}'
                    </div>
                    <div className="flex-1 text-sm text-muted-foreground flex items-center gap-2 justify-end">
                        {event.type === 'goal' && '⚽ Goal'}
                        {event.type === 'card' && '🟨 Card'}
                    </div>
                </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Match Stats */}
        <Card>
           <CardHeader>
             <CardTitle className="font-display">Match Statistics</CardTitle>
           </CardHeader>
           <CardContent className="space-y-6">
              {matchData.status === 'scheduled' ? (
                <div className="text-center text-muted-foreground py-8">
                    Stats will be available once the match starts
                </div>
              ) : (
                <>
                    <StatRow label="Possession" home={matchData.stats?.homePossession || 50} away={matchData.stats?.awayPossession || 50} suffix="%" />
                    <StatRow label="Total Shots" home={matchData.stats?.homeShots || 0} away={matchData.stats?.awayShots || 0} />
                    <StatRow label="Shots on Target" home={matchData.stats?.homeOnTarget || 0} away={matchData.stats?.awayOnTarget || 0} />
                    <StatRow label="Expected Goals (xG)" home={matchData.stats?.homeXg || 0} away={matchData.stats?.awayXg || 0} />
                    <StatRow label="Fouls" home={matchData.stats?.homeFouls || 0} away={matchData.stats?.awayFouls || 0} />
                </>
              )}
           </CardContent>
        </Card>

        {/* Lineups (Mock) */}
        <Card>
           <CardHeader>
             <CardTitle className="font-display">Lineups</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-2 gap-8">
               <div>
                 <div className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">{matchData.homeTeam.name}</div>
                 <ul className="space-y-2 text-sm text-muted-foreground">
                   <li>• Starting XI not available</li>
                 </ul>
               </div>
                <div>
                 <div className="font-bold text-accent mb-4 text-sm uppercase tracking-wider">{matchData.awayTeam.name}</div>
                 <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Starting XI not available</li>
                 </ul>
               </div>
             </div>
           </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

function StatRow({ label, home, away, suffix = "" }: { label: string, home: number, away: number, suffix?: string }) {
  const total = home + away;
  const homePct = total === 0 ? 50 : (home / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span>{home}{suffix}</span>
        <span className="text-muted-foreground font-normal text-xs uppercase">{label}</span>
        <span>{away}{suffix}</span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
        <div className="bg-primary transition-all duration-1000" style={{ width: `${homePct}%` }} />
        <div className="bg-accent transition-all duration-1000" style={{ width: `${100 - homePct}%` }} />
      </div>
    </div>
  );
}
