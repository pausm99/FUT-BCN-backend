const express = require('express');
const userRoutes = require('./routes/userRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const reservationRoutes = require('./routes/reservationRoutes.js');
const availableReservationRoutes = require('./routes/availableReservationRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Authorization']
}));

app.use('/user', userRoutes);
app.use('/fields', fieldRoutes);
app.use('/reservations', reservationRoutes);
app.use('/availableReservations', availableReservationRoutes);
app.use('/events', eventRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
