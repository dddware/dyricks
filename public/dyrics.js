(function() {
    'use strict';

  var
    searchbar = document.getElementById('searchbar'),
    searchStyle = document.getElementById('searchStyle'),
    songUg = document.getElementById('song-ug');

  function refreshSongList () {
    if (this.value.length > 0) {
      searchStyle.innerHTML = "label:not([data-clue*='"+this.value +"']){display: none}";
    } else {
      searchStyle.innerHTML= '';
    }

  }

  searchbar.addEventListener('keyup', refreshSongList);

  Array.prototype.slice.call(document.querySelectorAll('label[data-clue]'), 0).forEach(function(node) {
    node.addEventListener('click', function() {
      songUg.classList.remove('active');

      if (!document.getElementById('song-' + node.getAttribute('for').split('-').pop())) {
        songUg.classList.add('active', 'pending');

        // There's no local chords, let's fetch some on UG
        fetch('/api.html?q=' + this.getAttribute('data-clue').replace(/'/g, ''))
          .then(function(response) {
            return response.text();
          })
          .then(function(text) {
            songUg.innerHTML = text;
            songUg.classList.remove('pending');
          })
          .catch(console.error);
      }
    });
  });
})();
