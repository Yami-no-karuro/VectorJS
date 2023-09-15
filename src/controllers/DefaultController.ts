import { Request, Response } from 'express';
import { Controller } from '../modules/Controller/Controller';

export class DefaultController extends Controller {

    public static router = new DefaultController()
        .router;

    /**
     * @package VectorJS
     * UserController.routes()
     * @returns void
     */
    protected routes(): void {
        this.router.get('/', this.defaultAction);
    }

    /**
     * @package VectorJS
     * DefaultController.defaultAction()
     * @param req: Request 
     * @param res: Response
     * @returns void
     */
    public defaultAction(req: Request, res: Response): void {
        res.render('default', {
            title: "VectorJS",
            description: "A simple HttpFoundation framework for TypeScript."
        });
    }

}
