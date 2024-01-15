const express = require('express');
const userRoutes = require('./routes/userRoutes');
const secretRoutes = require('./routes/fieldRoutes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Authorization']
}));

app.use('/user', userRoutes);
app.use('/fields', secretRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
