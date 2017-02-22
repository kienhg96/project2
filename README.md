## Đề tài: Xây dựng hệ thống trang web đăng bán đồ cũ.


**Mô tả chung**: Hệ thống cho phép người dùng đăng ký tài khoản. Người dùng có thể đăng bán món đồ mà mình mong muốn bán.


**Chức năng chính**

-	Người dùng có thể đăng món hàng muốn bán (có thể đăng nhập hoặc không đăng nhập). Đối với người dùng đã đăng nhập có thể xem danh sách những món hàng mà do chính người đó đã đăng đang rao bán. 
-	Đối với người dùng chưa đăng nhập có thể đăng món hàng và sẽ nhận được một “secret key” để quản lý món hàng đã đăng đó. 
-	Người dùng có thể gỡ món hàng đã đăng xuống, hoặc xác nhận món hàng đã được bán.
-	Các món hàng được phân loại theo: loại hình sản phẩm, tỉnh thành nơi người đăng rao bán.
-	Có chức năng báo cáo sai phạm đối với những bài đăng không hợp lệ.
-	Có chức năng dành cho Admin quản lý để có thể xóa những bài đăng không hợp lệ, khóa tài khoản của người dùng có hành vi đăng bài không hợp lệ.
-	Hệ thống tự xóa những món hàng đã quá một thời hạn nhất định.

**Công nghệ sử dụng chính**

-	Backend: Nodejs, Mysql, …
-	Frontend: React, Redux, jQuery, …


**Setting up**

After cloning project, make copy of `.env-sample` and rename it to `.env`

**Run App**

Start server: 
`npm start`

Start client: `npm run client`