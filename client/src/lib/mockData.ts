import stock1 from "@assets/stock_images/football_match_actio_36c481ef.jpg";
import stock2 from "@assets/stock_images/football_match_actio_c836e34a.jpg";
import stock3 from "@assets/stock_images/football_match_actio_8cb00fd4.jpg";
import stock4 from "@assets/stock_images/football_manager_tra_9f6997b4.jpg";
import stock5 from "@assets/stock_images/football_manager_tra_512ca591.jpg";

export interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  region: "Europe" | "Asia" | "Americas" | "International";
  logo: string;
  flag: string;
}

export interface MatchEvent {
  id: string;
  type: "goal" | "card" | "sub" | "var";
  minute: number;
  player: string;
  teamId: string;
  detail?: string;
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
  rating?: number;
  events: MatchEvent[];
  stats?: {
    homePossession: number;
    awayPossession: number;
    homeShots: number;
    awayShots: number;
    homeOnTarget: number;
    awayOnTarget: number;
    homeCorners: number;
    awayCorners: number;
    homeFouls: number;
    awayFouls: number;
    homeXg: number;
    awayXg: number;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: "Transfer" | "Match" | "Interview" | "Opinion";
  author: string;
}

export const MOCK_LEAGUES: League[] = [
  // Europe
  { id: "ucl", name: "UEFA Champions League", country: "Europe", region: "Europe", logo: "🏆", flag: "🇪🇺" },
  { id: "pl", name: "Premier League", country: "England", region: "Europe", logo: "🦁", flag: "🇬🇧" },
  { id: "laliga", name: "La Liga", country: "Spain", region: "Europe", logo: "⚽", flag: "🇪🇸" },
  { id: "seriea", name: "Serie A", country: "Italy", region: "Europe", logo: "🛡️", flag: "🇮🇹" },
  { id: "bundesliga", name: "Bundesliga", country: "Germany", region: "Europe", logo: "🦅", flag: "🇩🇪" },
  { id: "ligue1", name: "Ligue 1", country: "France", region: "Europe", logo: "🗼", flag: "🇫🇷" },
  
  // Asia
  { id: "spl", name: "Saudi Pro League", country: "Saudi Arabia", region: "Asia", logo: "🌴", flag: "🇸🇦" },
  { id: "jleague", name: "J1 League", country: "Japan", region: "Asia", logo: "🗾", flag: "🇯🇵" },
  { id: "kleague", name: "K League 1", country: "South Korea", region: "Asia", logo: "🐯", flag: "🇰🇷" },
  { id: "acl", name: "AFC Champions League", country: "Asia", region: "Asia", logo: "🌏", flag: "🌏" },

  // Americas
  { id: "mls", name: "MLS", country: "USA", region: "Americas", logo: "🇺🇸", flag: "🇺🇸" },
  { id: "brasileirao", name: "Brasileirão", country: "Brazil", region: "Americas", logo: "🇧🇷", flag: "🇧🇷" },
  { id: "libertadores", name: "Copa Libertadores", country: "South America", region: "Americas", logo: "🗽", flag: "🌎" },

  // International
  { id: "wc", name: "World Cup", country: "World", region: "International", logo: "🌍", flag: "🌐" },
];

export const MOCK_TEAMS: Record<string, Team> = {
  // Europe
  "real": { id: "real", name: "Real Madrid", logo: "⚪", color: "white" },
  "city": { id: "city", name: "Man City", logo: "🔵", color: "skyblue" },
  "bayern": { id: "bayern", name: "Bayern Munich", logo: "🔴", color: "red" },
  "psg": { id: "psg", name: "PSG", logo: "🗼", color: "navy" },
  "barca": { id: "barca", name: "Barcelona", logo: "🔵🔴", color: "blue" },
  "liverpool": { id: "liverpool", name: "Liverpool", logo: "🔴", color: "red" },
  "arsenal": { id: "arsenal", name: "Arsenal", logo: "🔫", color: "red" },
  "juve": { id: "juve", name: "Juventus", logo: "🦓", color: "black" },
  "inter": { id: "inter", name: "Inter Milan", logo: "🔵⚫", color: "blue" },
  "acmilan": { id: "acmilan", name: "AC Milan", logo: "🔴⚫", color: "red" },
  "dortmund": { id: "dortmund", name: "Dortmund", logo: "🐝", color: "yellow" },
  "atletico": { id: "atletico", name: "Atletico Madrid", logo: "⚪🔴", color: "red" },
  
  // Asia
  "alnassr": { id: "alnassr", name: "Al Nassr", logo: "🟡", color: "yellow" },
  "alhilal": { id: "alhilal", name: "Al Hilal", logo: "🔵", color: "blue" },
  "vissel": { id: "vissel", name: "Vissel Kobe", logo: "⚓", color: "crimson" },
  "ulsan": { id: "ulsan", name: "Ulsan Hyundai", logo: "🐅", color: "blue" },

  // Americas
  "miami": { id: "miami", name: "Inter Miami", logo: "🦩", color: "pink" },
  "galaxy": { id: "galaxy", name: "LA Galaxy", logo: "🌌", color: "white" },
  "flamengo": { id: "flamengo", name: "Flamengo", logo: "🔴⚫", color: "red" },
  "river": { id: "river", name: "River Plate", logo: "⚪🔴", color: "white" },
  "boca": { id: "boca", name: "Boca Juniors", logo: "🔵🟡", color: "blue" },
};

export const MOCK_MATCHES: Match[] = [
  // Live
  {
    id: "m1", leagueId: "ucl", homeTeam: MOCK_TEAMS["real"], awayTeam: MOCK_TEAMS["city"],
    homeScore: 1, awayScore: 1, status: "live", minute: 68, startTime: "2024-05-10T19:00:00Z", rating: 9.2,
    events: [
      { id: "e1", type: "goal", minute: 12, player: "Vinicius Jr", teamId: "real" },
      { id: "e2", type: "goal", minute: 67, player: "De Bruyne", teamId: "city" },
    ],
    stats: { homePossession: 42, awayPossession: 58, homeShots: 8, awayShots: 14, homeOnTarget: 3, awayOnTarget: 6, homeCorners: 2, awayCorners: 5, homeFouls: 8, awayFouls: 6, homeXg: 1.2, awayXg: 1.8 }
  },
  {
    id: "m4", leagueId: "spl", homeTeam: MOCK_TEAMS["alnassr"], awayTeam: MOCK_TEAMS["alhilal"],
    homeScore: 2, awayScore: 2, status: "live", minute: 88, startTime: "2024-05-10T18:00:00Z", rating: 8.9,
    events: [
      { id: "e4a", type: "goal", minute: 23, player: "Ronaldo", teamId: "alnassr" },
      { id: "e4b", type: "goal", minute: 45, player: "Mitrovic", teamId: "alhilal" },
      { id: "e4c", type: "goal", minute: 78, player: "Talisca", teamId: "alnassr" },
      { id: "e4d", type: "goal", minute: 85, player: "Neymar", teamId: "alhilal" },
    ],
    stats: { homePossession: 45, awayPossession: 55, homeShots: 10, awayShots: 12, homeOnTarget: 5, awayOnTarget: 4, homeCorners: 3, awayCorners: 6, homeFouls: 12, awayFouls: 10, homeXg: 1.5, awayXg: 1.4 }
  },
   {
    id: "m5", leagueId: "mls", homeTeam: MOCK_TEAMS["miami"], awayTeam: MOCK_TEAMS["galaxy"],
    homeScore: 1, awayScore: 0, status: "live", minute: 34, startTime: "2024-05-11T00:30:00Z", rating: 7.8,
    events: [
      { id: "e5a", type: "goal", minute: 15, player: "Messi", teamId: "miami" },
    ],
    stats: { homePossession: 60, awayPossession: 40, homeShots: 5, awayShots: 2, homeOnTarget: 2, awayOnTarget: 0, homeCorners: 2, awayCorners: 1, homeFouls: 3, awayFouls: 4, homeXg: 0.8, awayXg: 0.1 }
  },

  // Finished
  {
    id: "m2", leagueId: "pl", homeTeam: MOCK_TEAMS["liverpool"], awayTeam: MOCK_TEAMS["arsenal"],
    homeScore: 2, awayScore: 3, status: "finished", startTime: "2024-05-09T15:30:00Z", rating: 8.8,
    events: [],
    stats: { homePossession: 55, awayPossession: 45, homeShots: 18, awayShots: 12, homeOnTarget: 7, awayOnTarget: 5, homeCorners: 8, awayCorners: 4, homeFouls: 10, awayFouls: 11, homeXg: 2.1, awayXg: 1.9 }
  },
  {
    id: "m6", leagueId: "bundesliga", homeTeam: MOCK_TEAMS["dortmund"], awayTeam: MOCK_TEAMS["bayern"],
    homeScore: 1, awayScore: 2, status: "finished", startTime: "2024-05-08T19:30:00Z", rating: 8.5,
    events: [],
    stats: { homePossession: 40, awayPossession: 60, homeShots: 8, awayShots: 15, homeOnTarget: 3, awayOnTarget: 8, homeCorners: 2, awayCorners: 7, homeFouls: 9, awayFouls: 7, homeXg: 0.7, awayXg: 2.2 }
  },

  // Scheduled
  {
    id: "m3", leagueId: "laliga", homeTeam: MOCK_TEAMS["barca"], awayTeam: MOCK_TEAMS["real"],
    homeScore: null, awayScore: null, status: "scheduled", startTime: "2024-05-12T20:00:00Z", rating: 9.5,
    events: []
  },
  {
    id: "m7", leagueId: "libertadores", homeTeam: MOCK_TEAMS["flamengo"], awayTeam: MOCK_TEAMS["river"],
    homeScore: null, awayScore: null, status: "scheduled", startTime: "2024-05-13T01:00:00Z", rating: 8.2,
    events: []
  },
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: "n1",
    title: "Mbappe Announces Shock Transfer Decision",
    summary: "The French superstar has finally made his choice regarding his future club, sending shockwaves through European football.",
    image: stock4,
    date: "2 hours ago",
    category: "Transfer",
    author: "Fabrizio Romano"
  },
  {
    id: "n2",
    title: "Champions League Final Venue Confirmed",
    summary: "UEFA has announced the host city for the 2025 Champions League final after extensive deliberation.",
    image: stock1,
    date: "5 hours ago",
    category: "Match",
    author: "UEFA Press"
  },
  {
    id: "n3",
    title: "Messi's Impact in MLS Continues to Grow",
    summary: "Inter Miami sees record attendance numbers as Messi fever takes over the United States for another season.",
    image: stock2,
    date: "1 day ago",
    category: "Opinion",
    author: "Sid Lowe"
  },
  {
    id: "n4",
    title: "Ten Hag: 'We need to be better'",
    summary: "Manchester United manager speaks candidly after another disappointing result at Old Trafford.",
    image: stock5,
    date: "3 hours ago",
    category: "Interview",
    author: "Sky Sports"
  },
  {
    id: "n5",
    title: "New Format for Club World Cup Revealed",
    summary: "FIFA unveils the expanded 32-team tournament structure set to debut next summer.",
    image: stock3,
    date: "6 hours ago",
    category: "Match",
    author: "FIFA Media"
  }
];
