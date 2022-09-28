module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
    },
      {
        timestamps: false,
      },
    )
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};
