// Packages and setup
import express from 'express';
import { router as routes } from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bring in routes
app.use(routes);

// Sync sequelize models to database, then turn server on
console.log('port:', process.env.PORT);
console.log('db url:', process.env.DATABASE_URL);
app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));
