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

const storiesData = [
  {
    title: "VÌ SAO CHÚNG MÌNH MANG TÊN “HOA TRÊN ĐÁ”?",
    slug: "vi-sao-chung-minh-mang-ten-hoa-tren-da",
    excerpt: "Câu chuyện ý nghĩa đằng sau cái tên Hoa Trên Đá và ngọn lửa thiện nguyện được nhen nhóm qua từng hành trình đầy thử thách.",
    content: `Có những cái tên được nghĩ ra trong một buổi họp.
But cũng có những cái tên phải đi qua rất nhiều hành trình mới tìm được nơi để thuộc về.
“Hoa Trên Đá” là một cái tên như thế.

Nhiều năm trước, anh Đoàn Xuân Lộc có duyên kết nối và đồng hành cùng một câu lạc bộ thiện nguyện. Ở đó có một tinh thần rất đặc biệt: muốn kêu gọi sự sẻ chia, trước hết chính mình cũng phải hành động.
Thay vì chỉ đứng lên kêu gọi, anh chị ở đó đã chọn những hành trình bằng chính sức mình.
Có những chuyến đi bằng xe đạp.
Có những hành trình đi bộ đường dài.
Có những ngày rong ruổi trên đường chỉ với một mong muốn rất giản dị: làm một điều gì đó để góp thêm nguồn lực cho những chuyến thiện nguyện tiếp theo.

Và rồi trong một lần như thế, một ý tưởng xuất hiện: Mang những viên đá về, cùng nhau vẽ lên chúng, rồi bán đấu giá để gây quỹ cho các chương trình thiện nguyện. Những viên đá vốn khô cứng, vô tri, qua bàn tay và tấm lòng của mọi người lại trở thành những món đồ mang theo câu chuyện, màu sắc và hy vọng.
Có lẽ từ đó, cái tên “Hoa Trên Đá” đã mang một ý nghĩa đặc biệt.

Hoa là sự sống, là hy vọng, là những điều tốt đẹp.
Đá là những khó khăn, thử thách và những hoàn cảnh không phải lúc nào cũng thuận lợi.
Một bông hoa có thể nở trên đá cũng giống như một điều tử tế vẫn có thể được sinh ra giữa những hoàn cảnh khó khăn nhất.

Đến năm 2026, anh Đoàn Xuân Lộc cùng những người đồng đội quyết định đi xa hơn một chuyến thiện nguyện, xa hơn một hoạt động ngắn ngày. Mọi người muốn xây dựng một cộng đồng tình nguyện lâu dài, bền chặt, nơi những người cùng chung tinh thần có thể gặp nhau, cùng hành động và cùng đi qua nhiều hành trình hơn nữa.
Và cái tên Hoa Trên Đá một lần nữa được lựa chọn.

Lần này, nó trở thành tên của: CÂU LẠC BỘ THIỆN NGUYỆN HOA TRÊN ĐÁ.
Chúng mình chọn câu: “Từ đá nở hoa – Từ tâm lan tỏa.”
Bởi chúng mình tin rằng: Từ những nơi khó khăn nhất vẫn có thể nở ra những điều đẹp đẽ. Và từ một tấm lòng chân thành, sự tử tế có thể tiếp tục được truyền từ người này sang người khác.

Hành trình của Hoa Trên Đá bắt đầu như vậy. Không phải từ một cái tên. Mà từ rất nhiều bước chân, rất nhiều hành động và một niềm tin đã được nuôi dưỡng qua năm tháng.
Từ đá nở hoa – Từ tâm lan tỏa.`,
    cover_image: "/images/bai1_anh1.webp",
    author_name: "Đoàn Xuân Lộc",
    story_type: "Góc nhìn thành viên",
    category_id: "a2222222-2222-2222-2222-222222222222",
    featured: true,
    status: "published",
  },
  {
    title: "🌸 TRƯỚC KHI CÓ HOA TRÊN ĐÁ, CHÚNG MÌNH ĐÃ ĐI QUA NHỮNG HÀNH TRÌNH NÀO?",
    slug: "truoc-khi-co-hoa-tren-da-chung-minh-da-di-qua-nhung-hanh-trinh-nao",
    excerpt: "Hành trình nỗ lực của tập thể những con người sẵn sàng cống hiến cho cộng đồng và bước chuyển mình ý nghĩa từ năm 2026.",
    content: `Câu lạc bộ Thiện nguyện Hoa Trên Đá chính thức mang tên mình từ năm 2026.
Nhưng hành trình của những con người trong tập thể này không bắt đầu từ năm 2026.

Trước đó, nhiều thành viên đã có thời gian cùng hoạt động trong CLB Ngân hàng Máu sống Quế Xuân 2, đơn vị trực thuộc Mạng lưới Tình nguyện Quốc gia khu vực Miền Trung.
Từ những hoạt động hiến máu, hỗ trợ cộng đồng, kết nối tình nguyện viên đến những chương trình sẻ chia dành cho các hoàn cảnh khó khăn, từng chuyến đi đã giúp mọi người hiểu rõ hơn rằng:
- Thiện nguyện không chỉ là trao đi một món quà.
- Đó còn là trách nhiệm với những gì mình đã nhận.
- Là việc tìm hiểu trước khi giúp đỡ.
- Là đến đúng nơi. Làm đúng điều cần thiết.
- Và quan trọng hơn cả, là đủ bền bỉ để không chỉ xuất hiện một lần rồi biến mất.

Qua nhiều năm đồng hành cùng các hoạt động cộng đồng, những người trong nhóm ngày càng nhận ra rằng cần có một nơi để kết nối lâu dài hơn.
Một tập thể có định hướng. Có trách nhiệm. Có những nguyên tắc chung. Và có thể tiếp tục phát triển qua nhiều thế hệ thành viên.
Sau những thay đổi về tổ chức và quá trình sắp xếp lại hoạt động, nhóm bước sang một hành trình mới.

Năm 2026, Câu lạc bộ Thiện nguyện Hoa Trên Đá được thành lập, với anh Đoàn Xuân Lộc là người phụ trách dẫn dắt tập thể trong giai đoạn đầu.
Nhưng Hoa Trên Đá không được tạo nên bởi một cá nhân. Hoa Trên Đá được tạo nên bởi những con người sẵn sàng cùng làm:
- Người có sức góp sức.
- Người có thời gian góp thời gian.
- Người có chuyên môn góp chuyên môn.
- Người có nguồn lực góp nguồn lực.
- Và đôi khi, chỉ cần một người sẵn lòng chia sẻ câu chuyện để thêm một người khác biết đến một hoàn cảnh cần giúp đỡ.

Chúng mình muốn xây dựng Hoa Trên Đá thành một cộng đồng nơi mỗi thành viên có thể:
1. Làm những việc có ích cho xã hội.
2. Học cách sống trách nhiệm hơn.
3. Rèn luyện kỹ năng qua những hoạt động thực tế.
4. Gặp gỡ những người cùng chung giá trị.
5. Và cùng nhau tạo nên những chương trình có thể đi được đường dài.

Chúng mình vẫn đang ở những ngày đầu của một cái tên mới. Nhưng phía sau cái tên ấy là những con người đã có những hành trình từ trước đó. Và phía trước, sẽ còn rất nhiều hành trình đang chờ.
CÂU LẠC BỘ THIỆN NGUYỆN HOA TRÊN ĐÁ.
Từ đá nở hoa – Từ tâm lan tỏa.`,
    cover_image: "/images/bai2_1.webp",
    author_name: "Ban Điều Hành",
    story_type: "Nhật ký hành trình",
    category_id: "a1111111-1111-1111-1111-111111111111",
    featured: true,
    status: "published",
  },
  {
    title: "🌸 HOA TRÊN ĐÁ SẼ LÀM GÌ?",
    slug: "hoa-tren-da-se-lam-gi",
    excerpt: "Tìm hiểu định hướng hoạt động thực tế, cam kết minh bạch và các chương trình sẻ chia của Câu lạc bộ Thiện nguyện Hoa Trên Đá.",
    content: `Một câu lạc bộ thiện nguyện không được định nghĩa bằng những điều mình nói. Mà bằng những điều mình thực sự làm được cho cộng đồng.
Đó cũng là cách mà Câu lạc bộ Thiện nguyện Hoa Trên Đá muốn bước đi trong chặng đường sắp tới. Chúng mình không đặt mục tiêu làm những điều thật lớn ngay từ ngày đầu tiên. Chúng mình muốn bắt đầu bằng những việc thiết thực, có trách nhiệm và phù hợp với nhu cầu thực tế của từng nơi.

1. ĐỒNG HÀNH CÙNG TRẺ EM
Hoa Trên Đá mong muốn có thể đến với những điểm trường và những khu vực còn nhiều khó khăn, đặc biệt là nơi trẻ em còn thiếu điều kiện học tập và sinh hoạt. Tùy từng chương trình, CLB có thể thực hiện:
- Trao sách vở và đồ dùng học tập.
- Hỗ trợ những vật dụng cần thiết cho học sinh.
- Đồng hành cùng các chương trình bữa ăn và dinh dưỡng.
- Trao những phần quà phù hợp với hoàn cảnh thực tế.
- Tổ chức vui chơi, giao lưu và những hoạt động trải nghiệm dành cho các em.

2. ĐỒNG HÀNH CÙNG NHỮNG HOÀN CẢNH KHÓ KHĂN
Không phải sự giúp đỡ nào cũng cần bắt đầu bằng một chương trình lớn. Đôi khi đó có thể là một gia đình đang cần được tiếp sức. Một người đang trải qua giai đoạn khó khăn. Hay một cộng đồng vừa gặp thiên tai, biến cố hoặc thiếu thốn những nhu yếu phẩm thiết yếu.
Hoa Trên Đá sẽ cố gắng tìm hiểu nhu cầu thực tế trước khi triển khai từng hoạt động, để mỗi nguồn lực được trao đi đúng nơi và đúng mục đích.

3. THAM GIA CÁC HOẠT ĐỘNG VÌ CỘNG ĐỒNG
Bên cạnh những chuyến thiện nguyện, CLB hướng tới việc tiếp tục đồng hành với các hoạt động xã hội như:
- Hiến máu tình nguyện.
- Hoạt động bảo vệ môi trường.
- Các chương trình vì trẻ em.
- Hỗ trợ cộng đồng khi có nhu cầu thiết thực.
- Những hoạt động lan tỏa lối sống tích cực và trách nhiệm xã hội.

4. XÂY DỰNG MỘT CỘNG ĐỒNG TÌNH NGUYỆN BỀN VỮNG
Hoa Trên Đá không chỉ muốn tổ chức các chuyến đi. Chúng mình còn muốn xây dựng một môi trường để mỗi thành viên có cơ hội trưởng thành. Ở đó, mọi người có thể học cách làm việc cùng nhau, lập kế hoạch cho một chương trình cộng đồng, giao tiếp và kết nối, hiểu hơn về trách nhiệm xã hội, và biến lòng tốt thành những hành động có ích.

5. MINH BẠCH TRONG TỪNG HÀNH TRÌNH
Mỗi sự đồng hành đều đáng được trân trọng. Vì vậy, Hoa Trên Đá hướng tới việc công khai và cập nhật rõ ràng đối với các chương trình có tiếp nhận sự đóng góp:
- Mục tiêu của chương trình.
- Nguồn lực tiếp nhận.
- Quá trình thực hiện.
- Kết quả sau chương trình.
- Các thông tin thu – chi phù hợp với từng hoạt động.
Bởi với chúng mình: Sự tử tế cần lòng tin. Và lòng tin cần được xây dựng bằng trách nhiệm.

BẠN CÓ THỂ ĐỒNG HÀNH VỚI HOA TRÊN ĐÁ BẰNG NHIỀU CÁCH:
Không nhất thiết phải là tiền. Bạn có thể trở thành tình nguyện viên, đồng hành bằng hiện vật, góp một kỹ năng hoặc chuyên môn, kết nối CLB với một hoàn cảnh khó khăn, hoặc đơn giản là chia sẻ một chương trình để câu chuyện đến được với nhiều người hơn.

Có những điều lớn lao được bắt đầu bằng những hành động rất nhỏ. Và chúng mình hy vọng Hoa Trên Đá sẽ là nơi những hành động nhỏ ấy được kết nối, vun đắp và tiếp tục lan tỏa.
TỪ ĐÁ NỞ HOA – TỪ TÂM LAN TỎA.
Điện thoại: 0379 163 913
Email: hoatrendaclb@gmail.com`,
    cover_image: "/images/bai3_1.webp",
    author_name: "Nguyễn Quang Hiếu",
    story_type: "Tin tức hoạt động",
    category_id: "a3333333-3333-3333-3333-333333333333",
    featured: true,
    status: "published",
  },
];

async function insertStories() {
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

  console.log("Inserting new stories...");
  const { error: insError } = await supabase
    .from("stories")
    .insert(storiesData);

  if (insError) {
    console.error("Error inserting stories:", insError);
    process.exit(1);
  }

  console.log("Stories inserted successfully!");
}

insertStories();
