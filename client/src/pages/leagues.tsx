import { useState } from "react";
import { Layout } from "@/components/layout";
import { MOCK_LEAGUES } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, ChevronRight, Star } from "lucide-react";

export default function Leagues() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const filteredLeagues = MOCK_LEAGUES.filter(league => {
    const matchesSearch = league.name.toLowerCase().includes(search.toLowerCase()) || league.country.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === "all" || league.region.toLowerCase() === region.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  const regions = ["All", "Europe", "Asia", "Americas", "International"];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold italic text-foreground mb-2">
              COMPETITIONS
            </h1>
            <p className="text-muted-foreground">Explore leagues and tournaments from around the world</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search leagues..." 
              className="pl-10 bg-card/50 border-white/10 focus:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={region} onValueChange={setRegion} className="w-full">
          <TabsList className="bg-card/50 p-1">
            {regions.map(r => (
              <TabsTrigger key={r} value={r.toLowerCase()} className="px-6">
                {r}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeagues.map(league => (
            <Card key={league.id} className="hover:bg-card/80 transition-all cursor-pointer group border-white/5 hover:border-primary/30">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center text-2xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
                  {league.logo}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{league.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{league.flag}</span>
                    <span>{league.country}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Star className="w-4 h-4 text-muted-foreground hover:text-yellow-400 transition-colors" />
                   <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
