const mongoose = require("mongoose");

const RecordsSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  counts: {
    type: Array,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Records", RecordsSchema);
