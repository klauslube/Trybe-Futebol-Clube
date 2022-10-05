import { ILeaderboard, IWinsBalance } from '../interfaces/ILeaderBoard';
import TeamRepository from '../repositories/TeamRepository';

export default class LeaderBoardService {
  public objScores = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalLosses: 0,
    totalDraws: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  constructor(private teamModel:TeamRepository) { }

  public async getAllWithMatches() {
    const allMatchesTeam = await this.teamModel.findAllWithMatches();
    return allMatchesTeam;
  }

  calculateScores(allMatchesTeams: ILeaderboard[]) {
    const teamsData:IWinsBalance[] = [];
    allMatchesTeams.forEach((team) => {
      const objScores = { ...this.objScores };
      team.homeTeamMatches.forEach((match:any) => {
        objScores.totalVictories = match.homeTeamGoals > match.awayTeamGoals
          ? objScores.totalVictories += 1 : objScores.totalVictories += 0;
        objScores.totalLosses = match.homeTeamGoals < match.awayTeamGoals
          ? objScores.totalLosses += 1 : objScores.totalLosses += 0;
        objScores.totalDraws = match.homeTeamGoals === match.awayTeamGoals
          ? objScores.totalDraws += 1 : objScores.totalDraws += 0;
        objScores.totalGames += 1; objScores.goalsFavor += match.homeTeamGoals;
        objScores.goalsOwn += match.awayTeamGoals;
        objScores.goalsBalance = objScores.goalsFavor - objScores.goalsOwn;
        objScores.name = team.teamName;
      });
      teamsData.push(objScores);
    });
    return teamsData;
  }

  static calculateTotalPoints(teamsData: IWinsBalance[]) {
    let efficiency = 0;
    let totalPoints = 0;
    return teamsData.map((team) => {
      totalPoints = (team.totalVictories * 3) + team.totalDraws;
      efficiency = ((totalPoints) / (team.totalGames * 3)) * 100;
      efficiency = parseFloat(efficiency.toFixed(2));
      return { ...team,
        totalPoints,
        efficiency };
    });
  }

  static sortTeams(allTeams:ILeaderboard[]) {
    const sortedTeams = allTeams.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return sortedTeams;
  }

  getHome(allTeams:ILeaderboard[]) {
    const scores = this.calculateScores(allTeams);
    const points = LeaderBoardService.calculateTotalPoints(scores);
    const sortedTeams = LeaderBoardService.sortTeams(points as any[]);
    return sortedTeams;
    // return points;
  }
}
