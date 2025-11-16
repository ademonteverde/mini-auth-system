import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});