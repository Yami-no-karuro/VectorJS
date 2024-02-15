import { Request, Response } from 'express';
import { AbstractController } from '../modules/Controller/AbstractController';

export class DefaultController extends AbstractController 
{

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
    public defaultAction(_: Request, res: Response): void 
    {
        res.render('default', {
            title: 'VectorJS',
            description: 'A simple HttpFoundation framework for TypeScript.'
        });
    }

}
