import { Router } from 'express';
import { registerUser, loginUser } from '../userController/user.controller';
import { upload } from '../../../middlewares/multer.middleware';
import { registerUserValidation, loginUserValidation } from '../userValidation/user.validation';
import { validate } from '../../../middlewares/validation.middleware';

const router = Router();

router.post('/register', upload.single('avatar'), validate(registerUserValidation), registerUser);
router.post('/login', validate(loginUserValidation), loginUser);

export default router;
