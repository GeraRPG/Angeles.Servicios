import { Request, Response } from "express";
import conexion from "../database";
import IUser, { validatePassword, encryptPassword } from "../models/User";
import jwt from "jsonwebtoken";

export const sigup = async (req: Request, res: Response) => {
    //Validacion
    try {
        const pool = await conexion();
        const user: IUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        user.password = await encryptPassword(user.password);
        const saveUser = await pool.query('',user);
        const token: string = jwt.sign({idUser: saveUser.idUser}, process.env.TOKENT_SECRET || "Tokentest",
        {
            expiresIn: 60 * 60 * 24
        });
        await pool.end();
        res.header('auth-token', token).json(saveUser);
    } catch(e){
        res.status(400).json(e);
    }
}
export const signin = async (req: Request, res: Response) => {
    const pool = await conexion();
    const user: IUser = {
        email: req.body.email,
        password: req.body.password
    }
    const {email} = req.params;
    const userProfile = await pool.query('', [email]);
    if (userProfile.length <= 0) return res.status(404).json({message: 'User no exist'});
    
    const correctPassword = validatePassword(user.password, userProfile.password);
    if (!correctPassword) return res.status(400).json('Invalid Password');

    //Create a Token
    const token = jwt.sign({}, process.env.TOKENT_SECRET || "Tokentest");
    res.header('auth-token', token).json(token);
}
export const profile = async (req: Request, res: Response) => {
    try {
        const pool = await conexion();
        const { idUser } = req.params;
        const userProfile = await pool.query('',[idUser]);
        userProfile.password.delete();
        if (userProfile.lengt > 0) return res.status(404).json({message:'User no fount'});
        res.status(200).json(userProfile);
    } catch (e) {
        res.status(400).json(e);
    }
}