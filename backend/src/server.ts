import app from './app';
import sequelize from './database/database'

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Server is running on port ${PORT}`);
});
