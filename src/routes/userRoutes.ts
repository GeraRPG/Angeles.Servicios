import { Router } from "express";
import {  } from './../controllers/userController';
class UserRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void {
        this.router.get('/');
        this.router.get('/');
        this.router.post('/');
        this.router.put('/');
        this.router.delete('/');
    }
}