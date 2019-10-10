import express, {Application} from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { TokenValidation } from "./libs/verifyToken";
import indexRoutes from './routes/indexRoutes';
import cakesRoutes from './routes/cakesRoutes';
import noteRoutes from './routes/noteRoute';
import authRoutes from './routes/authRoutes';

class Server {
    public app: Application;
    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.routes();
    }
    //Configuraciones
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}))
    }
    //Rutas
    routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/cakes',TokenValidation,cakesRoutes);
        this.app.use('/api/notes',TokenValidation,noteRoutes);
        this.app.use('/api/auth', authRoutes);
    }
    //Inicializacion
    start(): void{
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on, port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();