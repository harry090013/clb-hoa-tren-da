const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Read env variables manually from .env.local
const envPath = path.join(__dirname, "../.env.local");
let supabaseUrl = "";
let supabaseAnonKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)/);
  const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.*)/);
  if (urlMatch) supabaseUrl = urlMatch[1].trim();
  if (keyMatch) supabaseAnonKey = keyMatch[1].trim();
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Could not find Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function cleanData() {
  console.log("Connecting and authenticating to Supabase...");
  
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: "hoatrenda@gmail.com",
    password: "ADiDaPhat=1309",
  });

  if (authError) {
    console.error("Authentication failed:", authError.message);
    process.exit(1);
  }
  console.log("Authenticated successfully as", authData.user.email);

  // 1. Delete all old stories except the 3 new ones
  console.log("Cleaning old stories...");
  const newSlugs = [
    "vi-sao-chung-minh-mang-ten-hoa-tren-da",
    "truoc-khi-co-hoa-tren-da-chung-minh-da-di-qua-nhung-hanh-trinh-nao",
    "hoa-tren-da-se-lam-gi"
  ];
  
  const { error: storyError } = await supabase
    .from("stories")
    .delete()
    .not("slug", "in", `(${newSlugs.join(",")})`);

  if (storyError) {
    console.error("Error deleting old stories:", storyError);
  } else {
    console.log("Old stories cleaned successfully!");
  }

  // 2. Delete all test financial reports and transactions
  console.log("Cleaning test financial reports & transactions...");
  const { error: finError } = await supabase
    .from("financial_reports")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Deletes all rows

  if (finError) {
    console.error("Error deleting financial reports:", finError);
  } else {
    console.log("Test financial reports and transactions cleaned successfully!");
  }

  console.log("All requested test data has been successfully cleaned!");
}

cleanData();
