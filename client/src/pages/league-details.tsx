import { useRoute, Link } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_LEAGUES, MOCK_MATCHES, MOCK_TEAMS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";

export default function LeagueDetails() {
  const [match, params] = useRoute("/league/:id");
  const id = params?.id;
  const league = MOCK_LEAGUES.find(l => l.id === id);

  if (!league) {
    return <Layout>League not found</Layout>;
  }

  // Filter matches for this league
  const leagueMatches = MOCK_MATCHES.filter(m => m.leagueId === id);
  
  // Get teams for this league (mock logic: filtered by simple association or just random for now if not strictly mapped)
  // For better realism in this mock, let's just show the teams involved in the matches + some others
  const relevantTeamIds = new Set(leagueMatches.flatMap(m => [m.homeTeam.id, m.awayTeam.id]));
  const teams = Object.values(MOCK_TEAMS).filter(t => relevantTeamIds.has(t.id));

  // Mock Standings
  const standings = teams.map(team => ({
    team,
    played: 28,
    won: Math.floor(Math.random() * 20),
    drawn: Math.floor(Math.random() * 8),
    lost: Math.floor(Math.random() * 8),
    gf: Math.floor(Math.random() * 60) + 20,
    ga: Math.floor(Math.random() * 30) + 20,
    points: 0 // calc below
  })).map(s => ({...s, points: s.won * 3 + s.drawn})).sort((a, b) => b.points - a.points);

  return (
    <Layout>
      <Link href="/leagues">
        <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 cursor-pointer transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Leagues
        </div>
      </Link>

      {/* League Header */}
      <div className="bg-card/50 border border-white/5 rounded-2xl p-8 mb-8 flex items-center gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent z-0" />
        <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-background/50 rounded-xl flex items-center justify-center p-4 border border-white/10 shadow-2xl">
           {league.logo.startsWith('http') ? (
              <img src={league.logo} alt={league.name} className="w-full h-full object-contain" />
           ) : (
              <span className="text-6xl">{league.logo}</span>
           )}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase tracking-wider text-sm mb-2">
            <span>{league.flag}</span>
            <span>{league.country}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold italic text-white mb-2">{league.name}</h1>
          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/20">Season 2023/24</Badge>
        </div>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList className="bg-card/50 border border-white/5">
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="standings">Standings</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4">
          {leagueMatches.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-card/30 rounded-xl border border-dashed border-border">
              No scheduled matches available for this league yet.
            </div>
          ) : (
            leagueMatches.map(match => (
               <Link key={match.id} href={`/match/${match.id}`}>
                  <Card className="hover:bg-card/80 transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-primary group">
                    <CardContent className="p-4 flex items-center justify-between">
                       <div className="flex items-center gap-4 w-1/3">
                          <div className="text-right flex-1 font-bold">{match.homeTeam.name}</div>
                          {match.homeTeam.logo.startsWith('http') ? <img src={match.homeTeam.logo} className="w-8 h-8 object-contain" /> : <span className="text-xl">{match.homeTeam.logo}</span>}
                       </div>

                       <div className="px-4 py-1 bg-background rounded border border-white/5 text-center min-w-[100px]">
                          {match.status === 'scheduled' ? (
                            <span className="text-xs text-muted-foreground">{new Date(match.startTime).toLocaleDateString()}</span>
                          ) : (
                            <span className="font-mono font-bold">{match.homeScore} - {match.awayScore}</span>
                          )}
                       </div>

                       <div className="flex items-center gap-4 w-1/3 justify-end">
                          {match.awayTeam.logo.startsWith('http') ? <img src={match.awayTeam.logo} className="w-8 h-8 object-contain" /> : <span className="text-xl">{match.awayTeam.logo}</span>}
                          <div className="text-left flex-1 font-bold">{match.awayTeam.name}</div>
                       </div>
                    </CardContent>
                  </Card>
               </Link>
            ))
          )}
        </TabsContent>

        <TabsContent value="standings">
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-0">
              <div className="w-full overflow-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white/5 text-muted-foreground uppercase text-xs">
                    <tr>
                      <th className="p-4 font-medium">#</th>
                      <th className="p-4 font-medium">Team</th>
                      <th className="p-4 font-medium text-center">MP</th>
                      <th className="p-4 font-medium text-center">W</th>
                      <th className="p-4 font-medium text-center">D</th>
                      <th className="p-4 font-medium text-center">L</th>
                      <th className="p-4 font-medium text-center">GF</th>
                      <th className="p-4 font-medium text-center">GA</th>
                      <th className="p-4 font-medium text-center">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {standings.map((row, i) => (
                      <tr key={row.team.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 w-12 text-center font-mono text-muted-foreground border-l-2 border-transparent data-[rank=1]:border-emerald-500 data-[rank=2]:border-emerald-500 data-[rank=3]:border-emerald-500 data-[rank=4]:border-emerald-500" data-rank={i+1}>
                          {i + 1}
                        </td>
                        <td className="p-4 flex items-center gap-3">
                          {row.team.logo.startsWith('http') ? <img src={row.team.logo} className="w-6 h-6 object-contain" /> : <span>{row.team.logo}</span>}
                          <span className="font-bold">{row.team.name}</span>
                        </td>
                        <td className="p-4 text-center text-muted-foreground">{row.played}</td>
                        <td className="p-4 text-center">{row.won}</td>
                        <td className="p-4 text-center">{row.drawn}</td>
                        <td className="p-4 text-center">{row.lost}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.gf}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.ga}</td>
                        <td className="p-4 text-center font-bold text-primary text-lg">{row.points}</td>
                      </tr>
                    ))}
                    {standings.length === 0 && (
                        <tr>
                            <td colSpan={9} className="p-8 text-center text-muted-foreground">
                                Standings data not available for this league yet.
                            </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
