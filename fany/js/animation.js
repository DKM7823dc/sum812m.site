(function () {
	const AnimationAttr = 'data-acai-animate';
	const StateAttr = 'data-acai-animation-state';

	function prepareElements() {
		const elements = document.querySelectorAll(`[${AnimationAttr}]`);
		elements.forEach(el => {
			const delay = el.getAttribute('data-acai-delay') || 0;
			el.style.setProperty('--wp--custom--animation--delay', `${delay}s`);
			const duration = el.getAttribute('data-acai-duration') || 1.4;
			el.style.setProperty('--wp--custom--animation--duration', `${duration}s`);
			const offset = el.getAttribute('data-acai-offset') || 10;
			el.style.setProperty('--wp--custom--animation--offset', `${offset}rem`);
			const scale = el.getAttribute('data-acai-scale') || 0.1;
			el.style.setProperty('--wp--custom--animation--scale', `${scale}`);
			el.setAttribute(StateAttr, 'initial');
			void el.offsetWidth;
		});
	}

	function animateElement(element) {
		element.setAttribute(StateAttr, 'animated');
	}

	function initAnimations() {
		if (!('IntersectionObserver' in window)) return;
		prepareElements();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					const element = entry.target;
					if (entry.isIntersecting && element.getAttribute(StateAttr) === 'initial') {
						window.requestAnimationFrame(() => {
							animateElement(element);
						});
						observer.unobserve(element);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '10px',
			}
		);
		const elements = document.querySelectorAll(`[${AnimationAttr}]`);
		elements.forEach(el => observer.observe(el));
		return {
			reset: function () {
				elements.forEach(el => {
					el.setAttribute(StateAttr, 'initial');
					void el.offsetWidth;
					observer.observe(el);
				});
			}
		};
	}

	document.addEventListener('DOMContentLoaded', function () {
		window.addEventListener('load', function () {
			const api = initAnimations();
			window.acaiAnimations = {
				reset: api.reset
			};
		});
	});

})();