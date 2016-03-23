$(document).ready(function() {
	var commitLinkRegex = /^https:\/\/github.com\/(.+?)\/(.+?)\/pull\/\d+\/commits\/(.*)$/,
		scheduledState = {
			timeoutScheduled: false
		},
		observerConfig = {
			childList: true,
			subtree: true
		},
		replaceHrefs = function() {
			$('a[href]').each(function() {
				var regexExecResult = commitLinkRegex.exec(this.href);
				if (regexExecResult) {
					this.href = '/' + regexExecResult[1] + '/' + regexExecResult[2] + '/commit/' + regexExecResult[3];
				}
			});
		}
		mutationObserver = new MutationObserver(function() {
			// totally hacky, but every time a mutation is observed, schedule a function that
			// checks all anchors and fixes ones with weirdo files changed commit links.
			if (!scheduledState.timeoutScheduled) {
				scheduledState.timeoutScheduled = true;
				window.setTimeout(function() {
					// don't observe mutations while we're changing the hrefs.
					mutationObserver.disconnect();
					replaceHrefs();
					// start observing again.
					scheduledState.timeoutScheduled = false;
					mutationObserver.observe(document.body, observerConfig);
				}, 250);
			}
		});

	replaceHrefs();
	mutationObserver.observe(document.body, observerConfig);
});