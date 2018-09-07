import playerFunctions from './ui.js';

fetch('http://n-2-17.dcs.redcdn.pl/file/o2/atendesoftware/portal/video/atendesoftware/atendesoftware_2a.txt')
  .then(response => response.text())
  .then(text => {
      const subtitles = text.split('\n').map(element => {
          const timeToSeconds = (time) => {
              const hours = Number(time.slice(0,2));
              const minutes = Number(time.slice(3,5));
              const seconds = Number(time.slice(6));
              return (seconds+(minutes+hours*60)*60);
          }
          const startTime = timeToSeconds(element.slice(0,12));
          const endTime = timeToSeconds(element.slice(13,25));
          const text = element.slice(26);
          if (text !== '') {
            return {
                startTime,
                endTime,
                text
            };
          }
      }).filter(element => element !== undefined);
      
      playerFunctions(subtitles);
  });