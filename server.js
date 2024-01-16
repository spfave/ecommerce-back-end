// Packages and setup
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bring in routes
app.use(routes);

// Sync sequelize models to database, then turn server on
app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));
