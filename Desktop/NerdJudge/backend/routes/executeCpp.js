const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');

// Ensure outputPath exists
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}


const executeCommand = (command, args, timeLimitMs) => {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { shell: '/bin/bash' });
        let timer;

        // Setup timeout to kill the process if it exceeds the time limit
        if (timeLimitMs) {
            timer = setTimeout(() => {
                process.kill(); // Kill the process
                reject(new Error('Process timed out'));
            }, timeLimitMs);
        }

        let stdout = '';
        let stderr = '';

        process.stdout.on('data', (data) => {
            stdout += data;
        });

        process.stderr.on('data', (data) => {
            stderr += data;
        });

        process.on('close', (code) => {
            if (timer) {
                console.log(timer);
                clearTimeout(timer);
            }
            if (code !== 0) {
                return reject(new Error(`Process exited with code ${code}`));
            }
            resolve(stdout.trim());  // Trim to remove extra spaces or newlines
        });

        process.on('error', (error) => {
            if (timer) {
                clearTimeout(timer);
            }
            reject(error);
        });
    });
};

const executeCpp = async (language, filepath, inputPath, timeLimitMs = 60000) => {
    const jobId = path.basename(inputPath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}`);
    let command;

    try {
        if (['cpp', 'c', 'java'].includes(language)) {
            // Set up the full command sequence for compilation and execution
            if (language === 'cpp') {
                command = `g++ ${filepath} -o ${outPath}.exe && ${outPath}.exe < ${inputPath}`;
            } else if (language === 'c') {
                command = `gcc ${filepath} -o ${outPath}.exe && ${outPath}.exe < ${inputPath}`;
            } else if (language === 'java') {
                command = `javac ${filepath} && java -cp ${path.dirname(filepath)} ${path.basename(filepath, '.java')} < ${inputPath}`;
            }
        } else if (language === 'python') {
            // Python code does not need compilation
            command = `python3 ${filepath} < ${inputPath}`;
        }

        console.log(`Executing command: ${command}`);

        // Execute the command
        const result = await executeCommand(command, [], timeLimitMs);
        return result;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};


module.exports = {
    executeCpp,
};
