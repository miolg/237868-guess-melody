export default (audio, autoplay) => `
  <div class="player-wrapper">
    <div class="player">
      <audio src=${audio.src} ${autoplay ? `autoplay` : ``}></audio>
      <button class="player-control player-control--play"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;
