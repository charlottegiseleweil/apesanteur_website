// Attempts unmuted autoplay on .sound-autoplay-video elements.
// Browsers block unmuted autoplay without prior user interaction, so we
// fall back to muted playback plus a one-tap "activer le son" button,
// which is a user gesture and therefore always allowed to unmute.
(function () {
	function attemptUnmutedPlay(video, btn) {
		video.muted = false;
		var p = video.play();
		if (p && typeof p.catch === 'function') {
			p.catch(function () {
				video.muted = true;
				video.play().catch(function () {});
				if (btn) btn.hidden = false;
			});
		}
	}

	document.addEventListener('DOMContentLoaded', function () {
		document.querySelectorAll('.sound-autoplay-video').forEach(function (video) {
			var wrapper = video.parentElement;
			wrapper.style.position = 'relative';

			var btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'unmute-btn';
			btn.setAttribute('aria-label', 'Activer le son');
			btn.textContent = '🔇 Activer le son';
			btn.hidden = true;
			btn.addEventListener('click', function () {
				video.muted = false;
				video.play().catch(function () {});
				btn.hidden = true;
			});
			wrapper.appendChild(btn);

			if (video.dataset.trigger === 'visible') {
				var started = false;
				var observer = new IntersectionObserver(function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							if (!started) {
								attemptUnmutedPlay(video, btn);
								started = true;
							} else {
								video.play().catch(function () {});
							}
						} else {
							video.pause();
						}
					});
				}, { threshold: 0.5 });
				observer.observe(video);
			} else {
				attemptUnmutedPlay(video, btn);
			}
		});
	});
})();
