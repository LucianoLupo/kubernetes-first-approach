const mongoose = require('mongoose')
const Schema = mongoose.Schema
let example = new Schema({
id: String,
data: String,
 })
module.exports = mongoose.model("example", example)