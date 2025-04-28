const videoList = document.getElementById('video-list');

// 示例 10个视频
const videos = Array.from({ length: 50 }, (_, i) => ({
  src: `https://www.w3schools.com/html/mov_bbb.mp4`,
  id: `video-${i}`
}));

// 创建占位容器
videos.forEach(video => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('video-container');
  wrapper.innerHTML = `
    <video id="${video.id}" controls preload="none" poster="https://via.placeholder.com/600x400?text=Loading..." playsinline>
    </video>
  `;
  videoList.appendChild(wrapper);
});

// 懒加载和 Plyr 初始化
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const videoEl = entry.target;

      console.log(`Video ${videoEl.id} 进入视口，开始加载...`)

      if (!videoEl.src) {
        const idx = parseInt(videoEl.id.split('-')[1], 10);
        videoEl.src = videos[idx].src;
        videoEl.load();

        // 初始化 Plyr
        const player = new Plyr(videoEl, {
          autoplay: false,
          muted: false
        });

        // 监听播放结束，清理资源
        player.on('ended', () => {
          console.log(`Video ${videoEl.id} ended, releasing memory.`);
          player.destroy();  // 销毁 Plyr实例
          videoEl.removeAttribute('src');
          videoEl.load();
        });
      }
    }
  });
}, {
  threshold: 0.25
});

// 监听所有 video 元素
document.querySelectorAll('video').forEach(video => {
  observer.observe(video);
});