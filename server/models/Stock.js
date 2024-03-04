import mongoose from "mongoose";

const StockSchema = mongoose.Schema({
    date : String,
    item : String,
    quantity : Number,
    isChecked : Number
})

export const StockModel = mongoose.model('Stock',StockSchema)