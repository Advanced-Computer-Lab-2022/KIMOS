const Invoice = require("../models/invoiceModel");
const User = require("../models/UserModel");
const asyncHandler = require('express-async-handler');

const createInvoice = asyncHandler(async(req, res)=>{
    const userId  = res.locals.userId;
    const {instructorId} = req.query;
    const {payment} = req.body;
    await Invoice.create({userId:userId, instructorId:instructorId, courseId, payment:payment});

})
const refundInvoice = asyncHandler(async(req, res)=>{
    const  userId  = res.locals.userId;
    const {instructorId} = req.query;
    const {payment} = req.body;
    await Invoice.create({userId:userId, instructorId:instructorId, payment:(payment*-1)});
    await User.findByIdAndUpdate(userId, {$inc:{wallet: payment}});
})

const getAllInvoices = asyncHandler(async(req, res) =>{
    const {instructorId} = req.query;
    const invoices = await Invoice.find({instructorId:instructorId});
    res.status(200).json({ payload:invoices, success: true, statusCode: 200, message: 'Invoices sent Successfully!' });
})

