console.log("Content Script Loaded");

const currentDomain = new URL(window.location.href).hostname;


const redirectLinks = Array.from(document.querySelectorAll('a'))
  .filter(link => {
    try {
      const linkDomain = new URL(link.href).hostname;
      return linkDomain && linkDomain !== currentDomain; 
    } catch (e) {
      return false;
    }
  })
  .map(link => ({
    text: link.innerText.trim() || "No Text",
    href: link.href
  }));

const tableData = `
  <table border="1">
    <thead>
      <tr>
        <th>Text</th>
        <th>Redirect Link</th>
      </tr>
    </thead>
    <tbody>
      ${redirectLinks.map(link => `
        <tr>
          <td>${link.text}</td>
          <td><a href="${link.href}" target="_blank">${link.href}</a></td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

chrome.runtime.sendMessage({ tableData });
