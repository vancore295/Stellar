import express from 'express';
import S3Conroller from '../controllers/S3Bucket';

export default function setTestRoutes(app) {
    const router = express.Router();
    const s3Conroller = new S3Conroller();
    
    router.route('/s3/download').get(s3Conroller.getFile);

    app.use('/api', router);
}