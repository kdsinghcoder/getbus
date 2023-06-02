import express from "express";
import Authenticate from '../middleware/authenticate.js'
import { createPayment,paymentVerification } from '../controllers/payment.js'

const router = express.Router();

router.post('/orders', Authenticate,createPayment);
router.post('/verify', Authenticate ,paymentVerification);

export default router;