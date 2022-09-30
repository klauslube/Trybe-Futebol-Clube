import { Op } from 'sequelize';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

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
    const matches = await this.matchModel.findAll({ where: {
      [Op.like]: { inProgress: `%${query}%` },
    },
    include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return matches;
  }
}
