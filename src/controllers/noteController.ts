import { Request, Response } from "express";
import conexion from "./../database";
import { INSERT, SELECT, SELECTONE, UPDATE, DELETE } from "../db/NoteText";
class NoteController {
    async list(req: Request, res: Response): Promise<any> {
        const pool = await conexion();
        const notes = await pool.query(SELECT);
        if (notes.length > 0){
            res.status(200).json(notes);
        }
        res.status(404).json({message: 'The notes no found'});
        await pool.end();
    }
    async selectOne(req: Request, res: Response): Promise<any> {
        const pool = await conexion();
        const {id} = req.params;
        const note = await pool.query(SELECTONE, [id]);
        if (note.length > 0)
            res.status(200).json(note);
        res.status(404).json({message: 'The note no found'});
        await pool.end();
    }
    async create(req: Request, res: Response): Promise<any> {
        const pool = await conexion();
        const respuesta = await pool.query(INSERT, req.body);
        if (respuesta > 1)
            res.status(200).json({message: 'Note - saved'});
        res.status(404).json({message: 'Note - no saved'});
    }
    async update(req: Request, res: Response): Promise<any> {
        const pool = await conexion();
        const {id} = req.params;
        const oldData = req.body;
        const respuesta = await pool.query(UPDATE, [oldData, id]);
        res.status(200).json({message: 'Note - Update'});
    }
    async remove(req: Request, res: Response): Promise<any> {
        const pool = await conexion();
        const {id} = req.params;
        const respuesta = await pool.query(DELETE, [id]);
        res.status(200).json({message: 'Note - Delete'});
    }
}
const noteController = new NoteController();
export default noteController;