(function () {
  // Age and experience
  const ageBlock = document.getElementById('age'),
    expBlock = document.getElementById('exp'),
    born = new Date('1994-08-01'),
    work = new Date('2015-05-01'),
    now = new Date(),
    age = new Date(now.getTime() - born.getTime()),
    exp = new Date(now.getTime() - work.getTime()),
    start = new Date(0);

  ageBlock.innerText = age.getFullYear() - start.getFullYear() + ' years';
  expBlock.innerText =
    Math.round((exp.getFullYear() - start.getFullYear() + exp.getMonth() / 12) / 0.5) * 0.5 + ' years';
})();

(function () {
  // Theming
  const html = document.getElementById('html'),
    themes = {auto: 'auto', dark: 'dark', light: 'light'},
    states = Object.keys(themes),
    switcher = document.getElementById('theme-switcher'),
    rotator = document.getElementById('theme-rotator');

  switcher.classList.remove('off');

  const storage = {
    get: function () {
      return localStorage.getItem('theme') || states[0];
    },
    set: function (theme) {
      localStorage.setItem('theme', theme);
    }
  };

  let angle = states.indexOf(storage.get());

  const setTheme = function (theme) {
    rotator.style.transform = `rotate(-${angle++ * 120}deg)`;
    switch (theme) {
      case themes.auto:
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          html.classList.add('light');
        } else {
          html.classList.remove('light');
        }
        break;
      case themes.dark:
        html.classList.remove('light');
        break;
      case themes.light:
        html.classList.add('light');
        break;
    }
  };

  setTheme(storage.get());

  switcher.addEventListener('click', function () {
    const theme = states[angle % 3];
    setTheme(theme);
    storage.set(theme);
  });
})();

(function () {
  // ServiceWorker
  if (location.hostname !== 'localhost') {
    if ('serviceWorker' in navigator) {
      const swMessages = function (reg) {
        navigator.serviceWorker.addEventListener('message', function (event) {
          const message = JSON.parse(event.data);
          console.log('[APP]: new message from ServiceWorker:', message);
          if (message.code === 1) {
            reg.unregister().then();
            location.reload();
          }
        });
      };

      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.getRegistration().then(reg => {
          swMessages(reg);
        });
      } else {
        navigator.serviceWorker
          .register('sw.js', {
            scope: './'
          })
          .then(function (reg) {
            swMessages(reg);
          });
      }
    }
  }
})();

(function () {
  // Yandex.Metrika counter
  if (location.hostname !== 'localhost') {
    (function (m, e, t, r, i, k, a) {
      try {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        (k = e.createElement(t)),
          (a = e.getElementsByTagName(t)[0]),
          (k.async = 1),
          (k.src = r),
          a.parentNode.insertBefore(k, a);
      } catch (e) {
        console.warn('Yandex.Metrika is blocked');
      }
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(35320200, 'init', {
      id: 35320200,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  }
})();
