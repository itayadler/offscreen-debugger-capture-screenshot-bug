
async function start() {
chrome.offscreen.createDocument({
  url: chrome.runtime.getURL('offscreen.html'),
  reasons: ['DOM_SCRAPING'],
  justification: 'Take a screenshot of the offscren page with chrome.debugger Page.takeScreenshot',
});
	const targets = await chrome.debugger.getTargets()
  const offscreenTarget = targets.find(t => t.url.includes("offscreen.html"))
  const debuggee = {targetId: offscreenTarget.id}
  await chrome.debugger.attach(debuggee, "1.3")
  const result = chrome.debugger.sendCommand(debuggee, "Page.captureScreenshot")
  console.log(result)
}

start()