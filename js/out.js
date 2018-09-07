/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/ui.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/ui.js":
/*!******************!*\
  !*** ./js/ui.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener('DOMContentLoaded', function(){\n    \n    const videoPlayer = document.querySelector('video');\n\n    const controlElements = {\n        buttonPlay: document.querySelector('.play'),\n        buttonStop: document.querySelector('.stop'),\n        timeSlider: document.querySelector('.timeSlider'),\n        currentTime: document.querySelector('.currentTime'),\n        durationTime: document.querySelector('.durationTime'),\n        volumeSlider: document.querySelector('.volumeSlider'),\n        buttonMute: document.querySelector('.mute'),\n        buttonSubtitle: document.querySelector('.subtitle'),\n        buttonFullscreen: document.querySelector('.fullscreen'),\n    }\n\n    function handleClickPlay () {\n        videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();\n    }\n\n    function handleClickStop () {\n        videoPlayer.pause();\n        videoPlayer.currentTime = 0;\n    }\n\n    function handleChangeTime () {\n        videoPlayer.currentTime = Number(this.value)*videoPlayer.duration/100;\n    }\n\n    function handleChangeVolume () {\n        videoPlayer.volume = this.value/100;\n    }\n\n    function handleClickMute () {\n        videoPlayer.muted = videoPlayer.muted ? false : true;\n    }\n\n    function handleClickSubtitle () {\n        console.log('subtitle');\n    }\n\n    function handleClickFullscreen () {\n        console.log('fullscreen');\n    }\n\n    const secondsToString = (element, time) => {\n        const minutes = Math.floor(time/60);\n        let seconds = Math.floor(time-minutes*60);\n        if (seconds < 10) {\n            seconds = `0${seconds}`;\n        }\n        element.innerText = `${minutes}:${seconds}`\n    }\n\n    function handleVideoTimeChange () {\n        secondsToString (controlElements.currentTime,videoPlayer.currentTime);\n    }\n\n    controlElements.buttonPlay.addEventListener('click', handleClickPlay);\n    controlElements.buttonStop.addEventListener('click', handleClickStop);\n    controlElements.timeSlider.addEventListener('input', handleChangeTime);\n    controlElements.volumeSlider.addEventListener('input', handleChangeVolume);\n    controlElements.buttonMute.addEventListener('click', handleClickMute);\n    controlElements.buttonSubtitle.addEventListener('click', handleClickSubtitle);\n    controlElements.buttonFullscreen.addEventListener('click', handleClickFullscreen);\n\n    videoPlayer.addEventListener('timeupdate', handleVideoTimeChange);\n\n    videoPlayer.addEventListener('loadeddata', () => {\n        secondsToString(controlElements.durationTime, videoPlayer.duration);\n        videoPlayer.volume = Number(controlElements.volumeSlider.value)/100;\n    });\n});\n\n//# sourceURL=webpack:///./js/ui.js?");

/***/ })

/******/ });