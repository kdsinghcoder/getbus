import express from "express";
import { getBus , bookTicket,viewTransaction,cancelTicket,removeBus} from "../controllers/bus.js";
import Authenticate from "../middleware/authenticate.js";
const router = express.Router();

router.get('/transaction/:userid',viewTransaction);
router.get('/:origin/:destination/:date', getBus);

router.post('/book', Authenticate,bookTicket);
router.post('/cancel',Authenticate,cancelTicket);
router.post('/remove', Authenticate ,removeBus);



export default router;