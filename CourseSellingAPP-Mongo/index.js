const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

// console.log(adminRouter);
// console.log(userRouter);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
	console.log(`Server is running at PORT ${PORT}`);
});
