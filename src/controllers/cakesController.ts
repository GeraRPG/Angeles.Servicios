import {Request, Response} from 'express';
import conexion from "./../database";
import { INSERT, UPDATE, SELECT, SELECTONE, DELETE } from "../db/CakeText";
class CakesController {
    async list (req: Request, res: Response): Promise<any> {
        const pool = await conexion();
        const cakes = await pool.query(SELECT);
        if (cakes.length > 0)
            return res.status(200).json(cakes);

        res.status(404).json({message: 'The cakes no exits'});        
        await pool.end();
    }
    async getOne (req: Request, res: Response): Promise<any>{
        const pool = await conexion();
        const {id} = req.params;
        const cake = await pool.query(SELECTONE, [id]);
        if (cake.length > 0)
            return res.status(200).json(cake[0]);

        res.status(404).json({message: 'The cake no exist'});
        await pool.end()
    }
    async create(req: Request, res: Response): Promise<void>{
        const pool = await conexion();
        const respuesta = await pool.query(INSERT, req.body);
        res.json({message: 'User - Saved'});
    }
    async update (req: Request, res: Response): Promise<void>{
        const pool = await conexion();
        const { id } = req.params;
        const oldData = req.body;
        const respuesta = await pool.query(UPDATE,[oldData, id]);
        console.log(respuesta);
        res.json({message: 'User - update'});
    }
    async remove (req: Request, res: Response): Promise<void>{
        const pool = await conexion();
        const { id } = req.params;
        const respuesta = await pool.query(DELETE, [id]);
        res.json({message: 'User - Delete'});
    }
}

const cakesController = new CakesController();
export default cakesController;