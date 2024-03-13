const express = require('express');
const env = require('dotenv');
const bookRouter = require('./routes/bookRouter');
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middleware/errorHandler');
const DBConnect = require('./config/dbConnection');

env.config();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 1000;

DBConnect();
const app = express();

app.use(express.json());
app.use('/api/book',bookRouter);
app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server listening on http://${hostname}:${port}`);
});