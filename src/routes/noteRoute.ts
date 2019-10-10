import { Router } from "express";
import noteController from './../controllers/noteController';
class NoteRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/', noteController.list);
        this.router.get('/:id');
        this.router.post('/');
        this.router.put('/:id');
        this.router.delete('/:id');
    }
}
const noteRoutes = new NoteRoutes();
export default noteRoutes.router;