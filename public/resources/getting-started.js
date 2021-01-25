;(function () {
  const { host, protocol } = window.location

  const generateSnippet = (name) => {
    const tag = name.replace(/[A-Z]/g, (l) => "-" + l).toLowerCase()
    const scriptTag = `<script type="module" async src="https://unpkg.com/wicked-coolkit/dist/${name}.js"></script>`
    const componentTag = `<wck-${tag} host="${host}"></wck-${tag}>`
    return [scriptTag, componentTag].join("\n")
  }

  document.getElementById("hit-counter-code").innerText = generateSnippet(
    "hitCounter"
  )

  document.getElementById("webring-code").innerText = generateSnippet("webring")

  document.querySelectorAll("[href^='/sf/']").forEach((n) => {
    const href = new URL(n.getAttribute("href"), window.location.href)
    href.searchParams.set("redirect_host", `${protocol}//${host}`)
    n.setAttribute("href", href)
  })

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
})()
