import express from "express";
import { StockModel } from "../models/Stock.js";
const router = express.Router();

const items = [ 'Pizza' , ' Sandwhich' , 'Burger' ]

router.post('/hello',async(req,res) => {
    console.log(req.body)
    res.send('HI')
})

router.post('/getItems',async(req,res) =>{
    res.json(items)
})
 
router.post('/specificDay',async(req,res) => {
    const { date } = req.body
    const record = await StockModel.find({date})
    if (record.length === 0) {
        items.forEach(async(item) => {
            const newRecord = new StockModel({ date , item , isChecked : -1 , quantity : -1})
            await newRecord.save()
        });   
    }
    res.send(record)

})

router.post('/check',async(req,res) => {
    const { date , item } = req.body
    const record = await StockModel.findOneAndUpdate({date,item},{isChecked: 1},{new:true})
    res.json({message : 'OK'})
})

router.post('/unCheck',async(req,res) => {
    const { date , item } = req.body
    const record = await StockModel.findOneAndUpdate({date,item},{isChecked: 0},{new:true})
    res.json({message : 'OK'})
})

router.post('/setQuantity',async(req,res) => {
    const { date , item , quantity} = req.body
    console.log(quantity)
    const record = await StockModel.findOneAndUpdate({date,item},{quantity},{new:true})
    console.log(record)
    res.json({message : 'OK'})
})

router.post('/unsetQuantity',async(req,res) => {
    const { date , item } = req.body
    const record = await StockModel.findOneAndUpdate({date,item},{quantity : -1},{new:true})
    console.log(record)
    res.json({message : 'OK'})
})

export default router