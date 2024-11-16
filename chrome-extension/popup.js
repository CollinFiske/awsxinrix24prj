document.getElementById("fetchData").addEventListener("click", () => {
  fetch("http://localhost:5000/api/data")
    .then(response => response.json())
    .then(data => {
      document.getElementById("response").textContent = data.message;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});
