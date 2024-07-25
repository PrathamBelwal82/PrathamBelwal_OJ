const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const outputPath = path.join(__dirname, 'outputs');

// Ensure outputPath exists
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (language, filepath, inputPath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}`);
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
            return Promise.reject(new Error('Unsupported language'));
    }

    console.log(`Executing command: ${command}`);
    console.log(`Code file path: ${filepath}`);
    console.log(`Input file path: ${inputPath}`);

    return new Promise((resolve, reject) => {
        exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
            console.log(`Execution stdout: ${stdout}`);
            console.log(`Execution stderr: ${stderr}`);
            
            if (error) {
                console.error(`Execution error: ${error.message}`);
                return reject({ error: error.message, stderr });
            }
            if (stderr) {
                console.error(`Execution stderr: ${stderr}`);
                return reject(stderr);
            }
            resolve(stdout.trim());  // Trim to remove extra spaces or newlines
        });
    });
};


module.exports = {
    executeCpp,
};
