const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extende: true}));

mongoose.connect("mongodb://localhost:27017/processDB", {useNewUelParser: true})

const processSchema = new mongoose.Schema({
    process_ID: String,
    volume: Number,
    aht: Number,
    fte: Number
    });

const Captured_Process_Model = mongoose.model("Captured_Process", processSchema)

const Captured_Process_Record = new Captured_Process_Model();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
var process_id_value = req.body.Process_ID;
var volume_value = Number(req.body.Volume);
var aht_value = Number(req.body.AHT);

var fte_value = volume_value*aht_value*12/60/168;
fte_value = fte_value.toFixed();

Captured_Process_Record.process_ID = process_id_value;
Captured_Process_Record.volume = volume_value;
Captured_Process_Record.aht = aht_value;
Captured_Process_Record.fte = fte_value;
Captured_Process_Record.save();

res.send("FTE is " + fte_value);
    
});

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});