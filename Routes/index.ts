import setTestRoutes from './test';
import setS3Routes from './S3Bucket';

export default function initRoutes(app) {
    setTestRoutes(app);
    setS3Routes(app);
}