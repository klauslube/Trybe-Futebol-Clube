import MatchRepository from '../repositories/MatchRepository';

export default class MatchService {
  constructor(private matchModel:MatchRepository) { }

  public async getAll() {
    const allMatches = await this.matchModel.findAll();
    return allMatches;
  }

  public async getAllInProgress(query) {
    const allMatches = await this.matchModel.findAllInProgress(query);
    return allMatches;
  }
}
