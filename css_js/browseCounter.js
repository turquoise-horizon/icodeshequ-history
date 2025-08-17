// 获取浏览数并更新页面显示
async function updateBrowseCount() {
    // 查找或创建显示浏览数的元素
    let counterElement = document.getElementById('browse-counter');
    if (!counterElement) {
        counterElement = document.createElement('strong');
        counterElement.id = 'browse-counter';
        document.body.appendChild(counterElement);
    }
    
    try {
        
        // 第一个fetch请求没有使用返回值
        await fetch('https://icodeshequ.youdao.com/api/works/detail?id=674323677f004a8a94f18836d1e0ae19', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });

        const response = await fetch('https://icodeshequ.youdao.com/api/works/detail?id=674323677f004a8a94f18836d1e0ae19');
        
        if (!response.ok) {
            throw new Error(`HTTP错误! 错误状态: ${response.status}`);
        }
        
        const data = await response.json();

        // 修正
        const browseNum = data.data.browseNum - 9;

        // 设置成功状态样式（绿色）
        counterElement.style.color = 'green';
        counterElement.textContent = `${browseNum}`;

    } catch (error) {
        console.error('获取浏览数失败：', error);
        
        // 设置错误状态样式（红色）
        counterElement.style.color = 'red';
        counterElement.textContent = '加载失败'; // 直接使用明确的中文字符串
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', updateBrowseCount);
