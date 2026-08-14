const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const logoPath = path.join(__dirname, "../public/logo_clb_hoatrenda.jpg");
const targetIconPath = path.join(__dirname, "../src/app/icon.png");
const oldFaviconPath = path.join(__dirname, "../src/app/favicon.ico");

async function createFavicon() {
  console.log("Generating website favicon from CLB logo...");
  
  if (!fs.existsSync(logoPath)) {
    console.error("Logo file not found at public/logo_clb_hoatrenda.jpg");
    process.exit(1);
  }

  try {
    // 1. Delete old default favicon.ico if it exists
    if (fs.existsSync(oldFaviconPath)) {
      fs.unlinkSync(oldFaviconPath);
      console.log("Deleted old default favicon.ico");
    }

    // 2. Convert and resize logo to 48x48 PNG icon
    await sharp(logoPath)
      .resize(48, 48) // standard favicon resolution
      .png()
      .toFile(targetIconPath);

    console.log("Successfully generated website favicon at src/app/icon.png!");
  } catch (err) {
    console.error("Error creating favicon:", err);
  }
}

createFavicon();
