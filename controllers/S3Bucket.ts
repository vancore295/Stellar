import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

export default class S3Conroller {
    getFile = function (req, res) {
        console.log("in get file");
        AWS.config.update({
            accessKeyId: "AKIARX7DSUMECDNIQVM5",
            secretAccessKey: "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"
        });

        let s3 = new AWS.S3();
        let filePath = "./data/file.txt";

        let params = {
            Bucket: 'stellar.health.test.bomani.kernizan',
            Key: 'patients.log'
        };
        s3.getObject(params, function (err, data) {
            if (err) {
                return res.json(err);
            } else {
                console.log("got file");
                let objectData = data.Body.toString('utf-8');
                fs.writeFile('patients.log', objectData, (err) => { if (err) throw err; })

                let logLines = objectData.split('\n');
                let newLogLines = [];

                for (let i = 0; i < logLines.length; i++) {
                    let parcedLine = logLines[i].split(' ');
                    let newLogLine = '';
                    for (let j = 0; j < parcedLine.length; j++) {
                        if (parcedLine[j].includes('DOB')) {
                            let dob = parcedLine[j].substring(5, parcedLine[j].length);
                            let parts = dob.split('/');

                            if(parts.length > 2) { 
                                parts[0] = 'X';
                                parts[1] = 'X';
    
                                if (parts[2].includes('\\')) {
                                    parts[2] = parts[2].replace('\\', '');
                                }
                                let anonDob = parts.join('/');
    
                                parcedLine[j] = 'DOB=\'' + anonDob;
                                logLines[i] = parcedLine.join(' ');
                            }
                        }
                    }
                    newLogLines.push(logLines[i]);
                }
                fs.writeFile('newPatients.log', newLogLines.join('\n'), (err) => { if (err) throw err; })
                const fileContent = fs.readFileSync('newPatients.log');
                let params2 = {
                    Bucket: 'stellar.health.test.bomani.kernizan',
                    Key: 'patients.log',
                    Body: fileContent
                };

                s3.upload(params2, function(err, data) {
                    if (err) {
                        throw err;
                    }
                    console.log(`File uploaded successfully. ${data.Location}`);
                });
            }
            return res.json({ test: 'Hello from S3 bucket controller' });
        })
    }
}