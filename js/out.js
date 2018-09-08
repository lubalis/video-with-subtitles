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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ \"./js/ui.js\");\n\nfetch('http://n-2-17.dcs.redcdn.pl/file/o2/atendesoftware/portal/video/atendesoftware/atendesoftware_2a.txt').then(function (response) {\n  return response.text();\n}).then(function (text) {\n  var subtitles = text.split('\\n').map(function (element) {\n    var timeToSeconds = function timeToSeconds(time) {\n      var hours = Number(time.slice(0, 2));\n      var minutes = Number(time.slice(3, 5));\n      var seconds = Number(time.slice(6));\n      return seconds + (minutes + hours * 60) * 60;\n    };\n\n    var startTime = timeToSeconds(element.slice(0, 12));\n    var endTime = timeToSeconds(element.slice(13, 25));\n    var text = element.slice(26);\n\n    if (text !== '') {\n      return {\n        startTime: startTime,\n        endTime: endTime,\n        text: text\n      };\n    }\n  }).filter(function (element) {\n    return element !== undefined;\n  });\n  Object(_ui_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(subtitles);\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ "./js/ui.js":
/*!******************!*\
  !*** ./js/ui.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar playerFunctions = function playerFunctions(subtitlesArray) {\n  var videoPlayer = document.querySelector('video');\n  var subtitleDiv = document.querySelector('.subtitle-div');\n  var controlElements = {\n    buttonPlay: document.querySelector('.play'),\n    buttonStop: document.querySelector('.stop'),\n    timeSlider: document.querySelector('.time-slider'),\n    currentTime: document.querySelector('.current-time'),\n    durationTime: document.querySelector('.duration-time'),\n    volumeSlider: document.querySelector('.volume-slider'),\n    buttonMute: document.querySelector('.mute'),\n    buttonSubtitle: document.querySelector('.subtitle'),\n    buttonFullscreen: document.querySelector('.fullscreen')\n  };\n\n  function handleClickPlay() {\n    if (videoPlayer.paused) {\n      videoPlayer.play();\n      this.firstElementChild.className = 'fas fa-pause';\n    } else {\n      videoPlayer.pause();\n      this.firstElementChild.className = 'fas fa-play';\n    }\n  }\n\n  function handleClickStop() {\n    videoPlayer.pause();\n    videoPlayer.currentTime = 0;\n    subtitleDiv.innerText = '';\n    videoPlayer.subtitleIndex = 0;\n    controlELements.buttonPlay.className = 'fas fa-play';\n  }\n\n  function handleChangeTime() {\n    videoPlayer.currentTime = Number(this.value) * videoPlayer.duration / 100;\n    findNextSubtitleElement();\n  }\n\n  function handleChangeVolume() {\n    videoPlayer.volume = this.value / 100;\n  }\n\n  function handleClickMute() {\n    if (videoPlayer.muted) {\n      videoPlayer.muted = false;\n      controlElements.volumeSlider.value = 50;\n      this.firstElementChild.className = 'fas fa-volume-up';\n    } else {\n      videoPlayer.muted = true;\n      controlElements.volumeSlider.value = 0;\n      this.firstElementChild.className = 'fas fa-volume-off';\n    }\n  }\n\n  function handleClickSubtitle() {\n    videoPlayer.subtitle = !videoPlayer.subtitle;\n\n    if (videoPlayer.subtitle) {\n      findNextSubtitleElement();\n      this.style.color = 'yellow';\n    } else {\n      subtitleDiv.innerText = '';\n      this.style.color = 'white';\n      document.querySelector('.subtitle-div').style.visibility = 'hidden';\n    }\n  }\n\n  function handleClickFullscreen() {\n    videoPlayer.fullscreen = !videoPlayer.fullscreen;\n\n    if (videoPlayer.fullscreen) {\n      document.querySelector('.container').style.maxWidth = '100%';\n      this.firstElementChild.className = 'fas fa-compress';\n      var container = document.querySelector('.container');\n\n      if (container.requestFullscreen) {\n        container.requestFullscreen();\n      } else if (container.mozRequestFullScreen) {\n        container.mozRequestFullScreen();\n      } else if (container.webkitRequestFullScreen) {\n        container.webkitRequestFullScreen();\n      } else if (container.msRequestFullscreen) {\n        container.msRequestFullscreen();\n      }\n    } else {\n      document.querySelector('.container').style.maxWidth = '720px';\n      this.firstElementChild.className = 'fas fa-expand';\n\n      if (document.exitFullscreen) {\n        document.exitFullscreen();\n      } else if (document.mozCancelFullScreen) {\n        document.mozCancelFullScreen();\n      } else if (document.webkitExitFullscreen) {\n        document.webkitExitFullscreen();\n      } else if (document.msExitFullscreen) {\n        document.msExitFullscreen();\n      }\n    }\n  }\n\n  var secondsToString = function secondsToString(element, time) {\n    var minutes = Math.floor(time / 60);\n    var seconds = Math.floor(time - minutes * 60);\n\n    if (seconds < 10) {\n      seconds = \"0\".concat(seconds);\n    }\n\n    element.innerText = \"\".concat(minutes, \":\").concat(seconds);\n  };\n\n  var findNextSubtitleElement = function findNextSubtitleElement() {\n    subtitleDiv.innerText = '';\n    var currentSubtitleElementIndex = subtitlesArray.findIndex(function (element) {\n      return videoPlayer.currentTime <= element.endTime;\n    });\n    videoPlayer.subtitleIndex = currentSubtitleElementIndex;\n  };\n\n  function handleVideoTimeChange() {\n    secondsToString(controlElements.currentTime, videoPlayer.currentTime);\n    controlElements.timeSlider.value = videoPlayer.currentTime / videoPlayer.duration * 100;\n\n    if (videoPlayer.subtitle && videoPlayer.subtitleIndex !== -1) {\n      var showSubtitle = function showSubtitle() {\n        var currentSubtitle = subtitlesArray[videoPlayer.subtitleIndex];\n\n        if (currentSubtitle.startTime <= videoPlayer.currentTime) {\n          subtitleDiv.innerText = currentSubtitle.text;\n          document.querySelector('.subtitle-div').style.visibility = 'visible';\n        }\n      };\n\n      var hideSubtitleAndShowNext = function hideSubtitleAndShowNext() {\n        var currentSubtitle = subtitlesArray[videoPlayer.subtitleIndex];\n\n        if (currentSubtitle.endTime <= videoPlayer.currentTime) {\n          videoPlayer.subtitleIndex++;\n\n          if (videoPlayer.subtitleIndex > subtitlesArray.length - 1) {\n            videoPlayer.subtitleIndex = -1;\n            subtitleDiv.innerText = '';\n            document.querySelector('.subtitle-div').style.visibility = 'hidden';\n          } else {\n            var nextSubtitle = subtitlesArray[videoPlayer.subtitleIndex];\n\n            if (nextSubtitle.startTime - currentSubtitle.endTime < 0.5) {\n              subtitleDiv.innerText = nextSubtitle.text;\n            } else {\n              subtitleDiv.innerText = '';\n              document.querySelector('.subtitle-div').style.visibility = 'hidden';\n            }\n          }\n        }\n      };\n\n      if (subtitleDiv.innerText === '') {\n        showSubtitle();\n      } else {\n        hideSubtitleAndShowNext();\n      }\n    }\n  }\n\n  controlElements.buttonPlay.addEventListener('click', handleClickPlay);\n  controlElements.buttonStop.addEventListener('click', handleClickStop);\n  controlElements.timeSlider.addEventListener('input', handleChangeTime);\n  controlElements.volumeSlider.addEventListener('input', handleChangeVolume);\n  controlElements.buttonMute.addEventListener('click', handleClickMute);\n  controlElements.buttonSubtitle.addEventListener('click', handleClickSubtitle);\n  controlElements.buttonFullscreen.addEventListener('click', handleClickFullscreen);\n  videoPlayer.addEventListener('timeupdate', handleVideoTimeChange);\n  videoPlayer.addEventListener('loadeddata', function () {\n    secondsToString(controlElements.durationTime, videoPlayer.duration);\n    videoPlayer.volume = Number(controlElements.volumeSlider.value) / 100;\n  });\n  document.querySelector('.container').addEventListener('mouseover', function () {\n    document.querySelector('.control-panel').style.visibility = 'visible';\n  });\n  document.querySelector('.container').addEventListener('mouseleave', function () {\n    document.querySelector('.control-panel').style.visibility = 'hidden';\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (playerFunctions);\n\n//# sourceURL=webpack:///./js/ui.js?");

/***/ })

/******/ });