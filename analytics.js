(function () {
	var measurementId = "G-KCPN8KCYZ2";

	window.dataLayer = window.dataLayer || [];
	window.gtag = window.gtag || function () {
		window.dataLayer.push(arguments);
	};

	window.gtag("js", new Date());
	window.gtag("config", measurementId);

	var script = document.createElement("script");
	script.async = true;
	script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
	document.head.appendChild(script);

	document.addEventListener("click", function (event) {
		var link = event.target.closest("a[data-analytics-event]");
		if (!link || event.defaultPrevented || event.button !== 0) {
			return;
		}

		var eventName = link.dataset.analyticsEvent;
		if (!eventName || typeof window.gtag !== "function") {
			return;
		}

		var opensInCurrentTab = !link.target || link.target === "_self";
		var isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
		var shouldDelayNavigation = opensInCurrentTab && !isModifiedClick && link.href;
		var linkText = link.textContent.trim().replace(/\s+/g, " ");
		var hasNavigated = false;
		var navigate = function () {
			if (!hasNavigated) {
				hasNavigated = true;
				window.location.href = link.href;
			}
		};
		var eventParams = {
			event_category: link.dataset.analyticsCategory || "engagement",
			event_label: link.dataset.analyticsLabel || linkText,
			link_text: linkText,
			link_url: link.href
		};

		if (shouldDelayNavigation) {
			event.preventDefault();
			eventParams.event_callback = navigate;
			eventParams.event_timeout = 800;
		}

		window.gtag("event", eventName, eventParams);

		if (shouldDelayNavigation) {
			window.setTimeout(navigate, 900);
		}
	});
}());
