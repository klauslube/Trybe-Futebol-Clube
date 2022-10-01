import authToken from '../helper/authToken';
import CustomError from '../middlewares/CustomError';
import IMatch from '../interfaces/IMatch';
import MatchRepository from '../repositories/MatchRepository';

export default class MatchService {
  constructor(private matchModel:MatchRepository) { }

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
    if (!verifyUser) throw new CustomError(401, 'Invalid user');
    const newMatch = await this.matchModel.createMatch(matchData);
    return newMatch;
  }

  public async updateMatch(id:number) {
    const updatedMatch = await this.matchModel.updateMatch(id);
    if (!updatedMatch) throw new CustomError(400, 'id errado');
    return updatedMatch;
  }
}
