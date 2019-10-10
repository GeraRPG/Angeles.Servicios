import { Request, Response } from "express";
import conexion from "./../database";
import jwt from "jsonwebtoken";
class UserController {
    async list(req: Request, res:Response): Promise<any>{
        const pool = await conexion();
        const users = await pool.query('');
        await pool.end();
        res.json(users);
    }
    async getOne (req: Request, res: Response): Promise<any>{
        const pool = await conexion();
        const {IdUser} = req.params;
        const user = await pool.query('');
        if (user.lenht > 0) {
            return res.json(user[0]);
        }
        res.status(404).json({error: 'The User no exist'});
        await pool.end();
    }
    async create(req: Request, res: Response): Promise<void>{
        const pool = await conexion();
        const respuesta = await pool.query('INSERT INTO cakes SET ?', req.body);
        res.json({message: 'Cake - Saved'});
        await pool.end();
    }
    async update (req: Request, res: Response): Promise<void>{
        const pool = await conexion();
        const { id } = req.params;
        const oldData = req.body;
        const respuesta = await pool.query('UPDATE cakes SET ? WHERE id = ?',[oldData, id]);
        res.json({message: 'Cake - update'});
        await pool.end();
    }
    async remove (req: Request, res: Response): Promise<void>{
        const pool = await conexion();
        const { id } = req.params;
        const respuesta = await pool.query('DELETE FROM cakes WHERE id = ?', [id]);
        res.json({message: 'Cake - Delete'});
        await pool.end();
    }
}

const userController = new UserController();
export default userController;