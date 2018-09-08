const playerFunctions = (subtitlesArray) => {
    
    const videoPlayer = document.querySelector('video');

    const subtitleDiv = document.querySelector('.subtitle-div');

    const controlElements = {
        buttonPlay: document.querySelector('.play'),
        buttonStop: document.querySelector('.stop'),
        timeSlider: document.querySelector('.time-slider'),
        currentTime: document.querySelector('.current-time'),
        durationTime: document.querySelector('.duration-time'),
        volumeSlider: document.querySelector('.volume-slider'),
        buttonMute: document.querySelector('.mute'),
        buttonSubtitle: document.querySelector('.subtitle'),
        buttonFullscreen: document.querySelector('.fullscreen'),
    }

    function handleClickPlay () {
        if (videoPlayer.paused) {
            videoPlayer.play()
            this.firstElementChild.className = 'fas fa-pause';
        } else {
            videoPlayer.pause();
            this.firstElementChild.className = 'fas fa-play';
        }
    }

    function handleClickStop () {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        subtitleDiv.innerText = '';
        videoPlayer.subtitleIndex = 0;
        controlELements.buttonPlay.className = 'fas fa-play';
    }

    function handleChangeTime () {
        videoPlayer.currentTime = Number(this.value)*videoPlayer.duration/100;
        findNextSubtitleElement();
    }

    function handleChangeVolume () {
        videoPlayer.volume = this.value/100;
    }

    function handleClickMute () {
        if (videoPlayer.muted) {
            videoPlayer.muted = false;
            controlElements.volumeSlider.value = 50;
            this.firstElementChild.className = 'fas fa-volume-up';
        } else {
            videoPlayer.muted = true;
            controlElements.volumeSlider.value = 0;
            this.firstElementChild.className = 'fas fa-volume-off';
        }
    }

    function handleClickSubtitle () {
        videoPlayer.subtitle = !videoPlayer.subtitle;
        if (videoPlayer.subtitle) {
            findNextSubtitleElement();
            this.style.color = 'yellow';
        } else {
            subtitleDiv.innerText = '';
            this.style.color = 'white';
            document.querySelector('.subtitle-div').style.visibility = 'hidden';
        }
    }
    
    function handleClickFullscreen () {
        videoPlayer.fullscreen = !videoPlayer.fullscreen;
        if (videoPlayer.fullscreen) {
            document.querySelector('.container').style.maxWidth = '100%';
            this.firstElementChild.className = 'fas fa-compress';
            const container = document.querySelector('.container');
            if (container.requestFullscreen) {
                container.requestFullscreen();
            }
            else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            }
            else if (container.webkitRequestFullScreen) {
                container.webkitRequestFullScreen();
            }
            else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        } else {
            document.querySelector('.container').style.maxWidth = '720px';
            this.firstElementChild.className = 'fas fa-expand';
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
       }
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
        subtitleDiv.innerText = '';
        let currentSubtitleElementIndex = subtitlesArray.findIndex(element => videoPlayer.currentTime <= element.endTime);
        videoPlayer.subtitleIndex = currentSubtitleElementIndex;  
    }

    function handleVideoTimeChange () {
        secondsToString (controlElements.currentTime,videoPlayer.currentTime);
        controlElements.timeSlider.value = videoPlayer.currentTime/videoPlayer.duration*100;
        if (videoPlayer.subtitle && videoPlayer.subtitleIndex !==  -1) {

            const showSubtitle = () => {
                const currentSubtitle = subtitlesArray[videoPlayer.subtitleIndex];
                if (currentSubtitle.startTime <= videoPlayer.currentTime) {
                    subtitleDiv.innerText = currentSubtitle.text;
                    document.querySelector('.subtitle-div').style.visibility = 'visible';
                }
            }

            const hideSubtitleAndShowNext = () => {
                const currentSubtitle = subtitlesArray[videoPlayer.subtitleIndex];
                if (currentSubtitle.endTime <= videoPlayer.currentTime) {
                    videoPlayer.subtitleIndex ++;
                    if (videoPlayer.subtitleIndex > subtitlesArray.length-1) {
                        videoPlayer.subtitleIndex = -1;
                        subtitleDiv.innerText = '';
                        document.querySelector('.subtitle-div').style.visibility = 'hidden';
                    } else {
                        const nextSubtitle = subtitlesArray[videoPlayer.subtitleIndex];
                        if (nextSubtitle.startTime - currentSubtitle.endTime < 0.5) {
                            subtitleDiv.innerText = nextSubtitle.text;
                        } else {
                            subtitleDiv.innerText = '';
                            document.querySelector('.subtitle-div').style.visibility = 'hidden';
                        }
                    }

                }
            }

            if (subtitleDiv.innerText === '') {
                showSubtitle();
            } else {
                hideSubtitleAndShowNext();
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

    document.querySelector('.container').addEventListener('mouseover', () => {
        document.querySelector('.control-panel').style.visibility = 'visible';
    });

    document.querySelector('.container').addEventListener('mouseleave', () => {
        document.querySelector('.control-panel').style.visibility = 'hidden';
    });
};

export default playerFunctions;