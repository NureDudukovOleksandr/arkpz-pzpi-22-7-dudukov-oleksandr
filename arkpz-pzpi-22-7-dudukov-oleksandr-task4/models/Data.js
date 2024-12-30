const { Schema, model } = require("mongoose");

const DataSchema = new Schema({
  temperature: { type: Number, required: true },
  Co2: { type: Number, required: true },
  vl: { type: Number, required: true },
  locationId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model("Data", DataSchema);
// для того, чтобы изменить данные в локации нужно будет делать пут реквест, чтобы сделать пут реквест тебе нужно сделать гет реквест в дата модель
// достать все данные локации ( Со2 влажность и тд) айдишник которой тебе нужен
// и вот эти данные тебе нужно будет захуярить в пут реквест, и выполнить этот реквест