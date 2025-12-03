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
  leagueId: string; // Used to ensure consistent match generation
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
  { id: "ucl", name: "UEFA Champions League", country: "Europe", region: "Europe", logo: "https://crests.football-data.org/CL.png", flag: "🇪🇺" },
  { id: "pl", name: "Premier League", country: "England", region: "Europe", logo: "https://crests.football-data.org/PL.png", flag: "🇬🇧" },
  { id: "laliga", name: "La Liga", country: "Spain", region: "Europe", logo: "https://crests.football-data.org/PD.png", flag: "🇪🇸" },
  { id: "seriea", name: "Serie A", country: "Italy", region: "Europe", logo: "https://crests.football-data.org/SA.png", flag: "🇮🇹" },
  { id: "bundesliga", name: "Bundesliga", country: "Germany", region: "Europe", logo: "https://crests.football-data.org/BL1.png", flag: "🇩🇪" },
  { id: "ligue1", name: "Ligue 1", country: "France", region: "Europe", logo: "https://crests.football-data.org/FL1.png", flag: "🇫🇷" },
  
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

// Using football-data.org public IDs for real logos
export const MOCK_TEAMS: Record<string, Team> = {
  // Premier League
  "city": { id: "city", name: "Man City", logo: "https://crests.football-data.org/65.png", color: "skyblue", leagueId: "pl" },
  "liverpool": { id: "liverpool", name: "Liverpool", logo: "https://crests.football-data.org/64.png", color: "red", leagueId: "pl" },
  "arsenal": { id: "arsenal", name: "Arsenal", logo: "https://crests.football-data.org/57.png", color: "red", leagueId: "pl" },
  "chelsea": { id: "chelsea", name: "Chelsea", logo: "https://crests.football-data.org/61.png", color: "blue", leagueId: "pl" },
  "manutd": { id: "manutd", name: "Man United", logo: "https://crests.football-data.org/66.png", color: "red", leagueId: "pl" },
  "tottenham": { id: "tottenham", name: "Tottenham", logo: "https://crests.football-data.org/73.png", color: "white", leagueId: "pl" },
  "newcastle": { id: "newcastle", name: "Newcastle", logo: "https://crests.football-data.org/67.png", color: "black", leagueId: "pl" },
  
  // La Liga
  "real": { id: "real", name: "Real Madrid", logo: "https://crests.football-data.org/86.png", color: "white", leagueId: "laliga" },
  "barca": { id: "barca", name: "Barcelona", logo: "https://crests.football-data.org/81.png", color: "blue", leagueId: "laliga" },
  "atletico": { id: "atletico", name: "Atletico Madrid", logo: "https://crests.football-data.org/78.png", color: "red", leagueId: "laliga" },
  "sevilla": { id: "sevilla", name: "Sevilla", logo: "https://crests.football-data.org/559.png", color: "white", leagueId: "laliga" },
  "valencia": { id: "valencia", name: "Valencia", logo: "https://crests.football-data.org/95.png", color: "white", leagueId: "laliga" },
  "betis": { id: "betis", name: "Real Betis", logo: "https://crests.football-data.org/90.png", color: "green", leagueId: "laliga" },

  // Serie A
  "juve": { id: "juve", name: "Juventus", logo: "https://crests.football-data.org/109.png", color: "black", leagueId: "seriea" },
  "inter": { id: "inter", name: "Inter Milan", logo: "https://crests.football-data.org/108.png", color: "blue", leagueId: "seriea" },
  "acmilan": { id: "acmilan", name: "AC Milan", logo: "https://crests.football-data.org/98.png", color: "red", leagueId: "seriea" },
  "napoli": { id: "napoli", name: "Napoli", logo: "https://crests.football-data.org/113.png", color: "skyblue", leagueId: "seriea" },
  "roma": { id: "roma", name: "AS Roma", logo: "https://crests.football-data.org/100.png", color: "red", leagueId: "seriea" },
  "lazio": { id: "lazio", name: "Lazio", logo: "https://crests.football-data.org/110.png", color: "skyblue", leagueId: "seriea" },

  // Bundesliga
  "bayern": { id: "bayern", name: "Bayern Munich", logo: "https://crests.football-data.org/5.png", color: "red", leagueId: "bundesliga" },
  "dortmund": { id: "dortmund", name: "Dortmund", logo: "https://crests.football-data.org/4.png", color: "yellow", leagueId: "bundesliga" },
  "bayer": { id: "bayer", name: "Bayer Leverkusen", logo: "https://crests.football-data.org/3.png", color: "red", leagueId: "bundesliga" },
  "leipzig": { id: "leipzig", name: "RB Leipzig", logo: "https://crests.football-data.org/721.png", color: "white", leagueId: "bundesliga" },
  "frankfurt": { id: "frankfurt", name: "Eintracht Frankfurt", logo: "https://crests.football-data.org/19.png", color: "red", leagueId: "bundesliga" },

  // Ligue 1
  "psg": { id: "psg", name: "PSG", logo: "https://crests.football-data.org/524.png", color: "navy", leagueId: "ligue1" },
  "marseille": { id: "marseille", name: "Marseille", logo: "https://crests.football-data.org/516.png", color: "skyblue", leagueId: "ligue1" },
  "monaco": { id: "monaco", name: "AS Monaco", logo: "https://crests.football-data.org/548.png", color: "red", leagueId: "ligue1" },
  "lyon": { id: "lyon", name: "Lyon", logo: "https://crests.football-data.org/523.png", color: "white", leagueId: "ligue1" },

  // Asia
  "alnassr": { id: "alnassr", name: "Al Nassr", logo: "https://upload.wikimedia.org/wikipedia/en/c/c5/Al_Nassr_FC_Logo.svg", color: "yellow", leagueId: "spl" },
  "alhilal": { id: "alhilal", name: "Al Hilal", logo: "https://upload.wikimedia.org/wikipedia/en/c/cd/Al_Hilal_SFC_Logo.svg", color: "blue", leagueId: "spl" },
  "vissel": { id: "vissel", name: "Vissel Kobe", logo: "https://upload.wikimedia.org/wikipedia/en/7/72/Vissel_Kobe_logo.svg", color: "crimson", leagueId: "jleague" },
  "ulsan": { id: "ulsan", name: "Ulsan Hyundai", logo: "https://upload.wikimedia.org/wikipedia/en/9/92/Ulsan_Hyundai_FC_logo.svg", color: "blue", leagueId: "kleague" },

  // Americas
  "miami": { id: "miami", name: "Inter Miami", logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/Inter_Miami_CF_logo.svg", color: "pink", leagueId: "mls" },
  "galaxy": { id: "galaxy", name: "LA Galaxy", logo: "https://upload.wikimedia.org/wikipedia/en/7/72/LA_Galaxy_logo.svg", color: "white", leagueId: "mls" },
  "flamengo": { id: "flamengo", name: "Flamengo", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg", color: "red", leagueId: "brasileirao" },
  "river": { id: "river", name: "River Plate", logo: "https://upload.wikimedia.org/wikipedia/en/a/ac/River_Plate_logo.svg", color: "white", leagueId: "libertadores" },
  "boca": { id: "boca", name: "Boca Juniors", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Boca_Juniors_logo18.svg", color: "blue", leagueId: "libertadores" },
};

// Helper to generate upcoming matches
function generateUpcomingMatches(count: number): Match[] {
  const matches: Match[] = [];
  const leagues = ["pl", "laliga", "seriea", "bundesliga", "ligue1"];
  
  // Group teams by leagueId
  const teamsByLeague: Record<string, Team[]> = {};
  Object.values(MOCK_TEAMS).forEach(team => {
    if (!teamsByLeague[team.leagueId]) {
      teamsByLeague[team.leagueId] = [];
    }
    teamsByLeague[team.leagueId].push(team);
  });

  for (let i = 0; i < count; i++) {
    // Pick a random league
    const leagueId = leagues[Math.floor(Math.random() * leagues.length)];
    const teams = teamsByLeague[leagueId];

    // Ensure we have at least 2 teams in this league to make a match
    if (!teams || teams.length < 2) continue;

    const homeIdx = Math.floor(Math.random() * teams.length);
    let awayIdx = Math.floor(Math.random() * teams.length);
    while (awayIdx === homeIdx) {
      awayIdx = Math.floor(Math.random() * teams.length);
    }

    const homeTeam = teams[homeIdx];
    const awayTeam = teams[awayIdx];
    
    // Random date in next 14 days
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 14));
    date.setHours(14 + Math.floor(Math.random() * 8), 0, 0);

    matches.push({
      id: `gen_${i}`,
      leagueId,
      homeTeam,
      awayTeam,
      homeScore: null,
      awayScore: null,
      status: "scheduled",
      startTime: date.toISOString(),
      events: []
    });
  }

  // Add Champions League matches (Cross-League)
  // We'll take top teams from top leagues
  const topTeams = Object.values(MOCK_TEAMS).filter(t => 
    ["real", "barca", "city", "arsenal", "bayern", "psg", "inter"].includes(t.id)
  );

  for (let i = 0; i < 4; i++) {
     const homeIdx = Math.floor(Math.random() * topTeams.length);
     let awayIdx = Math.floor(Math.random() * topTeams.length);
     while (awayIdx === homeIdx) awayIdx = Math.floor(Math.random() * topTeams.length);
     
     const date = new Date();
     date.setDate(date.getDate() + Math.floor(Math.random() * 14));
     date.setHours(20, 0, 0); // CL matches are usually late

     matches.push({
        id: `ucl_gen_${i}`,
        leagueId: "ucl",
        homeTeam: topTeams[homeIdx],
        awayTeam: topTeams[awayIdx],
        homeScore: null,
        awayScore: null,
        status: "scheduled",
        startTime: date.toISOString(),
        events: []
     });
  }

  return matches.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

const upcomingMatches = generateUpcomingMatches(30);

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

  ...upcomingMatches
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
