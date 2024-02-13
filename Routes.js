const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.LOGS_SERVICE_PORT || 5002;
const DB_SERVICE_URL = "http://localhost:5001"

app.use(express.json());

app.post('/add_log', async  (req, res) => {
    try {
        var Fields = {
            name_program:req.body["name_program"],
            architecture: req.body["architecture"],
            os_name: req.body["os_name"],
            log_text: req.body["log_text"]
        }
        // var SQL_QUERY = "INSERT INTO logs ";
        // var Columns = "(";
        // var Values = "(";

        if (req.body["channel"]) {
            Fields["channel"] = req.body["channel"];
        }
        if (req.body["function_name"]) {
            Fields["function_name"] = req.body["function_name"];
        }
        // Object.entries(Fields).forEach(([key, value], i) => {
        //     if (i != Fields.length) {
        //         Columns = Columns + key;
        //         Values = Values + "'" + value + "'";
        //         if (i != Object.keys(Fields).length - 1) {
        //             Columns += ",";
        //             Values += ",";
        //         }
        //     }
        // });
        // Columns += ")";
        // Values += ")";
        // SQL_QUERY = SQL_QUERY + Columns + " VALUES " + Values;
        const response = await axios.post(DB_SERVICE_URL + '/insert', { "data": Fields,"table":"logs" });
        res.sendStatus(response.status);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding log' });
    }
});

app.get("/wake_up_tests", async function (req, res) {
    try {
        const response = await axios.get(DB_SERVICE_URL + '/wake_up_db');
        res.sendStatus(response.status);
    }
    catch (error) {
        res.status(500).json({ message: 'Error wake up database' });
    }
})

app.listen(PORT, () => {
    console.log('Logs listening on port ' + PORT);
});
