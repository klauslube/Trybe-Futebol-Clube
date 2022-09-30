import MatchRepository from '../repositories/MatchRepository';

export default class MatchService {
  constructor(private matchModel:MatchRepository) { }

  public async getAll() {
    const allMatches = await this.matchModel.findAll();
    return allMatches;
  }
}
