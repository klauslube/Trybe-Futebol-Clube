import { Router } from 'express';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import UserController from '../controller/UserController';
import BcryptService from '../helper/BCryptHash';
// import loginValidation from '../middlewares/loginValidation';

const router = Router();
const userRepository = new UserRepository();
const bCrypt = new BcryptService();
const loginService = new UserService(userRepository, bCrypt);
const loginController = new UserController(loginService);

router.post('/login', loginController.login);
// router.get('/login/validate', loginController.validate);

export default router;
