# 🚀 GENO TOOL - Creative Solutions Platform

Một nền tảng hiện đại và tương lai để lưu trữ và hiển thị các công cụ sáng tạo của bạn.

## 📋 Cấu trúc File

```
Webtool/
├── index.html      # File HTML chính
├── styles.css      # Tệp CSS với thiết kế hiện đại
├── script.js       # JavaScript để quản lý tool
└── README.md       # File này
```

## ✨ Tính Năng

- 🎨 **Giao diện hiện đại & tương lai** - Thiết kế gradient, animation mượt mà
- ⚡ **Hiệu suất cao** - Tải nhanh, hoạt động mượt
- 📱 **Responsive** - Hoạt động tốt trên mọi thiết bị
- 🔧 **Dễ quản lý** - Thêm/xóa tool một cách dễ dàng bằng JavaScript
- ✅ **Các tính năng xây sẵn** - Header, Hero section, Features, Footer

## 🛠️ Cách Thêm Tool Mới

### Cách 1: Chỉnh sửa JavaScript trực tiếp

Mở file `script.js` và tìm đến phần `const tools = [...]`

**Thêm tool mới:**
```javascript
{
    id: 4,
    name: 'Tên Tool Của Bạn',
    description: 'Mô tả công cụ',
    icon: '🎯',  // Emoji hoặc icon
    link: 'https://link-cua-tool-cua-ban.com',
    isActive: true  // true = công cụ hoạt động, false = sắp ra mắt
}
```

### Cách 2: Sử dụng JavaScript Console

Khi trang web đã tải, mở Developer Console (F12) và gõ:

```javascript
GenoTool.addTool({
    id: 5,
    name: 'Tool Mới',
    description: 'Mô tả',
    icon: '🚀',
    link: 'https://example.com',
    isActive: true
});
```

### Cách 3: Cập nhật tool hiện có

```javascript
GenoTool.updateTool(1, {
    name: 'Tên mới',
    description: 'Mô tả mới',
    link: 'https://link-moi.com',
    isActive: true
});
```

## 📚 API Functions

Tất cả hàm được lưu trong object `GenoTool`:

### `GenoTool.addTool(toolData)`
Thêm công cụ mới
```javascript
GenoTool.addTool({
    id: 6,
    name: 'Tool Name',
    description: 'Tool Description',
    icon: '⭐',
    link: 'https://example.com',
    isActive: true
});
```

### `GenoTool.updateTool(id, updatedData)`
Cập nhật tool hiện có
```javascript
GenoTool.updateTool(1, { name: 'New Name', isActive: true });
```

### `GenoTool.removeTool(id)`
Xóa tool
```javascript
GenoTool.removeTool(3);
```

### `GenoTool.renderTools()`
Render lại tất cả tools
```javascript
GenoTool.renderTools();
```

### `GenoTool.getToolsInfo()`
Lấy thông tin tất cả tools
```javascript
const allTools = GenoTool.getToolsInfo();
```

## 🎨 Tùy Chỉnh Màu Sắc

Các màu được định nghĩa ở đầu file `styles.css` dưới `:root`:

```css
:root {
    --primary-color: #00d4ff;        /* Màu xanh sáng */
    --primary-dark: #0099cc;         /* Màu xanh tối */
    --secondary-color: #ff006e;      /* Màu hồng */
    --background-dark: #0a0e27;      /* Nền tối */
    --background-darker: #050812;    /* Nền rất tối */
    --surface: #1a1f3a;              /* Màu bề mặt */
    --text-primary: #ffffff;         /* Văn bản chính */
    --text-secondary: #a0a9c9;       /* Văn bản phụ */
}
```

Chỉ cần thay đổi giá trị HEX để thay đổi toàn bộ theme!

## 🚀 Startup

1. **Mở index.html trong trình duyệt**
   ```
   Nhấn đôi vào index.html hoặc kéo vào trình duyệt
   ```

2. **Sử dụng Live Server (nếu có VS Code)**
   ```
   Chuột phải > Open with Live Server
   ```

3. **Hoặc dùng Python**
   ```bash
   python -m http.server 8000
   # Sau đó mở http://localhost:8000
   ```

## 📝 Ví Dụ Thêm Tool

**Ví dụ: Thêm tool Logo Maker**
```javascript
GenoTool.addTool({
    id: 4,
    name: 'Logo Maker',
    description: 'Tạo logo chuyên nghiệp chỉ trong vài giây',
    icon: '🎨',
    link: 'https://your-logo-maker.com',
    isActive: true
});
```

**Ví dụ: Thêm tool Convert Image**
```javascript
GenoTool.addTool({
    id: 5,
    name: 'Image Converter',
    description: 'Chuyển đổi hình ảnh giữa các định dạng khác nhau',
    icon: '🖼️',
    link: 'https://your-image-converter.com',
    isActive: true
});
```

## 🎯 Tips & Tricks

- 🎨 **Thêm Emoji**: Sử dụng bất kỳ emoji nào bạn thích cho `icon`
- 🔄 **Multiple Tools**: Thêm bao nhiêu tool tùy ý, giao diện sẽ tự động sắp xếp
- ⏰ **Sắp Ra Mắt**: Đặt `isActive: false` để hiển thị nút "Sắp Ra Mắt"
- 🌐 **Link Ngoài**: Các link sẽ mở trong tab mới
- 🎬 **Animation**: Mỗi tool card mới đều có animation fadeInUp

## 📞 Hỗ Trợ

Nếu bạn cần thêm tính năng hoặc có câu hỏi, hãy liên hệ!

---

**Tạo bởi**: Your Name  
**Năm**: 2026  
**Website**: [https://genotool.com](https://genotool.com)

✨ **Hãy tạo nên điều tuyệt vời với GENO TOOL!** ✨
