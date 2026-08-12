const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "../public/hinh_anh_clb");
const outputDir = path.join(__dirname, "../public/images");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clean mapping of files to readable names
const fileMapping = {
  "DSC_0271.JPG": "haigiang_1.webp",
  "DSC_0277.JPG": "haigiang_2.webp",
  "DSC_0298.JPG": "haigiang_3.webp",
  "DSC_0360.JPG": "haigiang_4.webp",
  "tinh_nguyen (1).jpg": "tinh_nguyen_1.webp",
  "tinh_nguyen (2).jpg": "tinh_nguyen_2.webp",
  "tinh_nguyen (3).jpg": "tinh_nguyen_3.webp",
  "tinh_nguyen (4).jpg": "tinh_nguyen_4.webp",
  "tinhnguyen (1).jpg": "tinhnguyen_1.webp",
  "tinhnguyen (2).jpg": "tinhnguyen_2.webp",
  "tinhnguyen (3).jpg": "tinhnguyen_3.webp",
  "tinhnguyen (4).jpg": "tinhnguyen_4.webp",
  "tinhnguyen (5).jpg": "tinhnguyen_5.webp",
};

async function convert() {
  console.log("Starting image conversion to WebP...");
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputName = fileMapping[file] || `${path.parse(file).name}.webp`;
    const outputPath = path.join(outputDir, outputName);

    console.log(`Converting ${file} -> ${outputName}...`);
    
    try {
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true }) // resize to 1200px max width
        .webp({ quality: 80 }) // convert to webp with 80% quality
        .toFile(outputPath);
      
      console.log(`Successfully saved ${outputName}`);
      
      // Delete original heavy file to save git space
      fs.unlinkSync(inputPath);
      console.log(`Deleted original: ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  
  // Finally, remove the empty folder
  try {
    fs.rmdirSync(inputDir);
    console.log("Removed temporary folder public/hinh_anh_clb");
  } catch (e) {
    // folder might not be empty if there were files not in mapping
  }

  console.log("Image conversion completed!");
}

convert();
