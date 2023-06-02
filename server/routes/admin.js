import express from "express";
import { getAdminBus, editAdminBus , addAdminBus, addAdminCoupon , viewAdminCoupon, deleteCoupon, verifyAdminCoupon} from "../controllers/admin.js";
const router = express.Router();

router.get('/', getAdminBus);
router.get('/coupon', viewAdminCoupon);
router.get('/coupon/:name', verifyAdminCoupon);

router.delete("/coupon/:id",deleteCoupon);
router.post('/edit',editAdminBus);
router.post('/add',addAdminBus);
router.post('/coupon/add',addAdminCoupon);





export default router;