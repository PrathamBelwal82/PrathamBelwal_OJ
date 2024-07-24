const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (language, filepath, inputPath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}`);

    return new Promise((resolve, reject) => {
        let command;
        switch (language) {
            case 'cpp':
                command = `g++ ${filepath} -o ${outPath}.exe && ${outPath}.exe < ${inputPath}`;
                break;
            case 'c':
                command = `gcc ${filepath} -o ${outPath}.exe && ${outPath}.exe < ${inputPath}`;
                break;
            case 'java':
                command = `javac ${filepath} && java -cp ${path.dirname(filepath)} ${path.basename(filepath, '.java')} < ${inputPath}`;
                break;
            case 'python':
                command = `python3 ${filepath} < ${inputPath}`;
                break;
            default:
                return reject(new Error('Unsupported language'));
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

module.exports = {
    executeCpp,
};
