(function() {
    'use strict';

  var
    searchbar = document.getElementById('searchbar'),
    searchStyle = document.getElementById('searchStyle'),
    songUg = document.getElementById('song');

  function refreshSongList () {
    if (this.value.length > 0) {
      searchStyle.innerHTML = "label:not([data-clue*='"+this.value +"']){height:0;opacity:0;transform:translateX(-100%)}";
    } else {
      searchStyle.innerHTML= '';
    }
  }

  window.toggleDataChords = function () {
    if (document.body.hasAttribute('data-chords')) {
      document.body.removeAttribute('data-chords');
    } else {
      document.body.setAttribute('data-chords', '');
    }
    queryService(document.querySelector('.toggle.active'));
  }

  searchbar.addEventListener('keyup', refreshSongList);

  function queryService(target) {
    songUg.classList.remove('active');
    if (target.getAttribute('data-clue')) {
      songUg.classList.add('pending');
    }

    let dataSource =
      document.body.hasAttribute('data-chords') ? 'ug' : 'genius';

    // There's no local chords, let's fetch some on UG
    fetch('/' + dataSource + '.html?q=' + target.getAttribute('data-clue').replace(/'/g, ''))
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        songUg.innerHTML = text;
        songUg.classList.remove('pending');
        songUg.classList.add('active');
      })
      .catch(console.error);
  }

  function toggleNav(target) {
    if (document.querySelector('.toggle.active') !== null) {
      document.querySelector('.toggle.active').classList.remove('active');
    }
    target.classList.add('active');
  }

  Array.prototype.slice.call(document.querySelectorAll('.toggle'), 0).forEach(function(node) {
    node.addEventListener('click', function (e) {
      queryService(e.currentTarget);
      toggleNav(e.currentTarget);
    } );
  });

  // Ambient light detection
  window.addEventListener('devicelight', function(event) {
    if (event.value < 50) {
      document.querySelector('body').classList.remove('light');
    } else {
      document.querySelector('body').classList.add('light');
    }
  });
})();
