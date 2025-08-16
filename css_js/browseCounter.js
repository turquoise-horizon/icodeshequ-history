// ��ȡ�����������ҳ����ʾ
async function updateBrowseCount() {
    try {
        const incrementResponse = await fetch('https://icodeshequ.youdao.com/api/works/detail?id=674323677f004a8a94f18836d1e0ae19', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });

        const response = await fetch('https://icodeshequ.youdao.com/api/works/detail?id=674323677f004a8a94f18836d1e0ae19');
        const data = await response.json();
        const browseNum = data.data.browseNum;
        
        // ���һ򴴽���ʾ�������Ԫ��
        let counterElement = document.getElementById('browse-counter');
        if (!counterElement) {
            counterElement = document.createElement('strong');
            counterElement.id = 'browse-counter';
            document.body.appendChild(counterElement);
        }
        
        counterElement.textContent = `${browseNum}`;
    } catch (error) {
        console.error('��ȡ�����ʧ�ܣ�', error);
    }
}

// ҳ�����ʱִ��
document.addEventListener('DOMContentLoaded', updateBrowseCount);
