
// 获取浏览数并更新页面显示
async function updateBrowseCount() {

    // 查找显示浏览数的元素
    let counterElement = document.getElementById('browse-counter');
    if (!counterElement) {
        // 未找到浏览数显示元素
        return;
    }

    // 从元素属性中获取api-url
    let apiUrl = counterElement.getAttribute('api-url');
    if (!apiUrl) {
        console.warn('未设置api-url属性，将使用默认值');
        apiUrl = "https://icodeshequ.youdao.com/api/works/detail?id=674323677f004a8a94f18836d1e0ae19"
    }

    // 从元素属性中获取浏览量偏差修正值deviation-value
    let deviationValue = counterElement.getAttribute('deviation-value');
    if (!deviationValue) {
        console.warn('未设置deviation-value属性，将使用默认值');
        deviationValue = 0
    }

    try {
        for (let i=0; i<2; i++) {

            
            // 获取浏览量
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP错误! 错误状态: ${response.status}`);
            }

            const data = await response.json();
            
            // 修正
            const browseNum = data.data.browseNum - deviationValue;

            // 设置成功状态样式（绿色）
            counterElement.style.color = 'green';
            counterElement.textContent = `${browseNum}`;

        
}
    } catch (error) {
        console.error('获取浏览数失败：', error);
        
        // 设置错误状态样式（红色）
        counterElement.style.color = 'red';
        counterElement.textContent = '加载失败';
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', updateBrowseCount);
