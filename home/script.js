function convertToVec4(rgb) {
    const output = []
    for(value in rgb) {
        output.push(DeBread.round(rgb[value]/255,3))
    }

    return output
}

// const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
// const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
// let newYearsTrigger = false

// function updateDate() {
//     const now = new Date()

//     doge('dateDay').innerText = days[now.getDay()]
//     doge('dateDate').innerText = now.getDate()
//     doge('dateMonth').innerText = months[now.getMonth()]

//     const date = {
//         months: now.getMonth(),
//         days: now.getDate(),
//         hours: now.getHours(),
//         minutes: now.getMinutes(),
//         seconds: now.getSeconds(),
//     }

//     const dayProgress = (
//         date.hours + 
//         (date.minutes / 60) + 
//         (date.seconds / 3600)) / 24

//     doge('dateDayPercent').innerText = DeBread.round(dayProgress * 100,2) + '%'
//     doge('dateDayBar').style.width = dayProgress * 100 + '%'

//     function getMonthLength(year, month) {
//         return new Date(year, month + 1, 0).getDate()
//     }  

//     const monthLength = getMonthLength(now.getFullYear(), date.months)
//     const monthProgress = (date.days - 1 + dayProgress) / monthLength
//     doge('dateMonthPercent').innerText = DeBread.round(monthProgress * 100,2) + '%'
//     doge('dateMonthBar').style.width = monthProgress * 100 + '%'

//     const startOfYear = new Date(now.getFullYear(), 0, 1)
//     const endOfYear = new Date(now.getFullYear(), 11, 31)

//     const dayOfYear = (now - startOfYear) / 86400000
//     const yearLength = (endOfYear - startOfYear) / 86400000

//     const yearProgress = dayOfYear / (yearLength + 1)
    
//     doge('dateYearPercent').innerText = DeBread.round(yearProgress * 100,2) + '%'
//     doge('dateYearBar').style.width = yearProgress * 100 + '%'

//     if(dayProgress <= 0.15) {
//         getAchievement('afterhours')
//     }

//     if(DeBread.round(yearProgress,3) === 0 && !newYearsTrigger) {
//         for(let i = 0; i < globalDate.getFullYear() - 2000; i++) {
//             setTimeout(() => {
//                 createConfetti()
//             }, i * 250);
//         }
//         fellaClick('Man you should be out celebrating right now, not sitting on my website 😭', true)
//         newYearsTrigger = true
//     }
// } setInterval(updateDate, 1000)

const confettiBase = document.createElement('div')
addStyles(confettiBase, {
    width: '10px',
    height: '5px',
    backgroundColor: 'red',
    position: 'absolute',
    transition: 'opacity ease-in-out 1s',
    animation: 'confettiSpin 3s ease-out 1 forwards'
})

function createConfetti() {
    const randomPos = [DeBread.randomNum(100, window.innerWidth - 100),DeBread.randomNum(100, window.innerHeight - 100)]
    
    for(let i = 0; i < 10; i++) {
        const confetti = confettiBase.cloneNode()
        confetti.classList.add('confetti')
        confetti.pos = [randomPos[0], randomPos[1]]
        confetti.speed = DeBread.randomNum(3,15)
        confetti.grav = 0
        confetti.angle = DeBread.randomNum(0,Math.PI*2,5)
        confetti.style.setProperty('--confettiSpin',DeBread.randomNum(-360*3,360*3)+'deg')
        
        addStyles(confetti, {
            backgroundColor: `hsl(${DeBread.randomNum(250,300)},100%,90%)`,
            left: confetti.pos[0]+'px',
            top: confetti.pos[1]+'px',
            rotate: confetti.angle + 'rad'
        })

        setTimeout(() => {
            confetti.style.opacity = '0'
            setTimeout(() => {
                confetti.remove()
            }, 1000);
        }, 2000);
    
        doge('confettiContainer').append(confetti)
    }
}

//Birthday
setTimeout(() => {
    const years = globalDate.getFullYear() - 2007
    if(globalDate.getMonth() === 11 && globalDate.getDate() === 8) {
        for(let i = 0; i < years; i++) {
            setTimeout(() => {
                createConfetti()
            }, (2000 / years) * i);
        }
    }
}, 1000);

if(globalDate.getMonth() === 11) {
    doge('fella').src = '../media/fellaChristmas.png'
}

setInterval(() => {
    doge('confettiContainer').querySelectorAll('.confetti').forEach(confetti => {
        confetti.pos[0] += Math.cos(confetti.angle) * confetti.speed
        confetti.pos[1] += (Math.sin(confetti.angle) * confetti.speed) + confetti.grav

        confetti.speed /= 1.05
        confetti.grav += 0.1

        addStyles(confetti, {
            left: confetti.pos[0]+'px',
            top: confetti.pos[1]+'px'
        })
    })
}, 25);

function scrollToElem(elem) {
    elem.scrollIntoView({behavior: 'smooth',block: 'center'})
    const previousOutline = elem.style.getPropertyValue('outline')

    setTimeout(() => {        
        elem.style.transition = 'outline ease-in-out 250ms'
        elem.style.outline = '5px solid var(--accent)'
        setTimeout(() => {
            elem.style.outline = previousOutline
        }, 1500);
    }, 250);
}

const featuredDrawings = {
    Angelos: 1,
    Baxter: 1,
    Case: 1,
    Cherry: 1,
    Chow: 2,
    Dottr: 5,
    Erix: 1,
    HallowArtis: 1,
    Millards: 2,
    Nex: 1,
    Ozzy: 2,
    Plonk: 5,
    Skact: 1,
    sevenxstarz: 2,
    TrueSkywalkr: 1,
    Unknown: 2,
}

