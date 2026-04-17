require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
.then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('❌ Database connection error:', err);
});











app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server!' });
});
