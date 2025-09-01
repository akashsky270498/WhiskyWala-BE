import { Router } from "express";
import { registerUser } from "../userController/user.controller";
import { upload } from "../../../middlewares/multer.middleware";
// import {registerUserValidation} from "../userValidation/user.validation";

const router = Router();

router.post("/register", upload.single("avatar"), registerUser);

export default router;
