import { CloudSun, Trophy, Newspaper, Users, Calendar, BarChart3 } from "lucide-react";

export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  flag: string;
}

export interface MatchEvent {
  id: string;
  type: "goal" | "card" | "sub";
  minute: number;
  player: string;
  teamId: string;
  detail?: string; // e.g., "Yellow Card", "Penalty"
}

export interface Match {
  id: string;
  leagueId: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: "scheduled" | "live" | "finished" | "ht";
  minute?: number;
  startTime: string;
  rating?: number; // Match excitement rating 1-10
  events: MatchEvent[];
  stats?: {
    homePossession: number;
    awayPossession: number;
    homeShots: number;
    awayShots: number;
    homeOnTarget: number;
    awayOnTarget: number;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: "Transfer" | "Match" | "Interview";
}

export const MOCK_LEAGUES: League[] = [
  { id: "ucl", name: "UEFA Champions League", country: "Europe", logo: "🏆", flag: "🇪🇺" },
  { id: "pl", name: "Premier League", country: "England", logo: "🦁", flag: "🇬🇧" },
  { id: "laliga", name: "La Liga", country: "Spain", logo: "⚽", flag: "🇪🇸" },
  { id: "seriea", name: "Serie A", country: "Italy", logo: "🛡️", flag: "🇮🇹" },
  { id: "wc", name: "World Cup", country: "World", logo: "🌍", flag: "🌐" },
];

export const MOCK_TEAMS: Record<string, Team> = {
  "real": { id: "real", name: "Real Madrid", logo: "⚪" },
  "city": { id: "city", name: "Man City", logo: "🔵" },
  "bayern": { id: "bayern", name: "Bayern Munich", logo: "🔴" },
  "psg": { id: "psg", name: "PSG", logo: "🗼" },
  "barca": { id: "barca", name: "Barcelona", logo: "🔵🔴" },
  "liverpool": { id: "liverpool", name: "Liverpool", logo: "🔴" },
  "arsenal": { id: "arsenal", name: "Arsenal", logo: "🔫" },
  "juve": { id: "juve", name: "Juventus", logo: "🦓" },
  "inter": { id: "inter", name: "Inter Milan", logo: "🔵⚫" },
  "acmilan": { id: "acmilan", name: "AC Milan", logo: "🔴⚫" },
};

export const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    leagueId: "ucl",
    homeTeam: MOCK_TEAMS["real"],
    awayTeam: MOCK_TEAMS["city"],
    homeScore: 1,
    awayScore: 1,
    status: "live",
    minute: 68,
    startTime: "2024-05-10T19:00:00Z",
    rating: 9.2,
    events: [
      { id: "e1", type: "goal", minute: 12, player: "Vinicius Jr", teamId: "real" },
      { id: "e2", type: "goal", minute: 67, player: "De Bruyne", teamId: "city" },
    ],
    stats: {
      homePossession: 42, awayPossession: 58,
      homeShots: 8, awayShots: 14,
      homeOnTarget: 3, awayOnTarget: 6
    }
  },
  {
    id: "m2",
    leagueId: "pl",
    homeTeam: MOCK_TEAMS["liverpool"],
    awayTeam: MOCK_TEAMS["arsenal"],
    homeScore: 2,
    awayScore: 3,
    status: "finished",
    startTime: "2024-05-09T15:30:00Z",
    rating: 8.8,
    events: [],
    stats: {
      homePossession: 55, awayPossession: 45,
      homeShots: 18, awayShots: 12,
      homeOnTarget: 7, awayOnTarget: 5
    }
  },
  {
    id: "m3",
    leagueId: "laliga",
    homeTeam: MOCK_TEAMS["barca"],
    awayTeam: MOCK_TEAMS["real"],
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    startTime: "2024-05-12T20:00:00Z",
    rating: 9.5,
    events: []
  },
   {
    id: "m4",
    leagueId: "seriea",
    homeTeam: MOCK_TEAMS["juve"],
    awayTeam: MOCK_TEAMS["acmilan"],
    homeScore: 0,
    awayScore: 0,
    status: "live",
    minute: 15,
    startTime: "2024-05-10T18:45:00Z",
    rating: 7.4,
    events: [],
    stats: {
      homePossession: 50, awayPossession: 50,
      homeShots: 2, awayShots: 1,
      homeOnTarget: 0, awayOnTarget: 0
    }
  },
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: "n1",
    title: "Mbappe Announces Shock Transfer Decision",
    summary: "The French superstar has finally made his choice regarding his future club.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=500",
    date: "2 hours ago",
    category: "Transfer"
  },
  {
    id: "n2",
    title: "Champions League Final Venue Confirmed",
    summary: "UEFA has announced the host city for the 2025 Champions League final.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80&w=500",
    date: "5 hours ago",
    category: "Match"
  },
  {
    id: "n3",
    title: "Messi's Impact in MLS Continues",
    summary: "Inter Miami sees record attendance numbers as Messi fever takes over.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=500",
    date: "1 day ago",
    category: "Interview"
  }
];
