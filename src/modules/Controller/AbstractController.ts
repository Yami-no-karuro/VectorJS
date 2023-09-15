import express, { Router } from 'express';

export abstract class AbstractController {
        
    protected router: Router;

    /**
     * @package VectorJS
     * AbstractController.constructor()
     * @returns void
     */
    constructor() {
        this.router = express.Router();
        this.routes();
    }

    /**
     * @package VectorJS
     * AbstractController.routes()
     * @returns void
     */
    protected abstract routes(): void;
    
}
