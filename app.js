const express = require("express");
const userRouter = require("./routes/index");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler")
const app = express();
app.use(express.json());
app.use(userRouter);

app.all("*",(req, res, next) =>{
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;