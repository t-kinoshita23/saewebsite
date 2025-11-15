window,
  addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery'); // ギャラリーの親要素を取得
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('close');
    const clickOffSound = document.getElementById('click-off');

    // 配列を順番に処理
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

      // キャプション要素
      const caption = document.createElement('caption');
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
  });
