window,
  addEventListener('DOMContentLoaded', () => {
    const imageSources = [
      { src: '../assets/images/sample04.png', caption: '絵紗子' },
      { src: '../assets/images/sample08.png', caption: '聖女' },
      { src: '../assets/images/sample09.png', caption: '散歩' },
      { src: '../assets/images/sample10.png', caption: '雪玉' },
      { src: '../assets/images/sample11.png', caption: '卓球' },
      { src: '../assets/images/sample12.png', caption: '試合' },
      { src: '../assets/images/sample13.png', caption: '乗馬' },
      { src: '../assets/images/ai_01.png', caption: '' },
      { src: '../assets/images/sayuri.png', caption: '' },
      { src: '../assets/images/akane.png', caption: '' },
      { src: '../assets/images/rey01.png', caption: '' },
    ];
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('close');
    const clickOffSound = document.getElementById('click-off');

    const imageUrlInput = document.getElementById('image-url');

    imageSources.forEach(item => {
      const container = document.createElement('div');
      container.className = 'image-block';

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption;
      img.style.cursor = 'pointer';

      const clickSound = document.getElementById('click-sound');
      const clickOffSound = document.getElementById('click-off');
      // クリックでモーダル表示
      img.addEventListener('click', () => {
        if (item.src) {
          clickSound.currentTime = 0;
          clickSound.play();
          modalImg.src = item.src;
          modal.classList.remove('hidden');
        }
      });

      function openModal(imageSrc) {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');
        modalImg.src = imageSrc;
        modal.classList.add('show');
      }

      const caption = document.createElement('div');
      caption.className = 'caption';
      caption.textContent = item.caption;

      container.appendChild(img);
      container.appendChild(caption);
      gallery.appendChild(container);
    });

    // モーダル閉じるボタン
    closeBtn.addEventListener('click', () => {
      clickOffSound.currentTime = 0;
      clickOffSound.play().catch(error => {
        console.error('Error playing sound:', error);
      });
      modal.classList.add('hidden');
    });

    // サイズ切り替え関数
    window.setSize = function (size) {
      gallery.className = 'size-' + size;
    };

    // 画像追加ボタン
    const fileInput = document.getElementById('file-input');
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.classList.add('thumb');
          gallery.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });

    // 画像追加関数
    function addImage(url) {
      const img = document.createElement('img');
      img.src = url;
      img.classList.add('thumb');
      img.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
        modalImg.src = img.src;
        modal.classList.remove('hidden');
        openModal(img.src);
      });
      gallery.appendChild(img);
    }
  });
