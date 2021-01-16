;(function () {
  const text = "This is your Wicked Cool Trading Card!"
  const url = window.location.href
  const via = "heroku"
  const hashtags = "wickedcoolkit"
  const qs = (obj) =>
    Object.keys(obj)
      .reduce(
        (acc, k) => acc + (obj[k] ? `${k}=${encodeURIComponent(obj[k])}&` : ""),
        ""
      )
      .slice(0, -1)

  const params = { text, url, via, hashtags }

  document
    .getElementById("share-button")
    .setAttribute("href", `https://twitter.com/intent/tweet?${qs(params)}`)
})()
