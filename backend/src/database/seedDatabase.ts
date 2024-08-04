import sequelize from '../database/database';
import WorkedHours from "../models/workedHours";

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        await WorkedHours.bulkCreate([
            {
                collaboratorId: '4sxxfmf',
                date: new Date('2024-08-01'),
                inOrOut: ['08:00:00', '12:00:00','13:00:00', '17:00:00']
            },
            {
                collaboratorId: '4sxxfmf',
                date: new Date('2024-08-02'),
                inOrOut: ['08:00:00', '12:00:00','13:00:00', '17:00:00']
            },
            {
                collaboratorId: '4sxxfmf',
                date: new Date('2024-08-03'),
                inOrOut: ['08:00:00', '12:00:00','13:00:00', '17:00:00']
            },
        ]);

        console.log('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();
