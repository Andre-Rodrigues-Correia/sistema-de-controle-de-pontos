import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

class WorkedHours extends Model {
    public id!: number;
    public collaboratorId!: string;
    public date!: Date;
    public hoursWorked!: string;
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
    hoursWorked: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'worked_hours'
});

export default WorkedHours;
