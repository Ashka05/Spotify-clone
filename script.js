console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Legends Never Die", filePath: "song1.mp3", coverPath: "cover1.jpg"},
    {songName: "Shape Of You", filePath: "song2.mp3", coverPath: "cover2.jpg"},
    {songName: "River", filePath: "song3.mp3", coverPath: "cover3.jpg"},
    {songName: "Love Me Like You Do", filePath: "song4.mp3", coverPath: "cover4.jpg"},
    {songName: "Butter", filePath: "song5.mp3", coverPath: "cover5.jpg"},
]
//audioElement.play()
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//HANDLE PLAY/PAUSE CLICK
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1; // Show the gif when playing
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0; // Hide the gif when paused
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
    });
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add("fa-circle-play");        
        element.classList.remove("fa-circle-pause");
    });
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `song${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName; // Update the song name
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1; // Show the gif when a song is played
    });
});
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 4){
        songIndex = 0;
    } else{
        songIndex += 1;
    }
    audioElement.src = `song${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName; // Update the song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1; // Show the gif when a song is played
});
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    } else{
        songIndex -= 1;
    }
    audioElement.src = `song${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName; // Update the song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1; // Show the gif when a song is played
});