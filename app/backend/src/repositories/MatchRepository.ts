import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';

export default class MatchRepository {
  matchModel = Match;
  async findAll() {
    const matches = await this.matchModel.findAll(
      { include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }] },
    );
    return matches;
  }

  async findAllInProgress(query:boolean) {
    const matches = await this.matchModel.findAll({ where: { inProgress: query },
      include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return matches;
  }

  async createMatch(matchData:IMatch) {
    const newMatch = await this.matchModel.create(matchData);
    return newMatch;
  }

  async updateMatch(id:number) {
    const updatedMatch = await this.matchModel.update({ inProgress: false }, { where: { id } });
    return updatedMatch;
  }

  async updateMatchGoals(id:number, matchGoals:IMatch) {
    const updatedMatch = await this.matchModel.update(
      {
        homeTeamGoals: matchGoals.homeTeamGoals, awayTeamGoals: matchGoals.awayTeamGoals },
      { where: { id, inProgress: true } },
    );
    return updatedMatch;
  }
}
