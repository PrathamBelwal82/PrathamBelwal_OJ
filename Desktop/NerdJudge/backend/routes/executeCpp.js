const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
    const jobId = path.basename(filepath, '.cpp');
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        const command = `g++ ${filepath} -o ${outPath} && ${outPath} < ${inputPath}`;
        console.log('Executing command:', command); // Log the command

        exec(command, (error, stdout, stderr) => {
            console.log('Stdout:', stdout); // Log stdout
            console.log('Stderr:', stderr); // Log stderr

            fs.unlink(outPath, (unlinkError) => {
                if (unlinkError) {
                    console.error('Failed to delete executable:', unlinkError);
                }
            });

            if (error) {
                console.error('Execution error:', error.message);
                return reject({ error: error.message, stderr });
            }
            if (stderr) {
                console.error('Stderr:', stderr);
                return reject({ error: 'Execution error', stderr });
            }
            resolve(stdout);
        });
    });
};

module.exports = {
    executeCpp,
};