function getRandomFAOTDList() {
    let list = []
    for(const artist in featuredDrawings) {
        for(let i = 0; i < featuredDrawings[artist]; i++) {
            list.push({artist: artist, num: i})
        }
    }
    
    for(let i = 0; i < list.length; i++) {
        let j = DeBread.randomNum(0,i);
        
        [list[i], list[j]] = [list[j], list[i]]
    }

    return list
}

const randomFeaturedDrawings = [
  {
    "artist": "Baxter",
    "num": 0
  },
  {
    "artist": "Angelos",
    "num": 0
  },
  {
    "artist": "Ozzy",
    "num": 0
  },
  {
    "artist": "HallowArtis",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 3
  },
  {
    "artist": "Nex",
    "num": 0
  },
  {
    "artist": "sevenxstarz",
    "num": 0
  },
  {
    "artist": "Dottr",
    "num": 0
  },
  {
    "artist": "Cherry",
    "num": 0
  },
  {
    "artist": "Millards",
    "num": 1
  },
  {
    "artist": "chow",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 1
  },
  {
    "artist": "chow",
    "num": 1
  },
  {
    "artist": "Dottr",
    "num": 1
  },
  {
    "artist": "Ozzy",
    "num": 1
  },
  {
    "artist": "TrueSkywalkr",
    "num": 0
  },
  {
    "artist": "Dottr",
    "num": 3
  },
  {
    "artist": "Unknown",
    "num": 1
  },
  {
    "artist": "sevenxstarz",
    "num": 1
  },
  {
    "artist": "Dottr",
    "num": 4
  },
  {
    "artist": "Dottr",
    "num": 2
  },
  {
    "artist": "Unknown",
    "num": 0
  },
  {
    "artist": "Case",
    "num": 0
  },
  {
    "artist": "Erix",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 2
  },
  {
    "artist": "Skact",
    "num": 0
  },
  {
    "artist": "Millards",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 4
  }
]

function updateFAOTD() {
    const drawingIndex = (globalDate.getDate() - 1) % randomFeaturedDrawings.length
    // const drawingIndex = DeBread.randomNum(0,randomFeaturedDrawings.length-1)
    doge('faotdImg').src = `../media/featuredDrawings/${randomFeaturedDrawings[drawingIndex].artist}/${randomFeaturedDrawings[drawingIndex].num}.png`
    doge('faotdArtist').innerText = 'Drawn by: ' + randomFeaturedDrawings[drawingIndex].artist

    doge('faotdImg').onclick = () => {
        openImage(
            `${randomFeaturedDrawings[drawingIndex].artist}/${randomFeaturedDrawings[drawingIndex].num}.png`,
            'Drawn by: ' + randomFeaturedDrawings[drawingIndex].artist,
            `../media/featuredDrawings/${randomFeaturedDrawings[drawingIndex].artist}/${randomFeaturedDrawings[drawingIndex].num}.png`
        )

        getAchievement('fanart')
    }
} updateFAOTD()

const fellaTexts = [
    'Hi',
    'Imagine if there was a secret game here...',
    'I\'ve made this website like 8 times now.',
    'Check this out <br><img src="../media/buddy.png" width=100>',
    'Imma be a one-man cheeseburger apocalypse',
    `<span style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; font-size: 1.25em; color: rgb(254, 151, 1); text-shadow: 1px 0 0 #813300,0 1px 0 #c14d00,2px 1px .35px #813300,1px 2px .35px #c14d00,3px 2px .35px #813300,2px 3px .35px #c14d00,4px 3px .35px #813300,3px 4px .35px #c14d00,5px 4px .35px #813300,4px 5px .35px #c14d00,6px 5px .35px #813300,5px 6px .35px #c14d00,7px 6px .35px #813300,6px 7px .35px #c14d00;">Send me a drawing.</span>`,
    'I\'m good at programming just trust',
    'Throw rocks at homeless people',
    'I need my big lolipop',
    'I love playing with my choo choo train',
    'I gotta go to bed',
    `I\'m ${globalDate.getFullYear() - 2008} years old and I've already wasted my entire life`,
    'Tombstone pizzas 🥹',
    `${globalDate.getFullYear()+1} will be my year trust`,
    'Clicking me like an 8 ball',
    'I\'d like to bring the fishing minigame back',
    '<img src="../media/peep.png">',
    'Fuck the orange man'
] 

let fellaTimesClicked = 0
function fellaClick(talk, giggle) {
    fellaTalk(talk ?? fellaTexts[DeBread.randomNum(0,fellaTexts.length-1)])
    data.fellaClicks++
    if(data.fellaClicks >= 100) {
        getAchievement('raccoon')
    }

    if(giggle) {
        doge('fella').style.scale = '1.05 0.95'
        doge('fella').style.translate = '0px 10px'
        setTimeout(() => {
            doge('fella').style.scale = ''
            doge('fella').style.translate = ''
        }, 50);
    }
}

let textboxTimeout
function fellaTalk(text) {
    clearInterval(textboxTimeout)
    doge('fellaTextbox').style.transition = 'none'
    doge('fellaTextbox').style.opacity = '1'
    doge('fellaTextboxBody').innerHTML = text

    textboxTimeout = setTimeout(() => {
    doge('fellaTextbox').style.transition = 'opacity ease-in-out 500ms'
        doge('fellaTextbox').style.opacity = '0'
    }, 5000);
}

setTimeout(() => {
    if(globalDate.getMonth() === 11) {
        if(globalDate.getDate() === 8) {
            fellaClick('Birthday time :))', true)
        } else if(globalDate.getDate() === 25) {
            fellaClick('Merry Christmas!!', true)
        } else {
            fellaClick(['Ah! so jolly!','Ho ho ho ! ‼️'][DeBread.randomNum(0,1)], true)
        }
    }
}, 1000);

