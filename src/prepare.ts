import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Function to copy a folder and its contents
const copyFolderSync = (from: string, to: string) => {
    console.log(`Creating directory: ${to}`);

    fs.mkdirSync(to, { recursive: true });

    fs.readdirSync(from).forEach((element) => {
        console.log(`Copying: ${element}`);

        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);

        if (fs.lstatSync(fromPath).isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    });

    console.log('Files copied successfully.');
};

// Function to replace variables in files
const replaceVariablesInFiles = (folder: string, dayNumber: string) => {
    console.log(`Replacing day number ${dayNumber} in files in folder: ${folder}`);

    fs.readdirSync(folder).forEach((file) => {
        console.log(`Replacing in file: ${file}`);

        const filePath = path.join(folder, file);

        if (fs.lstatSync(filePath).isFile()) {
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/00/g, dayNumber);

            fs.writeFileSync(filePath, content, 'utf8');
        } else {
            replaceVariablesInFiles(filePath, dayNumber);
        }
    });

    console.log('Replacing day number in index file');

    const indexPath = path.join('src', 'index.ts');
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    indexContent = indexContent.replace(/day-\d{2}/g, `day-${dayNumber}`);
    fs.writeFileSync(indexPath, indexContent, 'utf8');

    console.log('Variables replaced successfully.');
};

// Function to download a file using axios
const downloadFile = async (url: string, outputPath: string) => {
    console.log(`Downloading file from: ${url} to: ${outputPath}`);

    const response = await axios.get(url, {
        responseType: 'stream',
        headers: { cookie: `session=${process.env.SESSION_COOKIE}` }
    });

    const writer = fs.createWriteStream(outputPath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });

    console.log('Removing trailing empty lines from input file');

    let content = fs.readFileSync(outputPath, 'utf8');
    content = content.replace(/\n+$/, ''); // Remove trailing empty lines
    fs.writeFileSync(outputPath, content, 'utf8');

    console.log('Copying input file for part 2');

    const destinationPath = outputPath.replace('input-01', 'input-02');

    if (fs.existsSync(destinationPath)) {
        fs.unlinkSync(destinationPath);
    }

    fs.copyFileSync(outputPath, destinationPath);

    console.log('File downloaded and copied successfully.');
};

// Main function
const main = async () => {
    const day = process.argv[2]; // 1 - 25
    const paddedDay = day.padStart(2, '0');

    const sourceFolder = 'src/day-00';
    const destinationFolder = `src/day-${paddedDay}`;
    const fileUrl = `https://adventofcode.com/2024/day/${day}/input`;
    const outputFilePath = `src/day-${paddedDay}/input-01.txt`;

    // Copy folder
    copyFolderSync(sourceFolder, destinationFolder);

    // Replace variables in files
    replaceVariablesInFiles(destinationFolder, paddedDay);

    // Download file
    await downloadFile(fileUrl, outputFilePath);

    console.log('Operation completed successfully.');
};

main().catch(console.error);
