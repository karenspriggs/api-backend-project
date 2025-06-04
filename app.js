import express from 'express';

import {PORT} from "./config/env.js";

import connectToDatabase from "./database/mongodb.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, async() =>{
    console.log(`Server started on port ${PORT}`);

    await connectToDatabase();
});

export default app;