function renderAchievements() {
    doge('innerAchievementsContainer').innerHTML = ''
    let achGot = 0
    for(const key in achievements) {
        const ach = achievements[key]

        const card = document.createElement('div')
        card.classList.add('achievementListItem')
        card.innerHTML = `
            <img src="../media/icons/achievement.png">
            <div class="achievementListItemInfo">
                <span>${ach.name}</span>
                <span>${ach.desc}</span>
            </div>
        `

        if(!data.achievementsGot.includes(key)) {
            card.style.filter = 'brightness(50%)'
            card.querySelector('.achievementListItemInfo span:nth-child(2)').innerHTML = '???'
        } else {
            achGot++
        }

        doge('innerAchievementsContainer').append(card)
    }

    doge('innerAchievementsBar').style.width = achGot / Object.keys(achievements).length * 100 + '%'
    doge('achievementsBarProgress').innerText = `${achGot} / ${Object.keys(achievements).length}`

    if(achGot === Object.keys(achievements).length) {
        doge('achievementsBarProgress').innerText = `you're did it`
    }

}

function openAchievements() {
    doge('achievementsContainer').style.display = 'flex'
    renderAchievements()
}

//MUSIC PLAYER
const tracks = {
    carnation: {
        name: 'carnation',
        artist: 'AAAA',
        hit: [187,220]
    },
    TV_WORLD: {
        name: 'TV WORLD',
        artist: 'Toby Fox',
        hit: [60,100]
    },
    Tutorial: {
        name: 'Tutorial',
        artist: 'Dorkus64',
        hit: [0,0]
    },
    The_End_of_All_Seasons: {
        name: 'The End of All Seasons',
        artist: 'mashall h',
        hit: [284,340]
    },
    Ocean_Glaze: {
        name: 'Ocean Glaze',
        artist: 'Lifeformed, Janice Kwan',
        hit: [110,150]
    },
    Walls_of_Denial: {
        name: 'Walls of Denial',
        artist: 'Ridiculon',
        hit: [127,261]
    },
    FINAL_BLENDERMAN_APPEARED: {
        name: 'FINAL BLENDERMAN APPEARED',
        artist: 'Camellia, RichaadEB',
        hit: [192, 245]
    },
    NUCLEAR_STAR: {
        name: 'NUCLEAR STAR',
        artist: 'Camellia',
        hit: [193, 253]
    },
    Sketches_of_Pain: {
        name: 'Sketches of Pain',
        artist: 'Ridiculon',
        hit: [141,290],
    },
    The_Shattering_Circle: {
        name: 'The Shattering Circle, or: A Charade of... ',
        artist: 'Heaven Pierce Her',
        hit: [83,105],
    },
    Ascension_to_Heaven: {
        name: 'Ascension to Heaven',
        artist: 'xi',
        hit: [83,126],
    },
    Box_in_a_Box: {
        name: 'Box in a Box',
        artist: 'Daniel Pemberton',
        hit: [180,265],
    },
    Time_Go_Fishing: {
        name: 'Time Go Fishing',
        artist: 'Daniel Pemberton',
        hit: [180,265],
    },
    Centrifuge: {
        name: 'Centrifuge',
        artist: 'Daniel Pemberton',
        hit: [27,85],
    },
    Dragon_Driftway: {
        name: 'Dragon Driftway',
        artist: 'Kenta Nagata',
        hit: [0,0],
    },
    // jaden: {
    //     name: 'jaden',
    //     artist: 'jaden',
    //     hit: [15,18]
    // },
    // please_do_not_listen_to_this_song: {
    //     name: 'please do not listen to this song',
    //     artist: 'AZALI',
    //     hit: [90, 135]
    // },
}

let musicProgress
let currentTrack
let musicPaused = true
let currentSong = 'carnation'
let isSeeking = false

function startTrack(track) {
    const audio = doge('musicPlayerAudio')
    audio.src = `../media/music/${track}/audio.mp3`
    
    audio.volume = 0.1
    audio.playbackRate = 0.5
    audio.preservesPitch = false
    currentTrack = track
    audio.play()

    updateTrackInfo(track)
}

function openTrack(track) {
    const audio = doge('musicPlayerAudio')
    audio.src = `../media/music/${track}/audio.mp3`
    audio.volume = 0.25
    currentTrack = track
    audio.pause()
    musicPaused = true
    doge('musicControllsPauseButtonImg').src = '../media/icons/play.png'

    updateTrackInfo(track)

    const data = tracks[track]
    doge('musicPlayerAudio').onloadedmetadata = () => {
        doge('musicControllsRangeHit').style.width = (data.hit[1]-data.hit[0]) / audio.duration * 100 + '%'
        doge('musicControllsRangeHit').style.left = data.hit[0] / audio.duration * 100 + '%'
    }

    updateTrackVolume(true)
    updateTrackSpeed(true)
} openTrack('carnation')

function updateTrackInfo(track) {
    doge('musicPlayerAlbum').src = `../media/music/${track}/cover.png`
    doge('musicPlayerAlbum').onclick = () => {
        openImage(tracks[track].name, `By: ${tracks[track].artist}`,`../media/music/${track}/cover.png`)
    }
    doge('musicPlayerTitle').innerText = tracks[track].name
    doge('musicPlayerArtist').innerText = tracks[track].artist
}

function toggleTrack() {
    const audio = doge('musicPlayerAudio')

    if(musicPaused) {
        audio.play()
        musicPaused = false
        doge('musicControllsPauseButtonImg').src = '../media/icons/pause.png'
    } else {
        audio.pause()
        musicPaused = true
        doge('musicControllsPauseButtonImg').src = '../media/icons/play.png'
    }
}

