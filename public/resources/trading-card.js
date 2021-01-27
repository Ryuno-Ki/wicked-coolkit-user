;(function () {
  const text = "Check out my Wicked Cool Trading Card!"
  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  const via = "heroku"
  const hashtags = "wickedcoolkit"
  const qs = (obj) =>
    Object.keys(obj)
      .reduce(
        (acc, k) => acc + (obj[k] ? `${k}=${encodeURIComponent(obj[k])}&` : ""),
        ""
      )
      .slice(0, -1)

  document
    .getElementById("tweet-button")
    .setAttribute(
      "href",
      `https://twitter.com/intent/tweet?${qs({ text, url, via, hashtags })}`
    )

  const clip = new ClipboardJS("#share-button", {
    text: () => url,
  }).on("success", (e) => {
    e.clearSelection()
    const prevText = e.trigger.textContent.trim()
    e.trigger.textContent = "Copied!"
    e.trigger.setAttribute("disabled", true)
    setTimeout(() => {
      e.trigger.textContent = prevText
      e.trigger.removeAttribute("disabled")
    }, 3000)
  })
})()
