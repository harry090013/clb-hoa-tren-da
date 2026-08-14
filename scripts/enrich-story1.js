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

const richContentStory1 = `### 🌸 CÂU CHUYỆN ĐẰNG SAU MỘT CÁI TÊN

Có những cái tên được nghĩ ra trong một buổi họp. Nhưng cũng có những cái tên phải đi qua rất nhiều hành trình mới tìm được nơi để thuộc về. **“Hoa Trên Đá”** là một cái tên như thế.

Nhiều năm trước, anh **Đoàn Xuân Lộc** có duyên kết nối và đồng hành cùng một câu lạc bộ thiện nguyện. Ở đó có một tinh thần rất đặc biệt: *muốn kêu gọi sự sẻ chia, trước hết chính mình cũng phải hành động.*

Thay vị chỉ đứng lên kêu gọi, các anh chị ở đó đã chọn những hành trình đầy thử thách bằng chính sức mình:
*   🚴 **Có những chuyến đi bằng xe đạp.**
*   🚶 **Có những hành trình đi bộ đường dài.**
*   🎒 **Có những ngày rong ruổi trên đường chỉ với một mong muốn giản dị:** làm điều gì đó để góp thêm nguồn lực cho những chuyến thiện nguyện tiếp theo.

---

### 🎨 TỪ NHỮNG VIÊN ĐÁ VÔ TRI ĐẾN NGHỆ THUẬT SẺ CHIA

Và rồi trong một hành trình như thế, một ý tưởng xuất hiện: **Mang những viên đá về, cùng nhau vẽ lên chúng, rồi bán đấu giá để gây quỹ cho các chương trình thiện nguyện.**

Những viên đá vốn khô cứng, vô tri, qua bàn tay và tấm lòng của mọi người lại trở thành những món đồ mang theo câu chuyện, màu sắc và hy vọng. Có lẽ từ đó, cái tên **“Hoa Trên Đá”** đã mang một ý nghĩa đặc biệt:

*   🌸 **Hoa:** là sự sống, là hy vọng, là những điều tốt đẹp.
*   🪨 **Đá:** là những khó khăn, thử thách và những hoàn cảnh không phải lúc nào cũng thuận lợi.

> *Một bông hoa có thể nở trên đá cũng giống như một điều tử tế vẫn có thể được sinh ra giữa những hoàn cảnh khó khăn nhất.*

![Hình ảnh hoạt động vẽ đá gây quỹ thiện nguyện](/images/bai1_anh1.webp)

---

### 🤝 KHI TẤM LÒNG GẶP NHAU

Đến năm **2026**, anh **Đoàn Xuân Lộc** cùng những người đồng đội quyết định đi xa hơn một chuyến thiện nguyện, xa hơn một hoạt động ngắn ngày. Mọi người muốn xây dựng một cộng đồng tình nguyện lâu dài, bền chặt, nơi những người cùng chung tinh thần có thể gặp nhau, cùng hành động và cùng đi qua nhiều hành trình hơn nữa.

Và cái tên **Hoa Trên Đá** một lần nữa được lựa chọn. Lần này, nó trở thành tên của:

🏆 **CÂU LẠC BỘ THIỆN NGUYỆN HOA TRÊN ĐÁ**

Slogan hoạt động của chúng mình:
> **“Từ đá nở hoa – Từ tâm lan tỏa.”**

Bởi chúng mình tin rằng: Từ những nơi khó khăn nhất vẫn có thể nở ra những điều đẹp đẽ. Và từ một tấm lòng chân thành, sự tử tế có thể tiếp tục được truyền từ người này sang người khác.

Hành trình của Hoa Trên Đá bắt đầu như vậy. Không phải từ một cái tên, mà từ rất nhiều bước chân, rất nhiều hành động và một niềm tin đã được nuôi dưỡng qua năm tháng.

🌸 **TỪ ĐÁ NỞ HOA – TỪ TÂM LAN TỎA.**`;

async function enrichStory1() {
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

  console.log("Updating Story 1 with rich content...");
  const { error } = await supabase
    .from("stories")
    .update({ content: richContentStory1 })
    .eq("slug", "vi-sao-chung-minh-mang-ten-hoa-tren-da");

  if (error) {
    console.error("Error updating story 1:", error);
  } else {
    console.log("Story 1 updated successfully!");
  }
}

enrichStory1();
