import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id!: number;
  public team_name!: string;
}

Teams.init({
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
  modelName: 'Team',
  tableName: 'Team',
  timestamps: false,
});

export default Teams;
