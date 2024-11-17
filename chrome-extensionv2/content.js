// This script will run in the context of the webpage and collect links and text
const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
const texts = Array.from(document.body.querySelectorAll('p, h1, h2, h3, span')).map(el => el.textContent);

chrome.storage.local.set({ links: links, texts: texts }, () => {
  console.log('Collected links and texts');
});
