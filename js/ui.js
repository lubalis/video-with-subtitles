const playerFunctions = (subtitlesArray) => {
    
    const videoContainer = document.querySelector('.video-container');
    const videoPlayer = document.querySelector('video');
    const subtitleDiv = document.querySelector('.subtitle-div');
    const controlContainer = document.querySelector('.control-container');
    
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

    const playOrPauseVideo = () => {
        if (videoPlayer.paused) {
            videoPlayer.play()
            controlElements.buttonPlay.firstElementChild.className = 'fas fa-pause';
        } else {
            videoPlayer.pause();
            controlElements.buttonPlay.firstElementChild.className = 'fas fa-play';
        }
    }

    const stopVideo = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        hideSubtitles();
        videoPlayer.subtitleIndex = 0;
        controlElements.buttonPlay.firstElementChild.className = 'fas fa-play';
    }

    const rewindVideo = () => {    
        videoPlayer.currentTime = Number(controlElements.timeSlider.value)*videoPlayer.duration/100;
        findNextSubtitlesElement();
    }

    const changeVolume = () => {
        videoPlayer.volume = controlElements.volumeSlider.value/100;
    }

    const muteOrUnmute = () => {

        const unmuteVolume = () => {
            videoPlayer.muted = false;
            controlElements.volumeSlider.value = controlElements.volumeSlider.lastValue;
            controlElements.buttonMute.firstElementChild.className = 'fas fa-volume-up';
        }

        const muteVolume = () => {
            videoPlayer.muted = true;
            controlElements.volumeSlider.lastValue = controlElements.volumeSlider.value;
            controlElements.volumeSlider.value = 0;
            controlElements.buttonMute.firstElementChild.className = 'fas fa-volume-off';
        }

        if (videoPlayer.muted) {
            unmuteVolume();
        } else {
            muteVolume();
        }
    }

    const switchSubtitles = () => {
        
        const activateSubtitle = () => {
            findNextSubtitlesElement();
            controlElements.buttonSubtitle.style.color = 'yellow';
        }

        const deactivatedSubtitle = () => {
            controlElements.buttonSubtitle.style.color = 'white';
        }

        videoPlayer.subtitle = !videoPlayer.subtitle;
        
        if (videoPlayer.subtitle) {
            activateSubtitle();
        } else {
            deactivatedSubtitle();
        }

    }

    const showOrHideFullscreen = () => {

        const showFullscreen = () => {
            videoContainer.style.maxWidth = '100%';
            controlContainer.style.fontSize = '1.5em';
            controlElements.buttonFullscreen.firstElementChild.className = 'fas fa-compress';

            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            }
            else if (videoContainer.mozRequestFullScreen) {
                videoContainer.mozRequestFullScreen();
            }
            else if (videoContainer.webkitRequestFullScreen) {
                videoContainer.webkitRequestFullScreen();
            }
            else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }

            videoContainer.addEventListener('mousemove', controlPanelOnFullscreen);
        }

        const hideFullscreen = () => {
            videoContainer.style.maxWidth = '720px';
            controlContainer.style.fontSize = '1em';
            controlElements.buttonFullscreen.firstElementChild.className = 'fas fa-expand';

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

            videoContainer.removeEventListener('mousemove', controlPanelOnFullscreen);
        }

        videoPlayer.fullscreen = !videoPlayer.fullscreen;

        if (videoPlayer.fullscreen) {
            showFullscreen();
        } else {
            hideFullscreen();
       }
    }

    const findNextSubtitlesElement = () => {
        hideSubtitles();
        const currentSubtitleElementIndex = subtitlesArray.findIndex(element => videoPlayer.currentTime <= element.endTime);
        videoPlayer.subtitleIndex = currentSubtitleElementIndex;  
    }

    const hideSubtitles = () => {
        subtitleDiv.innerText = '';
        subtitleDiv.style.visibility = 'hidden';
    }

    const showControlPanel = () => {
        controlContainer.style.bottom = '0%';
    }

    const hideControlPanel = () => {
        controlContainer.style.bottom = '-8%';
    }

    const controlPanelOnFullscreen = (event) => {
        if (event.pageY < 0.8*window.screen.height) {
            hideControlPanel();
        } else {
            showControlPanel();
        }
    }

    const videoTimeChange = () => {
        
        const showCurrentTime = () => {
            secondsToString (controlElements.currentTime, videoPlayer.currentTime);
            controlElements.timeSlider.value = videoPlayer.currentTime/videoPlayer.duration*100;
        }

        const goToStart = () => {
            videoPlayer.currentTime = 0;
            videoPlayer.subtitleIndex = 0;
            controlElements.buttonPlay.firstElementChild.className = 'fas fa-play';
        }

        const showSubtitles = () => {
            if (videoPlayer.subtitleIndex !==  -1) {
                const currentSubtitle = subtitlesArray[videoPlayer.subtitleIndex];
                if (currentSubtitle.startTime <= videoPlayer.currentTime) {
                    subtitleDiv.innerText = currentSubtitle.text;
                    subtitleDiv.style.visibility = 'visible';
                }
            }
        }

        const endSubtitlesOrGoToNext = () => {
            const currentSubtitlesElement = subtitlesArray[videoPlayer.subtitleIndex];

            const endCurrentSubtitles = () => {
                
                const hideSubtitlesAtTheEnd = () => {
                    videoPlayer.subtitleIndex = -1;
                    hideSubtitles();
                }

                const showNextSubtitlesOrHideCurrent = () => {
                    const nextSubtitlesElement = subtitlesArray[videoPlayer.subtitleIndex];
                    if (nextSubtitlesElement.startTime - currentSubtitlesElement.endTime < 0.5) {
                        subtitleDiv.innerText = nextSubtitlesElement.text;
                    } else {
                        hideSubtitles();
                    }
                }

                videoPlayer.subtitleIndex ++;
                if (videoPlayer.subtitleIndex > subtitlesArray.length-1) {
                    hideSubtitlesAtTheEnd();
                } else {
                    showNextSubtitlesOrHideCurrent();
                }
            }

            if (currentSubtitlesElement.endTime <= videoPlayer.currentTime) {
                endCurrentSubtitles();
            }
        }

        if (videoPlayer.currentTime === videoPlayer.duration) {
            goToStart();
        }

        showCurrentTime();

        if (videoPlayer.subtitle) {
            if (subtitleDiv.innerText === '') {
                showSubtitles();
            } else {
                endSubtitlesOrGoToNext();
            }
        } else {
            hideSubtitles();
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

    const initVideoPlayer = () => {
        secondsToString(controlElements.durationTime, videoPlayer.duration);
        videoPlayer.volume = Number(controlElements.volumeSlider.value)/100;
        videoPlayer.subtitleIndex = 0;
    }

    controlElements.buttonPlay.addEventListener('click', playOrPauseVideo);
    controlElements.buttonStop.addEventListener('click', stopVideo);
    controlElements.timeSlider.addEventListener('input', rewindVideo);
    controlElements.volumeSlider.addEventListener('input', changeVolume);
    controlElements.buttonMute.addEventListener('click', muteOrUnmute);
    controlElements.buttonSubtitle.addEventListener('click', switchSubtitles);
    controlElements.buttonFullscreen.addEventListener('click', showOrHideFullscreen);

    videoPlayer.addEventListener('timeupdate', videoTimeChange);

    videoPlayer.addEventListener('loadeddata', initVideoPlayer);

    videoContainer.addEventListener('mouseenter', showControlPanel);
    videoContainer.addEventListener('mouseleave', hideControlPanel);
};

export default playerFunctions;