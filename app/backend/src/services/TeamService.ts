import TeamRepository from '../repositories/TeamRepository';

export default class TeamService {
  constructor(private teamModel:TeamRepository) { }

  public async getAll() {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }
}
