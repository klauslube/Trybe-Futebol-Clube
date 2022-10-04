// import ITeam from '../interfaces/ITeam';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class TeamRepository {
  teamModel = Team;
  async findAll() {
    const teams = await this.teamModel.findAll(
      { raw: true },
    );
    return teams;
  }

  async findByPk(id:number) {
    const team = await this.teamModel.findByPk(id);
    return team;
  }

  async findAllWithMatches() {
    const teams = await this.teamModel.findAll(
      { include: [{ model: Match, as: 'homeTeamMatches' },
        { model: Match, as: 'awayTeamMatches' }] },
    );
    return teams;
  }
}
