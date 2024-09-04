import {  Router } from 'express';
import isAuth from '../middleware/isAuth.js';
import createSlot from '../controller/slot/createSlot.js'
import deleteSlot from '../controller/slot/deleteSlot.js';
import {listSlot, userSlot, userSlotBooked, userBookSlot} from '../controller/slot/listSlot.js';
import bookSlot from '../controller/slot/bookSlot.js';
import completeSlot from '../controller/slot/completeSlot.js';
const slotRouter = Router();

slotRouter.use(isAuth);

slotRouter.get('/hello', (req, res) => {
    res.status(200).json({
        message: 'Hello from slot route',
        user: req.user
    })
});
slotRouter.post('/', createSlot,);
slotRouter.delete('/', deleteSlot);
slotRouter.get('/', listSlot);
slotRouter.get('/user', userSlot)
slotRouter.put('/' , bookSlot);
slotRouter.put('/complete' , completeSlot);
slotRouter.get('/booked' , userSlotBooked)
slotRouter.get('/booking', userBookSlot)

export default slotRouter;