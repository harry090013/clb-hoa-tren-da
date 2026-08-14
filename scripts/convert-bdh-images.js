const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "../public/BanDieuHanh");
const outputDir = path.join(__dirname, "../public/images");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const bdhMapping = {
  "Đoàn Xuân Lộc.png": "bdh_xuanloc.webp",
  "Phạm Minh Đức.png": "bdh_minhduc.webp",
  "Nguyễn Khánh Tuấn.png": "bdh_khanhtuan.webp",
  "Nguyễn Quang Hiếu.png": "bdh_quanghieu.webp",
};

async function convert() {
  console.log("Starting BDH image conversion to WebP...");
  
  for (const [rawName, targetName] of Object.entries(bdhMapping)) {
    const inputPath = path.join(inputDir, rawName);
    const outputPath = path.join(outputDir, targetName);

    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${rawName}`);
      continue;
    }

    console.log(`Converting ${rawName} -> ${targetName}...`);
    try {
      await sharp(inputPath)
        .resize({ width: 400, height: 400, fit: "cover" }) // Crop and resize to 400x400 square for avatar symmetry
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`Successfully saved ${targetName}`);
      
      // Delete original heavy PNG
      fs.unlinkSync(inputPath);
      console.log(`Deleted original: ${rawName}`);
    } catch (err) {
      console.error(`Error converting ${rawName}:`, err);
    }
  }

  // Remove empty BanDieuHanh folder
  try {
    fs.rmdirSync(inputDir);
    console.log("Removed temporary folder public/BanDieuHanh");
  } catch (e) {
    // folder might not be empty
  }

  console.log("BDH image conversion completed!");
}

convert();
