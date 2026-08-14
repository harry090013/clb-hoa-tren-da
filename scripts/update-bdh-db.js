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

const newMembers = [
  {
    full_name: "Đoàn Xuân Lộc",
    role: "Trưởng Ban Điều Hành",
    department: "Ban Điều Hành",
    bio: "Người đứng đầu câu lạc bộ, chịu trách nhiệm định hướng, điều hành và điều phối các hoạt động chung của Hoa Trên Đá.",
    avatar_url: "/images/bdh_xuanloc.webp",
    display_order: 1,
    active: true,
  },
  {
    full_name: "Phạm Minh Đức",
    role: "Phó Ban Điều Hành",
    department: "Ban Điều Hành",
    bio: "Phó Ban điều hành, chịu trách nhiệm dẫn chương trình, tổ chức nhân sự và hỗ trợ điều phối các hoạt động thực địa.",
    avatar_url: "/images/bdh_minhduc.webp",
    display_order: 2,
    active: true,
  },
  {
    full_name: "Nguyễn Khánh Tuấn",
    role: "Trưởng Ban Hậu Cần",
    department: "Ban Điều Hành",
    bio: "Trưởng Ban Hậu cần, phụ trách quản lý trang thiết bị, phân phối quà tặng và chuẩn bị hậu cần thực tế cho các dự án thiện nguyện.",
    avatar_url: "/images/bdh_khanhtuan.webp",
    display_order: 3,
    active: true,
  },
  {
    full_name: "Nguyễn Quang Hiếu",
    role: "Trưởng Ban Truyền Thông",
    department: "Ban Điều Hành",
    bio: "Trưởng Ban Truyền thông, chịu trách nhiệm sản xuất nội dung hình ảnh, video hoạt động và lan tỏa thông điệp của Hoa Trên Đá.",
    avatar_url: "/images/bdh_quanghieu.webp",
    display_order: 4,
    active: true,
  },
];

async function updateDb() {
  console.log("Connecting and authenticating to Supabase...");
  
  // Authenticate as Admin
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: "hoatrenda@gmail.com",
    password: "ADiDaPhat=1309",
  });

  if (authError) {
    console.error("Authentication failed:", authError.message);
    process.exit(1);
  }
  console.log("Authenticated successfully as", authData.user.email);

  // 1. Delete existing team members
  console.log("Clearing old team members...");
  const { error: delError } = await supabase
    .from("team_members")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // deletes all rows
  
  if (delError) {
    console.error("Error clearing old members:", delError);
    process.exit(1);
  }

  // 2. Insert new members
  console.log("Inserting new Ban Điều Hành members...");
  const { error: insError } = await supabase
    .from("team_members")
    .insert(newMembers);

  if (insError) {
    console.error("Error inserting new members:", insError);
    process.exit(1);
  }

  console.log("Database update completed successfully!");
}

updateDb();
