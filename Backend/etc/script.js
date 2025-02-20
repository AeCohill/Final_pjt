//we are gonna make an event listener...it will trigger when the DOM is loaded (aka upon visitng the webpage)
addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("https://equinox-backend.glitch.me/api/songs");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const songs = await response.json();
        
        let html = "";
        for (let song of songs) {
            html += `<li>${song.title} - ${song.artist} - ${song.genre}</li>`;
        }
        
        document.querySelector("ul").innerHTML += html;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
