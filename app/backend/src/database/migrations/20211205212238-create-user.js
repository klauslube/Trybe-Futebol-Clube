module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(30),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    },
      {
        timestamps: false,
      },
    )
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
