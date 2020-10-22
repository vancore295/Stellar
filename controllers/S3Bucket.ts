import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

AWS.config.update({
    accessKeyId: "AKIARX7DSUMECDNIQVM5",
    secretAccessKey: "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"
});

let s3 = new AWS.S3();
let filePath = "./data/file.txt";

var params = {
    Bucket: 's3.amazonaws.com/stellar.health.test.bomani.kernizan',
    Key: 'patients.log'
};

export default class S3Conroller {
    getFile = function (req, res) {
        console.log("in get file");
        s3.getObject(params, function (err, data) {
            if (err) {
                return res.json(err);
            } else {
                console.log("got file");
                let objectData = data.Body.toString('utf-8');
                fs.writeFile('patients.log', objectData, (err) => { if (err) throw err; })
            }
        })

        return res.json({ test: 'Hello world Mode' });
    }
}