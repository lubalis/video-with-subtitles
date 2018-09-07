const playerFunctions = (subtitlesArray) => {
    
    const videoPlayer = document.querySelector('video');

    const subtitleDiv = document.querySelector('.text');

    const controlElements = {
        buttonPlay: document.querySelector('.play'),
        buttonStop: document.querySelector('.stop'),
        timeSlider: document.querySelector('.timeSlider'),
        currentTime: document.querySelector('.currentTime'),
        durationTime: document.querySelector('.durationTime'),
        volumeSlider: document.querySelector('.volumeSlider'),
        buttonMute: document.querySelector('.mute'),
        buttonSubtitle: document.querySelector('.subtitle'),
        buttonFullscreen: document.querySelector('.fullscreen'),
    }

    function handleClickPlay () {
        videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
    }

    function handleClickStop () {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        subtitleDiv.innerText = '';
        videoPlayer.subtitleIndex = 0;
    }

    function handleChangeTime () {
        videoPlayer.currentTime = Number(this.value)*videoPlayer.duration/100;
        findNextSubtitleElement();
    }

    function handleChangeVolume () {
        videoPlayer.volume = this.value/100;
    }

    function handleClickMute () {
        videoPlayer.muted = videoPlayer.muted ? false : true;
    }

    function handleClickSubtitle () {
        videoPlayer.subtitle = !videoPlayer.subtitle;
        if (videoPlayer.subtitle) {
            findNextSubtitleElement();
        } else {
            subtitleDiv.innerText = '';
        }
    }
    

    function handleClickFullscreen () {
        console.log('fullscreen');
    }

    const secondsToString = (element, time) => {
        const minutes = Math.floor(time/60);
        let seconds = Math.floor(time-minutes*60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        element.innerText = `${minutes}:${seconds}`
    }

    const findNextSubtitleElement = () => {
        let currentSubtitleElement = subtitlesArray.findIndex(element => videoPlayer.currentTime <= element.endTime);
        videoPlayer.subtitleIndex = currentSubtitleElement;
    }

    function handleVideoTimeChange () {
        secondsToString (controlElements.currentTime,videoPlayer.currentTime);
        controlElements.timeSlider.value = videoPlayer.currentTime/videoPlayer.duration*100;
        if (videoPlayer.subtitle) {
            const currentSubtitle = subtitlesArray[videoPlayer.subtitleIndex];
            if (currentSubtitle.startTime <= videoPlayer.currentTime) {
                subtitleDiv.innerText = currentSubtitle.text;
                if (videoPlayer.subtitleIndex < subtitlesArray.length-1) {
                    videoPlayer.subtitleIndex ++;
                }
            }
        }        
    }

    controlElements.buttonPlay.addEventListener('click', handleClickPlay);
    controlElements.buttonStop.addEventListener('click', handleClickStop);
    controlElements.timeSlider.addEventListener('input', handleChangeTime);
    controlElements.volumeSlider.addEventListener('input', handleChangeVolume);
    controlElements.buttonMute.addEventListener('click', handleClickMute);
    controlElements.buttonSubtitle.addEventListener('click', handleClickSubtitle);
    controlElements.buttonFullscreen.addEventListener('click', handleClickFullscreen);

    videoPlayer.addEventListener('timeupdate', handleVideoTimeChange);

    videoPlayer.addEventListener('loadeddata', () => {
        secondsToString(controlElements.durationTime, videoPlayer.duration);
        videoPlayer.volume = Number(controlElements.volumeSlider.value)/100;
    });
};

export default playerFunctions;