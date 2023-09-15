import express, { Router } from 'express';

export abstract class Controller {

    protected router: Router;

    /**
     * @package VectorJS
     * Controller.constructor()
     * @returns void
     */
    constructor() {
        this.router = express.Router();
        this.routes();
    }

    /**
     * @package VectorJS
     * Controller.routes()
     * @returns void
     */
    protected abstract routes(): void;

}
