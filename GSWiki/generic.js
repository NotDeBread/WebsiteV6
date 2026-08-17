const Home = {
    Gameplay: {
        Mechanics: {
            Shop: {},
            Money_Bonuses: {}
        },
        Characters: {
            Bread: {},
            Fella: {},
            Plonk: {},
        },
        Weapons: {
            Gun: {},
            Sniper: {}
        },
        Items: {
            Rock: {}
        },
        Power_Items: {
            Apple: {}
        },
        Elixirs: {
            Strength_Elixir: {}
        },
        Bosses: {
            The_Tutorialist: {}
        },
        Minibosses: {
            Sasha: {}
        },
        Enemies: {
            Goon: {}
        },
        Achievements: {},
    },
    Modding: {
        Modded_Enemies: {},
        Modded_Characters: {},
        Modded_Weapons: {},
        Modded_Items: {},
    },
    History: {}
}

function createNavButton(obj, key, parent) {
    const hasChildren = Object.keys(obj).length > 0

    const button = document.createElement('div')
    button.opened = false
    button.classList.add('explorerItem')
    button.innerHTML = `
        <div class="explorerItemButtons">
            ${hasChildren ? '<button class="explorerItemArrow">►</button>' : ''}
            <a href="#${key}">
                <button>${key.replaceAll('_',' ')}</button>
            </a>
        </div>
        ${hasChildren ? '<div class="explorerItemChildren"></div>' : ''}
    `
    
    parent.append(button)

    if(hasChildren) {
        const arrow = button.querySelector('.explorerItemArrow')
        const children = button.querySelector('.explorerItemChildren')
        arrow.onclick = () => {
            if(button.opened) {
                children.style.display = 'none'
                arrow.style.rotate = '0deg'
            } else {
                children.style.display = 'unset'
                arrow.style.rotate = '90deg'
            }

            button.opened = !button.opened
        }
    }

    for(const kay of Object.keys(obj)) {
        createNavButton(obj[kay], kay, button.querySelector('.explorerItemChildren'))
    }
} createNavButton(Home,'Home',doge('explorer'))

function updateHash() {
    const hash = window.location.hash.substring(1) || 'Home'
    loadPage(hash)
} updateHash()
window.addEventListener('hashchange', updateHash)

async function loadPage(page) {
    const response = await fetch(`articles/${page}.html`);
    const html = await response.text()

    doge('body').innerHTML = html
    updateCustomElements()
}

function updateCustomElements() {
    doge('body').querySelectorAll('gsCharacter').forEach(elem => {
        const characterKey = elem.getAttribute('character')
        const character = characters[characterKey]
        elem.style.imageRendering = 'pixelated'
        elem.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <span style="font-size: 1.25em; font-weight: 700;" id="characterName">${character.name}</span>
                <span>${character.desc}</span>
            </div>
            <img src="../../games/GooberShooter2/graphics/characters/${characterKey}Portrait.png" width="72" id="characterPortrait">
            ${character.skins ? `
                <span>Available Skins:</span>
                <div id="characterSkins" style="display: flex; gap: 5px;"></div>    
            ` : ''}
        `

        for(const skin of character.skins ?? []) {
            const img = document.createElement('img')
            img.src = `../../games/GooberShooter2/graphics/characters/${skin.src}Portrait.png`
            img.width = 38
            
            img.onmouseenter = () => {
                elem.querySelector('#characterName').innerText = character.name + ` (${skin.name})`
                elem.querySelector('#characterPortrait').src = `../../games/GooberShooter2/graphics/characters/${skin.src}Portrait.png`
            }
            
            img.onmouseleave = () => {
                elem.querySelector('#characterName').innerText = character.name
                elem.querySelector('#characterPortrait').src = `../../games/GooberShooter2/graphics/characters/${characterKey}Portrait.png`
            }

            elem.querySelector('#characterSkins').append(img)
        }
    })
}