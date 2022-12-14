import IMatch from '../interfaces/IMatch';
import { ILeaderboard, ITeamsWithMatches } from '../interfaces/ILeaderBoard';
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

  calculateScoresHome(allMatchesTeams: ITeamsWithMatches[]) {
    const teamsData:ILeaderboard[] = [];
    allMatchesTeams.forEach((team) => {
      const objScores = { ...this.objScores };
      team.homeTeamMatches.forEach((match:IMatch) => {
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

  calculateScoresAway(allMatchesTeams: ITeamsWithMatches[]) {
    const teamsData:ILeaderboard[] = [];
    allMatchesTeams.forEach((team) => {
      const objScores = { ...this.objScores };
      team.awayTeamMatches.forEach((match:IMatch) => {
        objScores.totalVictories = match.awayTeamGoals > match.homeTeamGoals
          ? objScores.totalVictories += 1 : objScores.totalVictories += 0;
        objScores.totalLosses = match.awayTeamGoals < match.homeTeamGoals
          ? objScores.totalLosses += 1 : objScores.totalLosses += 0;
        objScores.totalDraws = match.awayTeamGoals === match.homeTeamGoals
          ? objScores.totalDraws += 1 : objScores.totalDraws += 0;
        objScores.totalGames += 1; objScores.goalsFavor += match.awayTeamGoals;
        objScores.goalsOwn += match.homeTeamGoals;
        objScores.goalsBalance = objScores.goalsFavor - objScores.goalsOwn;
        objScores.name = team.teamName;
      });
      teamsData.push(objScores);
    });
    return teamsData;
  }

  static calculateTotalPoints(teamsData: ILeaderboard[]) {
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

  getHome(allTeams:ITeamsWithMatches[]) {
    const scores = this.calculateScoresHome(allTeams);
    const points = LeaderBoardService.calculateTotalPoints(scores);
    const sortedTeams = LeaderBoardService.sortTeams(points);
    return sortedTeams;
  }

  getAway(allTeams:ITeamsWithMatches[]) {
    const scores = this.calculateScoresAway(allTeams);
    const points = LeaderBoardService.calculateTotalPoints(scores);
    const sortedTeams = LeaderBoardService.sortTeams(points);
    return sortedTeams;
  }

  getHomeAway(allTeams:ITeamsWithMatches[]) {
    const getAll = [...this.getHome(allTeams), ...this.getAway(allTeams)];
    const teamsName = [...new Set(getAll.map((team) => team.name))];
    const sumValues = teamsName.reduce((acc:object[], cur) => {
      let leaderboard:ILeaderboard = { ...this.objScores };
      getAll.forEach((team) => {
        if (team.name === cur) {
          leaderboard = LeaderBoardService.getLeaderBoard(leaderboard, team);
        }
      });
      return [...acc, leaderboard];
    }, []);

    return LeaderBoardService.sortTeams(sumValues as ILeaderboard[]);
  }

  static getLeaderBoard(leaderboard:ILeaderboard, team:ILeaderboard) {
    const board = { ...leaderboard };
    board.name = team.name;
    board.totalVictories += team.totalVictories;
    board.totalGames += team.totalGames;
    board.totalLosses += team.totalLosses;
    board.totalPoints += team.totalPoints;
    board.totalDraws += team.totalDraws;
    board.goalsBalance += team.goalsBalance;
    board.goalsFavor += team.goalsFavor;
    board.goalsOwn += team.goalsOwn;
    board.efficiency = parseFloat(((board.totalPoints / (board.totalGames * 3)) * 100).toFixed(2));
    return board;
  }
}