doge('musicPlayerAudio').preservesPitch = false
setInterval(() => {
    const audio = doge('musicPlayerAudio')

    doge('musicControllsRange').max = audio.duration * 10

    if(!isSeeking) {
        doge('musicControllsRange').value = audio.currentTime * 10
    }
    doge('musicCurrentTime').innerText = formatTime(DeBread.round(audio.currentTime))
    doge('musicDuration').innerText = formatTime(DeBread.round(audio.duration))
}, 100);

doge('musicControllsRange').addEventListener('change', ev => {
    const audio = doge('musicPlayerAudio')
    audio.currentTime = doge('musicControllsRange').value / 10
})

doge('musicControllsRange').addEventListener('mousedown', ev => {isSeeking = true})
doge('musicControllsRange').addEventListener('mouseup', ev => {isSeeking = false})
doge('musicControllsRange').addEventListener('wheel', ev => {
    const audio = doge('musicPlayerAudio')
    if(ev.deltaY < 0) { //up
        doge('musicControllsRange').value = parseInt(doge('musicControllsRange').value)+10
    } else { //down
        doge('musicControllsRange').value = parseInt(doge('musicControllsRange').value)-10
    }
    audio.currentTime = doge('musicControllsRange').value / 10
    ev.preventDefault()
})

let volumeUpdateInterval
doge('musicControllsVolume').addEventListener('mousedown', ev => {
    volumeUpdateInterval = setInterval(updateTrackVolume, 25)
})
doge('musicControllsVolume').addEventListener('mouseup', ev => {
    clearInterval(volumeUpdateInterval)
    setTimeout(() => {
        doge('tooltip').style.display = 'none'
    }, 1000);
})
doge('musicControllsVolume').addEventListener('change', updateTrackVolume)

function updateTrackVolume(hideTooltip) {
    const volume = doge('musicControllsVolume').value
    doge('musicPlayerAudio').volume = volume
    if(!hideTooltip) {
        updateTrackTooltip('Volume',doge('musicPlayerAudio').volume)
    }

    if(volume >= 0.5) {
        if(volume == 1) {
            DeBread.easeShake(doge('musicPlayerVolumeIcon'), 25, 2, 0.01)
            if(!doge('musicPlayerAudio').paused) {
                getAchievement('hearingProblems')
            }
        }
        doge('musicPlayerVolumeIcon').src = '../media/icons/volume2.png'
    } else if(volume > 0) {
        doge('musicPlayerVolumeIcon').src = '../media/icons/volume1.png'
    } else {
        doge('musicPlayerVolumeIcon').src = '../media/icons/volume0.png'
    }
}

let fellaSpeedTalk = false

let speedUpdateInterval
doge('musicControllsSpeed').addEventListener('mousedown', ev => {
    speedUpdateInterval = setInterval(updateTrackSpeed, 25);
})
doge('musicControllsSpeed').addEventListener('mouseup', ev => {
    clearInterval(speedUpdateInterval)
    setTimeout(() => {
        doge('tooltip').style.display = 'none'
    }, 1000);
})

doge('musicControllsSpeed').addEventListener('change', ev => {
    updateTrackSpeed()

    if(!fellaSpeedTalk) {
        fellaClick('Y\'know, it should be standard for music players to have a speed slider. It\'s pretty cool.', true)
        fellaSpeedTalk = true
    }
})

function updateTrackSpeed(hideTooltip) {
    doge('musicPlayerAudio').playbackRate = doge('musicControllsSpeed').value

    if(!hideTooltip) {
        updateTrackTooltip('Speed',doge('musicPlayerAudio').playbackRate)
    }
}

function updateTrackTooltip(label, value) {
    tooltip([doge('musicPlayerFooter').getBoundingClientRect().left,doge('musicPlayerFooter').getBoundingClientRect().top],`${label}: ${value}`, false)
}

function loadTracks() {
    doge('trackListContainer').innerHTML = ''
    for(const key in tracks) {
        const audio = new Audio(`../media/music/${key}/audio.mp3`)
        const listTrack = document.createElement('div')
        listTrack.classList.add('track')
    
        audio.onloadeddata = () => {
            listTrack.innerHTML = `
                <div style="display: flex; gap: 5px;">
                    <img src="../media/music/${key}/cover.png">
                    <div class="trackInfo">
                        <span>${tracks[key].name}</span>
                        <span>${tracks[key].artist}</span>
                    </div>
                </div>
                <span>${formatTime(DeBread.round(audio.duration))}</span>
            `
        
            doge('trackListContainer').append(listTrack)
            listTrack.onclick = () => {openTrack(key)}
        }
    }
}

doge('realRacc').offset = 10
function realClick() {
    getAchievement('look')
    
    const racc = doge('realRacc')
    clearInterval(racc.interval)

    racc.src = '../media/realJump.png'

    racc.vel =- 10
    racc.interval = setInterval(() => {
        racc.vel++
        racc.offset += racc.vel
        racc.style.translate = `0px ${racc.offset}px`

        if(racc.getBoundingClientRect().top >= window.innerHeight) {
            clearInterval(racc.interval)
            racc.style.pointerEvents = 'none'
            racc.style.opacity = '0'
        }

        if(racc.offset <= -140) {
            getAchievement('volleyball')
        }
    }, 25);
}

//Get mc server members
let mcServerData
let mcServerDataTooltip = 'fetching...'

