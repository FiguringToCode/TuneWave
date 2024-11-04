console.log("Let's Write Javascript !!!");
let currentSong = new Audio()
let songs;

function secondsToMinutesSeconds(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    // Pad with zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    // Return the formatted string
    return `${formattedMinutes}:${formattedSeconds}`;
  }


const getSongs = async () => {
    let files = await fetch("https://figuringtocode.github.io/TuneWave/songs")
    let response = await files.text()
    let div = document.createElement("div")
    div.innerHTML = response

    const songs = []
    let as = div.getElementsByTagName("a")
    for( i = 0; i < as.length; i++){
        const element = as[i]
        if(element.href.endsWith(".mp3")){
            // songs.push(element.href)
            const clearUrl = element.href.slice(38) 
            const replace = clearUrl.replaceAll("%20", " ")
            songs.push(replace)
        }
    }
    return songs
}


const main = async () => {

    // Get the list of all songs :- 
    songs = await getSongs()
    console.log(songs);
    


    // Attach an event listener to each song :- 
    Array.from(document.querySelector(".pl-card").getElementsByClassName("card-style")).forEach(e => {
        e.addEventListener("click", element => {
            let clickedSong = e.querySelector(`h3`).innerHTML 
            console.log(clickedSong);

            for( i = 0; i < songs.length; i++){
                if(songs[i].includes(clickedSong)){
                    // var audio = new Audio("/songs/" + songs[i])
                    currentSong.src = /songs/ + songs[i]
                    currentSong.play()
                    document.querySelector(".songInfo").innerHTML = `<img src="${e.querySelector("img").src}" width="50vw"> ${e.querySelector("h3").innerHTML} / ${e.querySelector("p").innerHTML}`
                }
            }
            play.src = "Logos/pause.svg"
        })
    })



    // Attach event listener to control buttons :- 
    // Play Button :- 
    play.addEventListener("click", () => {
        if(currentSong.paused){
            currentSong.play()
            play.src = "Logos/pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "Logos/play.svg"
        }
    })

    // Next Button :- 
    next.addEventListener("click", () => {
        console.log("next clicked");
        let index = songs.indexOf(currentSong.src.slice(28).replaceAll("%20", " ")) 
        
        if((index + 1) < songs.length){
            currentSong.src = /songs/ + songs[index + 1]
            currentSong.play()
        }
        console.log(currentSong.src.slice(28).replaceAll("%20", " "), index);
    })

    // Previous Button :-
    previous.addEventListener("click", () => {
        console.log("previous clicked");
        let i = songs.indexOf(currentSong.src.slice(28).replaceAll("%20", " "))

        if((i - 1) >= 0){
            currentSong.src = /songs/ + songs[i - 1]
            currentSong.play()
        }
    })

    // Volume Button :-
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("click", e => {
        console.log(e, e.target, e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100
    })


    // Attach event listener for time update, songTime and songInfo:- Jaise update ho 2 cheez currentSong.addEventListener report karo. 1st currentSong ka time update, 2nd song ka duration.
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".currentTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}`
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.marginLeft = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })



    // Attach event listener to seekbar :- 
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.marginLeft = percent + "%"
        currentSong.currentTime = (currentSong.duration * percent) /100
    })

}
main();
