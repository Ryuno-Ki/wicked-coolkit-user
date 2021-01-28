;(function () {
  const { host, protocol } = window.location

  const generateSnippet = (id, name) => {
    const node = document.getElementById(id)
    const cdn = node.getAttribute("data-cdn")

    const tag = name.replace(/[A-Z]/g, (l) => "-" + l).toLowerCase()
    const scriptTag = `<script type="module" async src="${cdn}/${name}.js"></script>`
    const componentTag = `<wck-${tag} host="${host}"></wck-${tag}>`
    const code = [scriptTag, componentTag].join("\n")

    node.innerText = code
  }

  generateSnippet("hit-counter-code", "hitCounter")
  generateSnippet("webring-code", "webring")

  document.querySelectorAll(".close-button").forEach((n) => {
    n.addEventListener("click", () => {
      n.closest(".message").remove()
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete("auth_success")
      newUrl.searchParams.delete("auth_error")
      history.replaceState(null, "", newUrl)
    })
  })

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
