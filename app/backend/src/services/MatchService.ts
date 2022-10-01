import authToken from '../helper/authToken';
import CustomError from '../middlewares/CustomError';
import IMatch from '../interfaces/IMatch';
import MatchRepository from '../repositories/MatchRepository';
import TeamRepository from '../repositories/TeamRepository';

export default class MatchService {
  constructor(private matchModel:MatchRepository, private teamModel: TeamRepository) { }

  public async getAll() {
    const allMatches = await this.matchModel.findAll();
    return allMatches;
  }

  public async getAllInProgress(query:boolean) {
    const allMatches = await this.matchModel.findAllInProgress(query);
    return allMatches;
  }

  public async createMatch(matchData:IMatch, token:string) {
    const verifyUser = authToken(token);
    if (!verifyUser) throw new CustomError(401, 'Token must be a valid token');
    if (matchData.homeTeam === matchData.awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }
    const homeTeam = await this.teamModel.findByPk(matchData.homeTeam);
    const awayTeam = await this.teamModel.findByPk(matchData.awayTeam);
    if (!homeTeam || !awayTeam) throw new CustomError(404, 'There is no team with such id!');
    const newMatch = await this.matchModel.createMatch(matchData);
    return newMatch;
  }

  public async updateMatch(id:number) {
    const updatedMatch = await this.matchModel.updateMatch(id);
    if (!updatedMatch) throw new CustomError(400, 'id errado');
    return updatedMatch;
  }

  public async updateMatchGoals(id:number, matchGoals:IMatch) {
    const updatedMatchGoals = await this.matchModel.updateMatchGoals(id, matchGoals);
    return updatedMatchGoals;
  }
}
