import express from 'express';
import TestConroller from '../controllers/test';

export default function setTestRoutes(app) {
    const router = express.Router();
    const testContrler = new TestConroller();
    
    router.route('/test/hello').get(testContrler.testReturn);

    app.use('/api', router);
}