function refreshServerInfo() {
    fetch('https://api.mcsrvstat.us/2/debread.space')
    .then(res => res.json())
    .then(data => {
        mcServerData = data
        if(data.debug.error && false) {
            doge('onlineMemberCount').innerText = 'Error'
            doge('onlineMemberCircle').style.backgroundColor = 'red'
            mcServerDataTooltip = data.debug.error.query
        } else if(data.online) {
            doge('onlineMemberCount').innerText = data.players.online + ' Online'
            doge('onlineMemberCircle').style.backgroundColor = 'lime'

            mcServerDataTooltip = `${data.players.online}/${data.players.max} members online<br>`
            for(const key in data.players.list) {
                mcServerDataTooltip += '<br>'+data.players.list[key]
            }
        } else {
            doge('onlineMemberCount').innerText = 'Server down'
            doge('onlineMemberCircle').style.backgroundColor = 'red'
            mcServerDataTooltip = 'Server is currently offline.'
        }
    })
    
    doge('serverMemberCount').onmouseenter = () => {
        const rect = doge('serverMemberCount').getBoundingClientRect()
        tooltip([rect.left + doge('serverMemberCount').offsetWidth / 2, rect.bottom + 10], mcServerDataTooltip, true)
    }

    doge('serverMemberCount').onmouseleave = () => {
        doge('tooltip').style.display = 'none'
    }
} refreshServerInfo()
setInterval(refreshServerInfo, 60000);

