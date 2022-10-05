import IMatch from './IMatch';

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalLosses: number;
  totalDraws: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface ITeamsWithMatches {
  teamName: string;
  homeTeamMatches:IMatch[];
  awayTeamMatches:IMatch[];
}
