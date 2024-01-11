const express = require('express');
const userRoutes = require('./routes/userRoutes');
const secretRoutes = require('./routes/secretRoutes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/secret', secretRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});