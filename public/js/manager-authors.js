//select id of author into form
document.querySelectorAll(".delete-author-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        document.getElementById("id").value = e.target.dataset.id;
    });
});
//fetch delete of author
document.getElementById("delete-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    fetch(`/author`, {
        method: 'DELETE',
        body: JSON.stringify({
            id:document.getElementById("id").value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        location.href = "/authors";
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
})