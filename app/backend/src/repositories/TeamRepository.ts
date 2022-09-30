import Team from '../database/models/Team';

export default class TeamRepository {
  teamModel = Team;
  async findAll() {
    const teams = await this.teamModel.findAll(
      { raw: true },
    );
    return teams;
  }
}
