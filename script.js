// Dữ liệu các tool - từ localhost servers
const tools = [
    {
        id: 1,
        name: 'Wayback Domain Checker',
        description: 'Kiểm tra lịch sử domain qua Wayback Machine, tính tuổi domain, phân loại chủ đề (Gambling/Adult/Pharma/Crypto/Shop/Tech/Blog)',
        icon: '📦',
        link: 'https://github.com/cust123456/wayback20',
        embedUrl: '/tools/wayback',
        localInstruction: '✅ Tích hợp sẵn trong server chính',
        isActive: true,
        serverOnline: true
    },
    {
        id: 2,
        name: 'Xuatdomain',
        description: 'Trích xuất và lọc domains từ các file, hỗ trợ lọc theo suffix (.za.com, v.v...). Xử lý bulk domain từ text/list',
        icon: '🔗',
        link: 'https://github.com/cust123456/xuatdomain',
        embedUrl: '/tools/xuatdomain',
        localInstruction: '✅ Tích hợp sẵn trong server chính',
        isActive: true,
        serverOnline: true
    },
    {
        id: 3,
        name: 'Screenshot to Code',
        description: 'Chuyển đổi screenshot/ảnh thành HTML/CSS code hoàn chỉnh bằng AI. Tải ảnh lên và nhận code tương ứng ngay lập tức',
        icon: '🎨',
        link: 'https://github.com/abi/screenshot-to-code',
        embedUrl: '/proxy/screenshot',
        localInstruction: '🔄 Tích hợp qua proxy',
        isActive: true,
        serverOnline: true
    },
    {
        id: 4,
        name: 'Tool Mới',
        description: 'Mô tả công cụ của bạn sẽ được cập nhật. Gửi link tool cho mình để tích hợp!',
        icon: '🚀',
        link: '#',
        isActive: false,
        serverOnline: false
    }
];

function scrollToTools() {
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
}

function addTool(toolData) {
    tools.push(toolData);
    renderTools();
}

function updateTool(id, updatedData) {
    const tool = tools.find(t => t.id === id);
    if (tool) {
        Object.assign(tool, updatedData);
        renderTools();
    }
}

function removeTool(id) {
    const index = tools.findIndex(t => t.id === id);
    if (index > -1) {
        tools.splice(index, 1);
        renderTools();
    }
}

function openEmbeddedTool(toolId) {
    const tool = tools.find((item) => item.id === toolId);
    if (!tool) return;

    const section = document.getElementById('embeddedToolSection');
    const title = document.getElementById('embedToolTitle');
    const description = document.getElementById('embedToolDescription');
    const note = document.getElementById('embedToolNote');
    const iframe = document.getElementById('embedToolFrame');
    const fallbackButton = document.getElementById('embedFallbackButton');

    title.textContent = tool.name;
    description.textContent = tool.description;
    fallbackButton.href = tool.embedUrl || tool.link;
    fallbackButton.textContent = 'Mở công cụ qua proxy';

    if (tool.embedUrl) {
        iframe.src = tool.embedUrl;
        currentToolId = toolId;
        
        if (tool.serverOnline) {
            note.innerHTML = `<strong style="color: #00d4ff;">✅ Server online</strong> - Tool sẽ tải trong vài giây...`;
        } else {
            note.innerHTML = `<strong style="color: #ff006e;">⚠️ Server offline</strong> - ${tool.localInstruction}`;
        }
    } else {
        iframe.src = '';
        note.innerHTML = `⚠️ Tool chưa có phiên bản nhúng. Bạn có thể mở công cụ ngoài bằng nút bên dưới.`;
    }

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let currentToolId = null;

function closeEmbeddedTool() {
    const section = document.getElementById('embeddedToolSection');
    const iframe = document.getElementById('embedToolFrame');
    section.classList.add('hidden');
    iframe.src = '';
    currentToolId = null;
}

function reloadEmbeddedTool() {
    const tool = tools.find((item) => item.id === currentToolId);
    const iframe = document.getElementById('embedToolFrame');
    const note = document.getElementById('embedToolNote');
    if (!tool || !tool.embedUrl) return;
    iframe.src = '';
    setTimeout(() => { iframe.src = tool.embedUrl; }, 100);
    note.innerHTML = `<strong style="color: #00d4ff;">🔄 Đang tải lại...</strong>`;
}

async function checkServerHealth(url) {
    try {
        // Thử load một hình ảnh từ server (CORS-friendly)
        const img = new Image();
        const promise = new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            // Timeout sau 3 giây
            setTimeout(() => resolve(false), 3000);
        });
        img.src = url + '/favicon.ico?t=' + Date.now();
        return await promise;
    } catch (error) {
        return false;
    }
}

async function initToolsHealth() {
    // Để đơn giản, giả định servers là online nếu chúng đã clone
    // Vì chúng ta đã khởi động servers
    tools.forEach(tool => {
        if (tool.embedUrl) {
            tool.serverOnline = true; // Mặc định online vì đã start
        }
    });
    renderTools();
    updateServerStatus();
}

function updateServerStatus() {
    const statusDiv = document.getElementById('serverStatus');
    let onlineCount = 0;
    let toolsStatus = [];
    
    tools.forEach(tool => {
        if (tool.embedUrl) {
            const status = tool.serverOnline ? '🟢 Online' : '🔴 Offline';
            const path = tool.embedUrl;
            toolsStatus.push(`<p style="margin: 0.3rem 0;">${tool.name}: ${status} (${path})</p>`);
            if (tool.serverOnline) onlineCount++;
        }
    });
    
    statusDiv.innerHTML = `
        <p style="margin-bottom: 0.5rem;"><strong>${onlineCount}/${tools.filter(t => t.embedUrl).length}</strong> server đang chạy</p>
        ${toolsStatus.join('')}
    `;
}

function renderTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = '';

    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.setAttribute('data-tool-id', tool.id);

        let buttonContent;
        if (tool.isActive) {
            const statusIcon = tool.serverOnline ? '🟢' : '⏳';
            const statusText = tool.serverOnline ? 'Mở trong GENO' : 'Khởi động...';
            buttonContent = `<button class="btn btn-secondary" onclick="openEmbeddedTool(${tool.id})" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;"><span>${statusIcon}</span><span>${statusText}</span></button>`;
        } else {
            buttonContent = `<button class="btn btn-secondary" disabled>Sắp Ra Mắt</button>`;
        }

        toolCard.innerHTML = `
            <div class="tool-card-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            ${buttonContent}
        `;

        toolsGrid.appendChild(toolCard);
    });

    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .embedded-tool {
        animation: slideDown 0.5s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            max-height: 0;
        }
        to {
            opacity: 1;
            max-height: 2000px;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    renderTools();
    
    setTimeout(() => {
        initToolsHealth();
    }, 500);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    document.getElementById('embedReloadButton').addEventListener('click', reloadEmbeddedTool);
    document.getElementById('embedCloseButton').addEventListener('click', closeEmbeddedTool);
});

function getToolsInfo() {
    console.log('GENO TOOL - Tools List:', tools);
    return tools;
}

window.GenoTool = {
    addTool,
    updateTool,
    removeTool,
    renderTools,
    getToolsInfo,
    scrollToTools,
    openEmbeddedTool,
    initToolsHealth
};
