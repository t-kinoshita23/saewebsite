window,
  addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery'); // ギャラリーの親要素を取得
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('close'); // 閉じるボタン
    const clickOffSound = document.getElementById('click-off'); // 閉じるの×ボタン
    const prevBtn = document.getElementById('prev-btn'); // ←左ボタン
    const nextBtn = document.getElementById('next-btn'); // ←右ボタン

    // 配列を順番に処理
    imageSources.forEach(item => {
      const container = document.createElement('div');
      container.className = 'image-block';

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption;
      img.style.cursor = 'pointer';

      const clickSound = document.getElementById('click-sound');
      const leftrightSound = document.getElementById('left-right');

      let currentIndex = 0;

      // クリックでモーダル表示
      img.addEventListener('click', () => {
        if (item.src) {
          clickSound.currentTime = 0;
          clickSound.play();
          currentIndex = imageSources.indexOf(item); // クリックした画像の位置を記録
          showModal(currentIndex);
        }
      });

      // モーダル表示用関数
      function showModal(index) {
        modalImg.src = imageSources[index].src;
        modal.classList.remove('hidden');
      }

      // 左右ボタンのイベント
      prevBtn.addEventListener('click', () => {
        currentIndex =
          (currentIndex - 1 + imageSources.length) % imageSources.length;
        showModal(currentIndex);

        // 左右ボタンの効果音
        leftrightSound.currentTime = 0; // 毎回頭から再生
        leftrightSound.play();
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageSources.length;
        showModal(currentIndex);

        // 左右ボタンの効果音
        leftrightSound.currentTime = 0; // 毎回頭から再生
        leftrightSound.play();
      });

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
      // 閉じるボタンの効果音
      clickOffSound.currentTime = 0;
      clickOffSound.play();
      modal.classList.add('hidden');
    });

    // サイズ切り替え関数
    window.setSize = function (size) {
      gallery.className = 'size-' + size;
    };
  });
