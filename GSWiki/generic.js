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
            Ashton: {},
            Luke: {}
        },
        Weapons: {
            Gun: {},
            Sniper: {}
        },
        Items: {
            Rock: {},
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
            Sasha0Boss: {},
            Chip0Boss: {}
        },
        Enemies: {
            Goon: {},
            Chud_Chip: {},
            Tutorialist_Servant: {}
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
            <a href="#${key.replaceAll('0','')}">
                <button>${key.replaceAll('_',' ').split('0')[0]}</button>
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
    doge('body').innerText = 'Loading...'
    const response = await fetch(`articles/${page}.html`);
    const html = await response.text()

    if(response.ok) {
        doge('body').innerHTML = html
        updateCustomElements()
    } else {
        doge('body').innerText = 'This page has not been made yet!'
    }

}

const characterUnlocks = {
    peep: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/whoops.png">Oops</a>" achievement.',
    the_horse: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/optimization.png">Optimization at its finest</a>" achievement.',
    sasha: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Speed_Demon.png">Speed Demon</a>" achievement.',
    isaac: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Reroll_Addict.png">Reroll Addict</a>" achievement.',
    friend: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/The_Egg.png">The Egg</a>" achievement.',
    tutorialist: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/The_End.png">The End</a>" achievement.',
    ashton: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Found_Me.png">You found me</a>" achievement.',
    tammy: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Big_Teeth.png">Big Teeth</a>" achievement.',
    lorna: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Law_Enforcement.png">Law Enforcement</a>" achievement.',
    luke: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Divorce.png">Divorce</a>" achievement.',
    tana: 'Complete the "<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Unc.png">Unc still got it</a>" achievement.'
}

function updateCustomElements() {
    //Character card
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
            <div id="characterTags" style="display: flex; gap: 5px; margin-top: 5px;"></div>
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

        for(const tag of character.tagList) {
            const div = document.createElement('div')
            div.classList.add('characterTag')
            div.innerHTML = tag.text

            addStyles(div, {
                background: tag.col,
            })

            doge('characterTags').append(div)
        }
    })

    //Character list
    doge('body').querySelectorAll('.characterTable').forEach(elem => {
        for(const index in Object.keys(characters)) {
            const key = Object.keys(characters)[index]
            const character = characters[key]

            const row = document.createElement('tr')
            row.innerHTML = `
                <td style="font-weight: 700;">
                    <img src="../../games/GooberShooter2/graphics/characters/${key}Portrait.png" width="38" style="image-rendering: pixelated; vertical-align: middle; margin-right: 5px;">
                    <a href="#${character.name}">${character.name}</a>
                </td>
                <td>
                    ${character.desc ?? '<em style="color: grey;">No description</em>'}
                </td>
                <td>
                    <img src="../../games/GooberShooter2/graphics/weapons/${character.weapon.name.replaceAll(' ','_')}.png" style="image-rendering: pixelated; vertical-align: middle; margin-right: 5px;">
                    ${character.weapon.name}
                </td>
                <td style="max-width: 250px;">
                    ${characterUnlocks[key] ?? 'N/A'}
                </td>
            `

            elem.append(row)
        }
    })
}