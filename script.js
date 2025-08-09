document.addEventListener('DOMContentLoaded', () => {
    const choicesContainer = document.getElementById('choicesContainer');
    const resultMessage = document.getElementById('resultMessage');
    const errorText = document.querySelector('.error-text');
    const successText = document.querySelector('.success-text');
    const floatingElementsContainer = document.getElementById('floatingElementsContainer');

    const numChoices = 5;
    const correctIndex = Math.floor(Math.random() * numChoices);

    // อาร์เรย์เก็บชื่อไฟล์รูปภาพ
    const images = ['/image/image1.png', './image/image2.png', './image/image3.png'];
    const numImages = 65; // จำนวนรูปภาพที่ต้องการให้ลอย

    // ฟังก์ชันสำหรับสร้างรูปภาพลอย
    function createFloatingImage(imageSrc) {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.classList.add('floating-image');

        // สุ่มตำแหน่งเริ่มต้น
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        imgElement.style.left = `${startX}px`;
        imgElement.style.top = `${startY}px`;

        // สุ่มขนาด (เล็กน้อย)
        const scale = 0.8 + Math.random() * 0.4;
        imgElement.style.transform = `scale(${scale})`;

        // สุ่มความเร็วในการเคลื่อนที่ (ช้าเร็วต่างกัน)
        const duration = 10 + Math.random() * 10;
        imgElement.style.animationDuration = `${duration}s`;

        floatingElementsContainer.appendChild(imgElement);
    }

    // สร้างรูปภาพลอยจำนวนมาก
    for (let i = 0; i < numImages; i++) {
        // สุ่มเลือกรูปภาพจากอาร์เรย์
        const randomImage = images[Math.floor(Math.random() * images.length)];
        createFloatingImage(randomImage);
    }

    // สร้างปุ่ม 30 ปุ่ม
    for (let i = 0; i < numChoices; i++) {
        const button = document.createElement('button');
        button.innerText = `ปุ่มที่ ${i + 1}`;
        button.classList.add('choice-btn');
        if (i === correctIndex) {
            button.classList.add('correct-choice');
        }
        choicesContainer.appendChild(button);
    }

    const choiceBtns = document.querySelectorAll('.choice-btn');

    choiceBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('correct-choice')) {
                choicesContainer.classList.add('hidden');
                resultMessage.classList.add('visible');
                successText.innerHTML = `
                    <p>ในที่สุดก็กดถูกนะ...ใช้เวลาไปนานไหม?</p>
                    <p>ของขวัญคือ...คำอวยพรไง!</p>
                    <p>ขอให้มึงรวยๆ หล่อๆ สวยๆ (ถ้าเป็นไปได้) และอย่าเพิ่งตายไวแล้วกัน</p>
                    <p>ด้วยรัก (แต่ไม่มาก)...จากเพื่อนสุดที่รัก</p>
                `;
            } else {
                errorText.innerText = 'ผิดแล้วคร้าบบบ';
                resultMessage.classList.add('visible');
                
                setTimeout(() => {
                    resultMessage.classList.remove('visible');
                    errorText.innerText = '';
                }, 2000);
            }
        });
    });
});