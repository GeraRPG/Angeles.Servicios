import { Router } from "express";
import { indexContoller } from './../controllers/indexController';
class IndexRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/', indexContoller.index);
        this.router.post('/send-mail', indexContoller.mail);
    }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;