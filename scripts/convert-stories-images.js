const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "../public");
const outputDir = path.join(__dirname, "../public/images");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertFolder(folderName, prefix) {
  const folderPath = path.join(publicDir, folderName);
  if (!fs.existsSync(folderPath)) {
    console.warn(`Folder not found: ${folderName}`);
    return;
  }

  const files = fs.readdirSync(folderPath);
  console.log(`Processing folder ${folderName}...`);

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

    const inputPath = path.join(folderPath, file);
    const fileBase = path.parse(file).name;
    const targetName = `${prefix}_${fileBase.replace(/\s+/g, "_")}.webp`.toLowerCase();
    const outputPath = path.join(outputDir, targetName);

    console.log(`Converting ${file} -> ${targetName}...`);
    try {
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true }) // standard responsive web width
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Saved ${targetName}`);
      fs.unlinkSync(inputPath); // delete original raw file
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  try {
    fs.rmdirSync(folderPath);
    console.log(`Removed empty folder: ${folderName}`);
  } catch (e) {
    // folder might not be empty
  }
}

async function run() {
  await convertFolder("bai1", "bai1");
  await convertFolder("bai2", "bai2");
  await convertFolder("bai3", "bai3");
  console.log("All story images processed successfully!");
}

run();
