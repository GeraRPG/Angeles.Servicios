import {Request, Response} from 'express';
class IndexContoller {
    public index (req: Request, res: Response) {
        res.json({text: 'Welcome api/cakes'});
    }
    public mail (req: Request, res: Response) {
        const { name, email, phone, comments  } = req.body;
        var conterHtml = `
            <h1>Contact form</h1>
            <ul>
                <li>Nombre: ${name}</li>
                <li>E-mail: ${email}</li>
                <li>Phone: ${phone}</li>
                <li>Comments: ${comments}</li>
            </ul>
        `;
        
        res.json({text: 'send-mail'});
    }
}

export const indexContoller = new IndexContoller();