document.getElementById('submit-btn').addEventListener('click', function() {
  const question = document.getElementById('question').value;
  if (question) {
    chrome.runtime.sendMessage({ action: 'askQuestion', question: question });
    alert('Question submitted!');
  } else {
    alert('Please enter a question.');
  }
});
