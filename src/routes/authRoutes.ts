import { Router } from "express";
import {sigup, signin, profile} from './../controllers/authController';
import { TokenValidation } from "./../libs/verifyToken";
class AuhtRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/', TokenValidation, profile);
        this.router.post('/sigin',signin);
        this.router.post('/sigup',sigup);
    }
}
const auhtRoutes = new AuhtRoutes();
export default auhtRoutes.router;