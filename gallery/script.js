let imgList = []
let pathsLoaded = []
const folderPaths = [
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter2/contents/graphics/upgrades",
        tags: ['Pixel Art','Game Asset','Goober Shooter 2']
    },
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter2/contents/graphics/powerItems",
        tags: ['Pixel Art','Game Asset','Goober Shooter 2'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter2/contents/graphics/characters",
        tags: ['Pixel Art','Game Asset','Goober Shooter 2'],
        gsCharacter: true,
    },
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter2/contents/graphics/achievements",
        tags: ['Pixel Art','Game Asset','Goober Shooter 2'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter2/contents/graphics/credits",
        tags: ['Pixel Art','Game Asset','Goober Shooter 2'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter2/contents/graphics/credits/portraits",
        tags: ['Pixel Art','Game Asset','Goober Shooter 2'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter2/contents/graphics/elixirs",
        tags: ['Pixel Art','Game Asset','Goober Shooter 2'],
    },
    // {
    //     url: "https://api.github.com/repos/NotDeBread/GooberShooter2/contents/graphics/",
    //     tags: ['Pixel Art','Game Asset','Goober Shooter 2'],
    // },
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter/contents/media/achievements",
        tags: ['Pixel Art','Game Asset','Goober Shooter'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/GooberShooter/contents/media/upgrades",
        tags: ['Pixel Art','Game Asset','Goober Shooter'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WinnieAccumulator/contents/media/golden/icons",
        tags: ['Pixel Art','Game Asset','Winnie Accumulator'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WinnieAccumulator/contents/media/items",
        tags: ['Pixel Art','Game Asset','Winnie Accumulator'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WinnieAccumulator/contents/media/rocks",
        tags: ['Pixel Art','Game Asset','Winnie Accumulator'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WinnieAccumulator/contents/media/rocks/pickaxes",
        tags: ['Pixel Art','Game Asset','Winnie Accumulator'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WinnieAccumulator/contents/media/spells",
        tags: ['Pixel Art','Game Asset','Winnie Accumulator'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WinnieAccumulator/contents/media/upgrades",
        tags: ['Pixel Art','Game Asset','Winnie Accumulator'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WebsiteV7/contents/media/icons",
        tags: ['Pixel Art','Website'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WebsiteV7/contents/media/notads",
        tags: ['Pixel Art','Website'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WebsiteV7/contents/media/breadFight",
        tags: ['Pixel Art','Game Asset','Website'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WebsiteV7/contents/media/breadFight/fella",
        tags: ['Pixel Art','Game Asset','Website'],
    },
    {
        url: "https://api.github.com/repos/NotDeBread/WebsiteV7/contents/media/breadFight/players",
        tags: ['Pixel Art','Game Asset','Website'],
    },
]

for(const path of folderPaths) {
    fetch(
        path.url
    ).then(res => res.json()).then(
        files => {
            files.forEach(file => {
                if (file.name.endsWith(".png") || file.name.endsWith('.gif')) {
                    imgList.push({
                        url: file.download_url,
                        name: file.name,
                    })
                }      
            })

            pathsLoaded++

            if(pathsLoaded === folderPaths.length) renderImages()
        }
    )
}

function renderImages() {
    for(const img of imgList) {
        const card = document.createElement('div')
        card.classList.add('imageCard')
        card.classList.add('genericBox')

        card.innerHTML = `
            <img src="${img.url}" width="64">
        `

        card.onclick = () => {
            openImage(img.name, "", img.url)
        }

        doge('imageListContainer').append(card)
    }
}