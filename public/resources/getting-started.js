;(function () {
  const { host, protocol } = window.location

  const generateSnippet = (name) => {
    const tag = name.replace(/[A-Z]/g, (l) => "-" + l).toLowerCase()
    const scriptTag = `<script type="module" async src="https://unpkg.com/wicked-coolkit/dist/${name}.js"></script>`
    const componentTag = `<wck-${tag} host="${host}"></wck-${tag}>`
    return [scriptTag, componentTag].join("\n")
  }

  new ClipboardJS(".copy-button").on("success", (e) => {
    e.clearSelection()
    const prevText = e.trigger.textContent.trim()
    e.trigger.textContent = "Copied!"
    e.trigger.setAttribute("disabled", true)
    setTimeout(() => {
      e.trigger.textContent = prevText
      e.trigger.removeAttribute("disabled")
    }, 3000)
  })

  document.getElementById("hit-counter-code").innerText = generateSnippet(
    "hitCounter"
  )

  document.getElementById("webring-code").innerText = generateSnippet("webring")

  document.querySelectorAll("[href^='/api']").forEach((n) => {
    n.setAttribute(
      "href",
      `${n.getAttribute("href")}?redirect_host=${protocol}//${host}`
    )
  })
})()