const randomImages = [
    [ //Common
        {name:'ImJustJAG',url:'https://cdn.discordapp.com/attachments/915237360357228594/1529671187779551242/barry-larrys-brother-v0-9eb5mbgq95gg1.png?ex=6a62c8cf&is=6a61774f&hm=0435ea9a844d838dcdbf0b8fbb7e6e44c809eb24fdc1b85d0e35c9401a20a5f7&'},
        {name:'ImJustJAG',url:'https://media.discordapp.net/attachments/915237360357228594/1529671763649368104/Screenshot_20241026_235020_Instagram.jpg?ex=6a62c958&is=6a6177d8&hm=712de7905e2bc04e7f5f20e3b2d86e2944dc7dbe2894643e541a3d8d0ce51652&=&format=webp&width=863&height=699'},
        {name:'ImJustJAG',url:'https://media.discordapp.net/attachments/915237360357228594/1529671188899565618/20251012_101620.jpg?ex=6a62c8cf&is=6a61774f&hm=8de45c9216935fd826a7b5e7194a6dc6c5c63675cd0b8a5c2997348fcbcef1b0&=&format=webp&width=307&height=102'},
        {name:'Remagworc',url:'https://cdn.discordapp.com/attachments/1454725132349214776/1529677984741457951/20250708_202106.jpg?ex=6a62cf23&is=6a617da3&hm=d8990ec902c93ee888820674dc5431d2560ecc1ae94a86b4f871c02010e52d17&'},
        {name:'ImJustJAG',url:'https://media.discordapp.net/attachments/915237360357228594/1529671765163245578/20240306_153624.jpg?ex=6a62c958&is=6a6177d8&hm=9362c24eafe346ab3c776db8be6edc72eb33d226d22e9406d677a51a5fc2d3df&=&format=webp&width=494&height=596'},
        {name:'ImJustJAG',url:'https://cdn.discordapp.com/attachments/915237360357228594/1529671766409220208/20230427_144500.jpg?ex=6a62c959&is=6a6177d9&hm=06bf3b632da9392c7b62ca1f82e78ff9b171ef175c10a11b5ed49f98a53a5966&'},
        {name:'Jake',url:'https://media.discordapp.net/attachments/915236794327515177/1518435055775645826/sgdgs.webp?ex=6a62c6d8&is=6a617558&hm=8fe5c66279cce729c429d6e8e36e8304cbc03a69505633333c020efbbf4f41a3&=&format=webp&width=410&height=410'},
        {name:'ImJustJAG',url:'https://media.discordapp.net/attachments/915238194759487518/1527453060362670091/20260716_181237.jpg?ex=6a62a004&is=6a614e84&hm=ac39756adc434fba6f0a3a8108882b9093657fcd08657a0adae820eb9b720243&=&format=webp&width=1026&height=869'},
        {name:'DeBread',url:'https://media.discordapp.net/attachments/915238249465774120/1522825419412209664/image.png?ex=6a6244f0&is=6a60f370&hm=b98e90daed9418ef46b43df081470f48a65f7b3951c70fc0f4f4169177187403&=&format=webp&quality=lossless&width=720&height=565'},
        {name:'Plinkel',url:'https://cdn.discordapp.com/attachments/915239044022161439/1503496095278563479/ellie_true_alabama_patriot.png?ex=6a627b5a&is=6a6129da&hm=7a1b0292a4e50a70feabb6b1185773ba347deb8a9c1dffb097af0aadd647ed31&'},
        {name:'Slz²',url:'https://media.discordapp.net/attachments/1528137209700421653/1529944078568132628/frogg.jpg?ex=6a63c6f5&is=6a627575&hm=7180caf444551f027556c086e5a17c306656ab3ed000789ab1f99c2e49da374a&=&format=webp&width=958&height=753'},
        {name:'IcedCata',url:'https://media.discordapp.net/attachments/870486901621149726/1529977315503640636/angry-hillbilly-with-shotgun-and-moonshine-on-a-white-background-GEE142.jpg?ex=6a63e5e9&is=6a629469&hm=11da7d5d5657d6ec272cd38099581b658f7fa5b5b2037b6f0a860b50dbc5fefc&=&format=webp&width=693&height=1112'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265538377552002/IMG_1696.jpg?ex=6a64f257&is=6a63a0d7&hm=5da710fe82aeac0997a57554b1697725de8cf95b3a64b6fc9eabf6c173824a34&=&format=webp&width=576&height=650'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265540457664605/IMG_4218.png?ex=6a64f257&is=6a63a0d7&hm=be473c3f0ecc8f7ab2a307ea8154d62ad7971f1715ef234b094176585164b54a&=&format=webp&quality=lossless&width=936&height=725'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265540768174310/IMG_4188.png?ex=6a64f257&is=6a63a0d7&hm=9e15e889668187d8b0c1c5af1b2829affe1c7310116b7eb2d8509f450cdae0f9&=&format=webp&quality=lossless&width=762&height=746'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265542194233424/IMG_3946.jpg?ex=6a64f258&is=6a63a0d8&hm=5cc520fd4abc3487d71a30ae4ae4d58045883e62280549847b3d735099c02637&=&format=webp&width=864&height=523'}
    ],
    [ //Uncommon
        {name:'ImJustJAG',url:'https://cdn.discordapp.com/attachments/915237360357228594/1529671190983999578/20250615_103448.jpg?ex=6a62c8cf&is=6a61774f&hm=b14f4d115eb354fe95be58e45fb001116701f960f094139ec15455010d6ed89d&'},
        {name:'ImJustJAG',url:'https://media.discordapp.net/attachments/915237360357228594/1529671764265664692/Screenshot_20241014_143211_Discord.jpg?ex=6a62c958&is=6a6177d8&hm=5d6127902ed7aa5ac9334b2254f004c108a92efe6950a504c0ae5e2d6163ff2c&=&format=webp&width=626&height=835'},
        {name:'Remagworc',url:'https://media.discordapp.net/attachments/1454725132349214776/1529675843075309758/Screenshot_20241204_020215_DuckDuckGo.jpg?ex=6a62cd24&is=6a617ba4&hm=6aae9a1f0ebc4737615ba038984d1401850b82231363450770ef82375421b34f&=&format=webp&width=864&height=894'},
        {name:'DeBread',url:'https://media.discordapp.net/attachments/922225845307834428/1525940051866025994/IMG_7184.jpg?ex=6a6264ea&is=6a61136a&hm=dcbbbedf93670e05ff4497cccfcd134415f232ae1c6004f2b25351d2a44f678f&=&format=webp&width=974&height=1731'},
        {name:'DeBread',url:'https://media.discordapp.net/attachments/915237360357228594/1519705203295654061/SPOILER_image0.jpg?ex=6a62c883&is=6a617703&hm=f3e79173832f37a70cdaff266334753a60639106ba155a0e6ef626bdb81aafe3&=&format=webp&width=792&height=690'},
        {name:'DeBread',url:'https://media.discordapp.net/attachments/915239044022161439/1517772610774110318/IMG_5280.jpg?ex=6a625825&is=6a6106a5&hm=c1bfcd7b65608de1776741a21254aeac20db1e5bd31ac8bfc71cb68eac4ba23d&=&format=webp&width=1042&height=1389'},
        {name:'ImJustJAG',url:'https://media.discordapp.net/attachments/915238194759487518/1517754109158097037/a-true-local-legend-returns-to-the-same-tampa-sidewalk-v0-210m0nqnjm7e1.png?ex=6a6246ea&is=6a60f56a&hm=e21e73ade86a5940b9abe16bf694a2fc7a5dc9343bdb56a1768528efdd41bde6&=&format=webp&quality=lossless&width=645&height=644'},
        {name:'DeBread',url:'https://cdn.discordapp.com/attachments/915239044022161439/1504974707387007096/HHLv3h2XIAAnxNc.png?ex=6a62966b&is=6a6144eb&hm=42f7982829f9fd8bc7759992253b5c36901bd7f656fbcd7239e03e6ee9a8e12c&'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/915239044022161439/1504544377127567632/image.png?ex=6a625724&is=6a6105a4&hm=58ad388a2e0485a17bc3bb03bd5472d7ed83fa53d15b2d46ad5cd6586e5b8e04&=&format=webp&quality=lossless&width=186&height=191'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1529852540399648799/IMG_1557.jpg?ex=6a6371b4&is=6a622034&hm=7852def260fcc92f890fcd97e352682b239d3a2d3bda7c18d4f105f86479fad8&=&format=webp&width=734&height=1024'},
        {name:'Slz²',url:'https://media.discordapp.net/attachments/1528137209700421653/1529944078202966217/whatthefuckdoido.png?ex=6a63c6f5&is=6a627575&hm=bb1fda59166852dce7c80cc58d8b64931987ef62db62a0b326bf5fc449431105&=&format=webp&quality=lossless&width=398&height=214'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265538905768023/IMG_1384.jpg?ex=6a64f257&is=6a63a0d7&hm=49dbf0a05a2be77e54f8612389b7019ee72a4f02d6bfa35990a3880eda6ae47b&=&format=webp&width=864&height=824'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265541565222922/IMG_4171.png?ex=6a64f258&is=6a63a0d8&hm=1ca7354ca4039d6706a106f1258efa4acf48ff65d4c5b6813a70123a83d0bfdf&=&format=webp&quality=lossless&width=936&height=922'}
    ],
    [ //Rare
        {name:'ImJustJAG',url:'https://media.discordapp.net/attachments/915237360357228594/1529671765813624912/20231220_192637.jpg?ex=6a62c958&is=6a6177d8&hm=b81912d3c3f31e9bb03d8fb6e872c017bf95cbffaafe4317ae99204569b5afb1&=&format=webp&width=717&height=747'},
        {name:'Plinkel',url:'https://media.discordapp.net/attachments/915237360357228594/1508528310286684271/HJCagtWWgAAc6Ie.webp?ex=6a6254f8&is=6a610378&hm=e86970abe8d37e1d6aff92b29f0cbcdc22277132c1b83c5578198fbcbe575b1c&=&format=webp&width=544&height=408'},
        {name:'Remagworc',url:'https://cdn.discordapp.com/attachments/1454725132349214776/1529676610750513263/df76878ee3abf32e18e3db4f6a24a16d76bde900c5f4a672c0e40cd8ecdd99ba_1.png?ex=6a62cddc&is=6a617c5c&hm=0eb35c7229904837bdf608ce64e9dcd8bc1812b92122bdb599491fbfc6a5316f&'},
        {name:'ImJustJAG',url:'https://cdn.discordapp.com/attachments/915237360357228594/1529671189373517864/20250914_174058.jpg?ex=6a62c8cf&is=6a61774f&hm=f5dae34c7c604d857d5d7b372a720afcb3297c4b233ead0efe6830a9fe24c81a&'},
        {name:'DeBread, Dottr',url:'https://media.discordapp.net/attachments/915239044022161439/1522853896404471808/image.png?ex=6a625f76&is=6a610df6&hm=9e566b6e1330f1ff83ce5601152777d64a223524d22874e0a487a9ba3ea87aad&=&format=webp&quality=lossless&width=586&height=619'},
        {name:'DeBread',url:'https://media.discordapp.net/attachments/922225845307834428/1510708380510191736/IMG_6978.jpg?ex=6a625a51&is=6a6108d1&hm=6bd91fc637054b86324b68919999bc15be8c71a7f07a84ccdeac616ee68c521d&=&format=webp&width=974&height=1731'},
        {name:'DeBread, Jake',url:'https://media.discordapp.net/attachments/915239044022161439/1509087756087853109/image.png?ex=6a6263be&is=6a61123e&hm=1fc2ed91123c3908a130c0c3d6ede2b846aab30b40276a4d3f70d389c4cffc15&=&format=webp&quality=lossless&width=551&height=490'},
        {name:'DeBread',url:'https://media.discordapp.net/attachments/915236794327515177/1502920424730656778/image.png?ex=6a625d78&is=6a610bf8&hm=48a87522a7ab5b604ab2609e168d09b582a39646ca51beba14c09c31affb4ba5&=&format=webp&quality=lossless&width=544&height=408'},
        {name:'Kryc8',url:'https://media.discordapp.net/attachments/922225845307834428/1496239064356225044/675763908_972373822009299_1138458531923623714_n.png?ex=6a6272b7&is=6a612137&hm=cace7e6e62b8dcea2e80b788fe5b846e2532d498e432fa46b6d3a9ae05b0b52c&=&format=webp&quality=lossless&width=1042&height=782'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/915239044022161439/1494904346591363243/image.png?ex=6a6234ea&is=6a60e36a&hm=c5eb793bd4176cb25ba26cc182753f786588d97badaf4e2fcc5d9f71f043d252&=&format=webp&quality=lossless&width=604&height=334'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1529852450041761975/IMG_1782.jpg?ex=6a63719f&is=6a62201f&hm=cb5bb47e3cad6151271d067cfb4dc11067f12628557396ba3fd4119a88e3d1e2&=&format=webp&width=452&height=374'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265541795778793/IMG_4101.jpg?ex=6a64f258&is=6a63a0d8&hm=fb94b7a6c35a103dea36b33252e1ca8e6ceb2d0a64c63d39140887556fb3798c&=&format=webp&width=589&height=589'}
    ],
    [ //Epic
        {name:'ImJustJAG',url:'https://cdn.discordapp.com/attachments/915237360357228594/1529671187318182109/20260628_135358.jpg?ex=6a62c8ce&is=6a61774e&hm=b89d3902713ba0fa46bb65d326af0694470574ccca57c6e2256baef1ccebbbbb&'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1529674217640034407/IMG_1772.jpg?ex=6a62cba1&is=6a617a21&hm=be2eb12bfc088866576ecce8a479793fc8aa2a7d253aef151df2917ffb130e35&=&format=webp&width=1042&height=782'},
        {name:'DeBread',url:'https://cdn.yeen.town/public/e2a7d4c4-68ed-4589-9b28-a7ab4c567737.webp'},
        {name:'TrueSkywalkr',url:'https://media.discordapp.net/attachments/1288871905113280554/1529679772743893114/IMG_1989.jpg?ex=6a62d0cd&is=6a617f4d&hm=a5ccde8f9046b556959e9ca01e9b3ad0b1a97d3b5173265c1f7cfd411235561d&=&format=webp&width=1042&height=1389'},
        {name:'DeBread',url:'https://media.discordapp.net/attachments/915239044022161439/1528578398098554940/IMG_7210.jpg?ex=6a62c391&is=6a617211&hm=16692d8a59b73d7b04babd25244780d286a187a20154fcecabf9ce892ec4ac97&=&format=webp&width=1042&height=1389'},
        {name:'Jake',url:'https://media.discordapp.net/attachments/915239044022161439/1509100931373858897/sticker.webp?ex=6a627003&is=6a611e83&hm=0018f1bbb46a67e6e894bc3f9f34d396c9d88e22bc3cd02b8c71fbe73ad215ae&=&format=webp&width=410&height=309'},
        {name:'DeBread, Plonk',url:'https://cdn.discordapp.com/attachments/915239044022161439/1509100409699041410/image.png?ex=6a626f87&is=6a611e07&hm=e93fb7b152d66875794be8061eb8b3e3fad2a113d13339fcffdcd6710f849354&'},
        {name:'DeBread',url:'https://cdn.discordapp.com/attachments/920509203020386304/1508343211314384906/image.png?ex=6a625155&is=6a60ffd5&hm=074857653e2e6219997b9e26231fab46964ab11628b1875e8e6772f3a1d67aaa&'},
        {name:'Dottr',url:'https://cdn.discordapp.com/attachments/915239044022161439/1504681068198887516/9c6ee5010afb2c8e01823903959fb1c9.png?ex=6a622db2&is=6a60dc32&hm=44f17bc0042428461bee1fe3742d00eb61750f786e059d68d0a75ab11dbe5800&'},
        {name:'erix',url:'https://pbs.twimg.com/media/HNgq_FYXIAACYO0?format=jpg&name=large'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265539337785394/IMG_1130.jpg?ex=6a64f257&is=6a63a0d7&hm=23c795d597fae943135d3ac887451dfb1e2abf17fb2dc6f832144f89b681421c&=&format=webp&width=958&height=719'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265540021714954/IMG_0590.jpg?ex=6a64f257&is=6a63a0d7&hm=39ba934c3457ccdcbdee170db7502d6e16036768b1bf19ce71928d907a2ce78d&=&format=webp&width=958&height=1704'},
    ],
    [ //Mythic
        {name:'ImJustJAG',url:'https://media.discordapp.net/attachments/915237360357228594/1529671191424532570/baby-pear.png?ex=6a62c8cf&is=6a61774f&hm=f9c4d090d2df0552c1ad7e1ce2ab5655594bc7996069c0edf6965526f8ef0892&=&format=webp&quality=lossless&width=262&height=398'},
        {name:'DeBread',url:'https://media.discordapp.net/attachments/1468110734679343104/1517949825134628944/IMG_6996.jpg?ex=6a625470&is=6a6102f0&hm=3bbdd5efe329039287204024beaa9b1e5943629f5e7d9dd7497be9996c159741&=&format=webp&width=958&height=1278'},
        {name:'Remagworc',url:'https://cdn.discordapp.com/attachments/1454725132349214776/1528280878755745922/lilguy.jpg?ex=6a62573b&is=6a6105bb&hm=057f14d6daad9085c0a7cc36f91df7d1ed5f922be0c2592c0105a646689dd8a9&'},
        {name:'DeBread, Dottr',url:'https://media.discordapp.net/attachments/915239044022161439/1522856442162319470/wyd.jpg?ex=6a6261d5&is=6a611055&hm=dfdc697745fc3b08fdc3991a50e18ca03b2b95dc3d5f74f69d67311782d72d5a&=&format=webp&width=800&height=800'},
        {name:'Plinkel',url:'https://media.discordapp.net/attachments/915239044022161439/1504690783603654687/20260512_192813.jpg?ex=6a6430fe&is=6a62df7e&hm=c2029177be0a1f21b3dfa093b2e3b030e3b1e466fafd5a92d8b15184f512ecd6&=&format=webp&width=1042&height=1389'},
        {name:'TrueSkywalkr',url:'https://media.discordapp.net/attachments/915239044022161439/1530265345217265787/image.png?ex=6a64f229&is=6a63a0a9&hm=83b22b61e197f7f80a226dc2dff22385205c89c89866e7531f68081886081961&=&format=webp&quality=lossless&width=402&height=513'},
        {name:'Dottr',url:'https://media.discordapp.net/attachments/1289237188994662421/1530265539702821035/image.png?ex=6a64f257&is=6a63a0d7&hm=a564f493e5c5d338b12a4b7b2df3b4393c6e6298dc79a92eb71b50ea29a11a7c&=&format=webp&quality=lossless&width=285&height=270'}

    ]
]

let isRollingImage = false
function rollRandomImage() {
    if(isRollingImage) return
    isRollingImage = true

    doge('crank').style.backgroundPosition = '64px 0px'
    DeBread.shake(doge('randomImageBox'),20,2,2,1000)

    const rarities = [
        {name:'COMMON',color:'rgb(75, 75, 75)'},
        {name:'UNCOMMON',color:'rgb(66, 112, 62)'},
        {name:'RARE',color:'rgb(61, 123, 151)'},
        {name:'EPIC',color:'rgb(103, 61, 151)'},
        {name:'MYTHIC',color:'linear-gradient(to left, rgba(64, 155, 158, 1), rgba(134, 68, 172, 1))'}
    ]

    const rarityIndex = getWeightedChance([100,50,30,10,1])
    const randomList = randomImages[rarityIndex]
    const randomImage = randomList[DeBread.randomNum(0,randomList.length-1)]

    setTimeout(() => {
        doge('crank').style.backgroundPosition = '0px 0px'
        doge('randomImage').src = randomImage.url
        doge('randomImageRarity').innerText = rarities[rarityIndex].name
        doge('randomImageRarity').style.background = rarities[rarityIndex].color
        doge('randomImageAuthor').innerText = `Submitted by: ${randomImage.name}`

        doge('randomImage').style.animation = 'none'
        requestAnimationFrame(() => {
            doge('randomImage').style.animation = 'randomImagePulse 500ms ease-out 1 forwards'
        })

        doge('randomImage').onclick = () => {
            openImage('Random Image!',`Submitted by: ${randomImage.name}`,randomImage.url)
        }

        isRollingImage = false
    }, 1000);
} rollRandomImage()

// function updateServerCountdown() {
//     const milliseconds = 1768348800000 + 86400000 - Date.now()
//     const days = Math.floor(milliseconds / 86400000)
//     const hours = Math.floor((milliseconds % 86400000) / 3600000)
//     const minutes = Math.floor(((milliseconds % 86400000) % 3600000) / 60000)
//     const seconds = Math.floor((((milliseconds % 86400000) % 3600000) % 60000) / 1000)
//     doge('serverCountdown').innerText = `${days.toString().padStart(2,0)}:${hours.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`

//     if(milliseconds > 0) {
//         doge('serverCountdown').innerText = `${days.toString().padStart(2,0)}:${hours.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`
//     } else {
//         doge('serverCountdown').innerText = 'LIVE'
//     }

// } setInterval(updateServerCountdown, 500)
// doge('eventDot').style.animation = 'live 1s ease-out infinite forwards'