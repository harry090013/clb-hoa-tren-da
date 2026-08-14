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

const richContentBai2 = `### 🌸 HÀNH TRÌNH KHỞI NGUỒN CỦA SỰ SẺ CHIA

Câu lạc bộ Thiện nguyện **Hoa Trên Đá** chính thức mang tên mình từ năm **2026**. Nhưng hành trình của những con người trong tập thể này không bắt đầu từ năm 2026.

Trước đó, nhiều thành viên đã có thời gian cùng hoạt động trong **CLB Ngân hàng Máu sống Quế Xuân 2**, đơn vị trực thuộc *Mạng lưới Tình nguyện Quốc gia khu vực Miền Trung*. 

![Các thành viên tham gia hoạt động cộng đồng](/images/bai2_2.webp)

Từ những hoạt động hiến máu, hỗ trợ cộng đồng, kết nối tình nguyện viên đến những chương trình sẻ chia dành cho các hoàn cảnh khó khăn, từng chuyến đi đã giúp mọi người hiểu rõ hơn rằng:

*   **🫶 Thiện nguyện không chỉ là trao đi một món quà:** Đó còn là trách nhiệm với những gì mình đã nhận.
*   **🔎 Là việc tìm hiểu trước khi giúp đỡ:** Phải đến đúng nơi, làm đúng điều cần thiết.
*   **⏳ Và quan trọng hơn cả:** Là đủ bền bỉ để không chỉ xuất hiện một lần rồi biến mất.

![Hoạt động hỗ trợ và trao quà thực tế](/images/bai2_3.webp)

---

### 🤝 BƯỚC CHUYỂN MÌNH SANG HÀNH TRÌNH MỚI

Qua nhiều năm đồng hành cùng các hoạt động cộng đồng, những người trong nhóm ngày càng nhận ra rằng cần có một nơi để kết nối lâu dài hơn. Một tập thể có định hướng, có trách nhiệm, có những nguyên tắc chung, và có thể tiếp tục phát triển qua nhiều thế hệ thành viên.

![Các tình nguyện viên chuẩn bị cho chiến dịch](/images/bai2_4.webp)

Sau những thay đổi về tổ chức và quá trình sắp xếp lại hoạt động, nhóm bước sang một hành trình mới. Năm 2026, **Câu lạc bộ Thiện nguyện Hoa Trên Đá** được thành lập, với anh **Đoàn Xuân Lộc** là người phụ trách dẫn dắt tập thể trong giai đoạn đầu.

![Đoàn tình nguyện trên đường thực địa vùng cao](/images/bai2_5.webp)

Nhưng Hoa Trên Đá không được tạo nên bởi một cá nhân. Hoa Trên Đá được tạo nên bởi những con người sẵn sàng cùng làm:
*   💪 *Người có sức góp sức.*
*   ⏱️ *Người có thời gian góp thời gian.*
*   🎓 *Người có chuyên môn góp chuyên môn.*
*   💵 *Người có nguồn lực góp nguồn lực.*
*   📣 *Và đôi khi, chỉ cần một người sẵn lòng chia sẻ câu chuyện để thêm một người khác biết đến một hoàn cảnh cần giúp đỡ.*

![Nụ cười của trẻ em vùng cao nhận quà](/images/bai2_6.webp)

---

### 🌱 ĐỊNH HƯỚNG TƯƠNG LAI BỀN VỮNG

Chúng mình muốn xây dựng Hoa Trên Đá thành một cộng đồng nơi mỗi thành viên có thể:
1.  **🫶 Làm những việc có ích cho xã hội.**
2.  **🛡️ Học cách sống trách nhiệm hơn.**
3.  **📚 Rèn luyện kỹ năng qua những hoạt động thực tế.**
4.  **❤️ Gặp gỡ những người cùng chung giá trị.**
5.  **🚀 Và cùng nhau tạo nên những chương trình có thể đi được đường dài.**

![Sự đồng hành bền bỉ của các thế hệ thành viên](/images/bai2_7.webp)

Chúng mình vẫn đang ở những ngày đầu của một cái tên mới. Nhưng phía sau cái tên ấy là những con người đã có những hành trình từ trước đó. Và phía trước, sẽ còn rất nhiều hành trình đang chờ.

🌸 **CÂU LẠC BỘ THIỆN NGUYỆN HOA TRÊN ĐÁ**  
*Từ đá nở hoa – Từ tâm lan tỏa.*`;

