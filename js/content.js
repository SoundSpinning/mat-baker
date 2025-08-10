// 
// Read and add to HTML all media via `contents.json` file
// 

// Remember to set imgix path correctly to serve images online.
// It may need a specific sub-folder name from the `Assets` GitHub repo.
var imgix_path = "";
// var imgix_path = "https://sound-spinning-pics.imgix.net/<folder_name>/";

// imgix settings, appended after image filename. CHECK: width value `w=` is right.
var imgix_ops = "";
// var imgix_ops = "?w=800&auto=compress,enhance,format";

// START parsing JSON file
async function loadContent() {
  try {
    const response = await fetch('js/content.json');
    const data = await response.json();
    // get content holders in HTML
    const car_3d = document.querySelector('.carousel-3d-track');
    const dataImgs = data.images;
    // 1.- Append images to HTML
    for (const img of dataImgs) {
      car_3d.innerHTML +=
`                               <!-- IMG-${img.imgId} -->
                                <div class="carousel-item">
                                    <img src="${imgix_path}${img.file}${imgix_ops}" alt="${img.alt}" loading="lazy">
                                    <div class="carousel-caption">${img.info}</div>
                                </div>`
    }

    const vid_grid = document.querySelector('.video-grid');
    const dataVids = data.videos;
    // 1.- Append videos to HTML
    for (const vid of dataVids) {
      vid_grid.innerHTML +=
`               <!-- VID-${vid.Id} -->
                <div class="video-item">
                    <div class="video-thumb" 
                         data-youtube-id="${vid.ytId}" 
                         style="background-image: url(https://img.youtube.com/vi/${vid.ytId}/hqdefault.jpg)">
                        <button class="play-button" aria-label="Play video">
                            <i class="bi bi-play-circle-fill"></i>
                        </button>
                    </div>
                    <p><i class="bi bi-film"> </i>${vid.info}</p>
                </div>`
    }

    const audio_grid = document.querySelector('.audio-player');
    const dataSongs = data.songs;
    // 1.- Append videos to HTML
    for (const song of dataSongs) {
      audio_grid.innerHTML +=
`               <!-- SONG-${song.Id} -->
                    <div class="audio-item">
                        <p><i class="bi bi-soundwave"> </i>${song.info}</p>
                        <audio controls>
                            <source src="${song.file}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </div>`
    }

    // Initialise carousels AFTER DOM is ready
    initCarousels();
    initVideo();
    initAudio();
    initModals();
  } catch (error) {
    console.error('Error loading media data:', error);
    document.getElementById('carousel-fallback').style.display = 'block';
  }
}
// console.log("Got Here#1");
