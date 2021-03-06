const express = require("express");
const app = express();

app.use(express.json({extended: true, limit: '50mb'}));
app.use(express.static('client/dist'));

app.use("/api/teams", require("./routes/teams.routes"));
app.use("/api/employees", require("./routes/employees.routes"));
app.use("/api/positions", require("./routes/positions.routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App started on ${PORT}.`));


