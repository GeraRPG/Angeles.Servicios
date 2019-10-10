import { Router } from "express";
import cakesController from './../controllers/cakesController'
import { TokenValidation } from "./../libs/verifyToken";
class CakesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/', cakesController.list);
        this.router.get('/:id' ,cakesController.getOne);
        this.router.post('/', cakesController.create);
        this.router.put('/:id', cakesController.update);
        this.router.delete('/:id', cakesController.remove);
    }
}
const cakesRoutes = new CakesRoutes();
export default cakesRoutes.router;