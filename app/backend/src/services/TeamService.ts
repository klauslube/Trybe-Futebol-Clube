// import ITeam from '../interfaces/ITeam';
import TeamRepository from '../repositories/TeamRepository';

export default class TeamService {
  constructor(private teamModel:TeamRepository) { }

  public async getAll() {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async getById(id:number) {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}
