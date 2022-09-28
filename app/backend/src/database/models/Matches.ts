import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  public id!: number;
  public team_name!: string;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: STRING,
    allowNull: false,
    unique: true,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'Match',
  timestamps: false,
});

Teams.belongsTo(Matches, { foreignKey: 'home_team', as: 'homeTeam' });
Teams.belongsTo(Matches, { foreignKey: 'away_team', as: 'awayTeam' });

Matches.hasMany(Teams, { foreignKey: 'id', as: 'homeTeamId' });
Matches.hasMany(Teams, { foreignKey: 'id', as: 'awayTeamId' });

export default Matches;