const richContentBai3 = `### 🌸 ĐỊNH NGHĨA BẰNG HÀNH ĐỘNG

Một câu lạc bộ thiện nguyện không được định nghĩa bằng những điều mình nói, mà bằng những điều mình thực sự làm được cho cộng đồng. Đó cũng là cách mà **Câu lạc bộ Thiện nguyện Hoa Trên Đá** muốn bước đi trong chặng đường sắp tới. 

Chúng mình không đặt mục tiêu làm những điều thật lớn ngay từ ngày đầu tiên. Chúng mình muốn bắt đầu bằng những việc thiết thực, có trách nhiệm và phù hợp với nhu cầu thực tế của từng nơi.

![Hoạt động hỗ trợ phát triển bền vững](/images/bai3_2.webp)

---

### 1. 🌱 ĐỒNG HÀNH CÙNG TRẺ EM VÙNG CAO

Hoa Trên Đá mong muốn có thể đến với những điểm trường và những khu vực còn nhiều khó khăn, đặc biệt là nơi trẻ em còn thiếu điều kiện học tập và sinh hoạt. Tùy từng chương trình, CLB sẽ thực hiện:
*   📚 **Trao sách vở và đồ dùng học tập:** Giúp các em có đủ điều kiện tới trường.
*   🎒 **Hỗ trợ những vật dụng cần thiết:** Áo ấm, chăn bông, ủng đi mưa cho học sinh vùng cao.
*   🍚 **Đồng hành cùng bữa ăn dinh dưỡng:** Tiếp sức để các em có bữa cơm đủ chất.
*   🎨 **Tổ chức hoạt động trải nghiệm:** Mang tiếng cười và các sân chơi bổ ích tới điểm trường.

![Niềm vui tới trường của trẻ em vùng cao](/images/bai3_3.webp)

---

### 2. 🤍 ĐỒNG HÀNH CÙNG NHỮNG HOÀN CẢNH KHÓ KHĂN

Không phải sự giúp đỡ nào cũng cần bắt đầu bằng một chương trình lớn. Đôi khi đó có thể là:
*   🏠 Một gia đình đang cần được tiếp sức sửa sang lại mái nhà.
*   🩹 Một bệnh nhân nghèo đang trải qua giai đoạn khó khăn ngặt nghèo.
*   ⛈️ Hay một cộng đồng vừa chịu ảnh hưởng bởi thiên tai, bão lũ.

Hoa Trên Đá luôn tìm hiểu nhu cầu thực tế trước khi triển khai hoạt động để đảm bảo nguồn lực được trao đi đúng người, đúng mục đích.

![Hoạt động thăm hỏi và động viên](/images/bai3_4.webp)

---

### 3. 🩸 HOẠT ĐỘNG XÃ HỘI VÌ CỘNG ĐỒNG

Bên cạnh những chuyến đi xa, CLB hướng tới việc đồng hành bền bỉ với các hoạt động xã hội như:
*   💉 *Hiến máu tình nguyện cứu người.*
*   🌳 *Hoạt động bảo vệ môi trường, dọn rác bãi biển.*
*   🛡️ *Tuyên truyền và lan tỏa lối sống tích cực, có trách nhiệm xã hội trong giới trẻ.*

![Tình nguyện viên tham gia hoạt động thực địa](/images/bai3_5.webp)

---

### 🤝 MINH BẠCH VÀ TRÁCH NHIỆM

Mỗi sự đồng hành đều đáng được trân trọng. Vì vậy, Hoa Trên Đá cam kết công khai rõ ràng:
1.  🎯 **Mục tiêu rõ ràng** của từng chiến dịch.
2.  📦 **Nguồn lực tiếp nhận** (công khai danh sách đóng góp thời gian thực).
3.  📊 **Kết quả thu - chi** minh bạch trên website câu lạc bộ.

Bởi với chúng mình: **Sự tử tế cần lòng tin, và lòng tin cần được xây dựng bằng trách nhiệm.**

---

🌸 **TỪ ĐÁ NỞ HOA – TỪ TÂM LAN TỎA**  
📞 Hotline: **0379 163 913**  
✉️ Email: **hoatrendaclb@gmail.com**`;

async function enrichStories() {
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

  console.log("Updating Story 2 with rich content...");
  const { error: error2 } = await supabase
    .from("stories")
    .update({ content: richContentBai2 })
    .eq("slug", "truoc-khi-co-hoa-tren-da-chung-minh-da-di-qua-nhung-hanh-trinh-nao");

  if (error2) {
    console.error("Error updating story 2:", error2);
  } else {
    console.log("Story 2 updated successfully!");
  }

  console.log("Updating Story 3 with rich content...");
  const { error: error3 } = await supabase
    .from("stories")
    .update({ content: richContentBai3 })
    .eq("slug", "hoa-tren-da-se-lam-gi");

  if (error3) {
    console.error("Error updating story 3:", error3);
  } else {
    console.log("Story 3 updated successfully!");
  }

  console.log("All story updates completed!");
}

enrichStories();
