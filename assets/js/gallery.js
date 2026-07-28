// Lightweight lightbox for .gallery-grid galleries
(function () {
	document.addEventListener('DOMContentLoaded', function () {
		var links = Array.prototype.slice.call(document.querySelectorAll('.gallery-grid a, .photo-masonry a'));
		if (!links.length) return;

		var overlay = document.createElement('div');
		overlay.id = 'lightbox-overlay';
		overlay.innerHTML =
			'<button class="lightbox-close" aria-label="Fermer">&times;</button>' +
			'<button class="lightbox-prev" aria-label="Précédent">&#10094;</button>' +
			'<img src="" alt="" />' +
			'<button class="lightbox-next" aria-label="Suivant">&#10095;</button>';
		document.body.appendChild(overlay);

		var img = overlay.querySelector('img');
		var current = 0;

		function show(index) {
			current = (index + links.length) % links.length;
			img.src = links[current].getAttribute('href');
			img.alt = links[current].querySelector('img') ? links[current].querySelector('img').alt : '';
		}

		function open(index) {
			show(index);
			overlay.classList.add('open');
			document.body.style.overflow = 'hidden';
		}

		function close() {
			overlay.classList.remove('open');
			document.body.style.overflow = '';
		}

		links.forEach(function (link, index) {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				open(index);
			});
		});

		overlay.querySelector('.lightbox-close').addEventListener('click', close);
		overlay.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
		overlay.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });

		overlay.addEventListener('click', function (e) {
			if (e.target === overlay) close();
		});

		document.addEventListener('keydown', function (e) {
			if (!overlay.classList.contains('open')) return;
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowLeft') show(current - 1);
			if (e.key === 'ArrowRight') show(current + 1);
		});
	});
})();
