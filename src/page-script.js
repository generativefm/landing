(function () {
  var openerOrigin;
  switch (location.origin) {
    case 'https://generative.fm': {
      openerOrigin = 'https://play.generative.fm';
      break;
    }
    case 'https://staging.generative.fm': {
      openerOrigin = 'https://staging.play.generative.fm';
      break;
    }
    case 'http://localhost:3000': {
      openerOrigin = 'http://localhost:8080';
      break;
    }
    default: {
      // do nothing
    }
  }
  if (!openerOrigin) {
    return;
  }
  window.addEventListener('message', function (event) {
    var data = event.data;
    var source = event.source;
    var origin = event.origin;
    if (origin !== openerOrigin) {
      return;
    }
    if (data.type === 'export-request') {
      var state = window.localStorage.getItem('STATE');
      source.postMessage({ type: 'export', state: state }, origin);
      return;
    }
    if (data.type === 'set-import-request') {
      var stateString = window.localStorage.getItem('STATE');
      if (typeof stateString !== 'string') {
        window.localStorage.setItem('STATE', '{isImported:true}');
        return;
      }
      try {
        state = JSON.parse(stateString);
      } catch (error) {
        console.error('Unable to parse stored state', error);
        return;
      }
      if (state === null || typeof state !== 'object') {
        window.localStorage.setItem('STATE', '{isImported:true}');
        return;
      }
      state.isImported = true;
      try {
        window.localStorage.setItem('STATE', JSON.stringify(state));
      } catch (err) {
        console.error('Unable to set state as imported', err);
      }
      source.postMessage({ type: 'import-set' }, origin);
    }
  });
})();

(function () {
  if (!window.navigator.serviceWorker) {
    return;
  }
  window.addEventListener('load', function () {
    window.navigator.serviceWorker.register('/sw.js');
  });
})();
