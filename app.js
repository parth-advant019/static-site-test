function render() {
    const path = window.location.pathname;
    const app = document.getElementById("app");
  
    if (path === "/" || path === "") {
      app.innerHTML = `
        <h1>Home</h1>
        <p>SPA Fallback Test</p>
        <p>Click About, then refresh the page.</p>
      `;
    } else if (path === "/about") {
      app.innerHTML = `
        <h1>About</h1>
        <p>If this still shows after refresh, SPA fallback is working.</p>
      `;
    } else if (path === "/contact") {
      app.innerHTML = `
        <h1>Contact</h1>
        <p>Deep route page.</p>
      `;
    } else {
      app.innerHTML = `<h1>Not found in app</h1><p>Path: ${path}</p>`;
    }
  }
  
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("/")) return;
    e.preventDefault();
    history.pushState({}, "", href);
    render();
  });
  
  window.addEventListener("popstate", render);
  render();