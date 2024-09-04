import { Router } from 'express';
import isAuth from '../middleware/isAuth.js';
import { getProfile, updateProfile } from '../controller/user/profile.js';
const userRouter = Router();

userRouter.use(isAuth);

userRouter.get('/hello', (req, res) => {
    res.status(200).json({
        message: 'Hello from user route',
        user: req.user
    })
});

userRouter.get('/profile', getProfile);
userRouter.put('/profile', updateProfile);

export default userRouter;