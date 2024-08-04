import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

class WorkedHours extends Model {
    public id!: number;
    public collaboratorId!: string;
    public date!: Date;
    public inOrOut!: string[]; // Novo campo adicionado
}

WorkedHours.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    collaboratorId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    inOrOut: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'worked_hours'
});

export default WorkedHours;
