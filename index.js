const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});