;(function () {
  const generateSnippet = (name) => {
    const tag = name.replace(/[A-Z]/g, (l) => "-" + l).toLowerCase()
    const scriptTag = `<script type="module" src="https://unpkg.com/wicked-coolkit/dist/${name}.js"></script>`
    const componentTag = `<wck-${tag} host="${window.location.host}"></wck-${tag}>`
    return [scriptTag, componentTag].join("\n")
  }

  const clip = new ClipboardJS(".copy-button")

  clip.on("success", console.log)

  document.getElementById("hit-counter-code").innerText = generateSnippet(
    "hitCounter"
  )

  document.getElementById("webring-code").innerText = generateSnippet("webring")
})()
