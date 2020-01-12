const fs = require('fs')
const src = fs.readFileSync("./source.txt").toString();

const formattedSrc = src.split("\r\n").map(x => x.trim()).filter(Boolean)
const result = formattedSrc.map(txt => {
    const firstChar = txt[0]
    let index
    switch (firstChar) {
        case '>':
            index = txt.indexOf(" ")
            return `<em>${txt.slice(index+1)}</em>`
            break;
        case '#':
            index = txt.indexOf(" ")
            return `<h${index}>${txt.slice(index+1)}</h${index}>`
            break;
        case '-':
            if (txt[1] === '-' && txt[2] === '-')
                return `<h1><br></h1><hr><h1><br></h1>`
            else
                return `<p>${txt}</p>`
            break;
        default:
            return `<p>${txt}</p>`
            break;
    }
}).map(htmlTxt => {
    const indexes = []
    for (let i = 0; i < htmlTxt.length - 2; i++) {
        if (htmlTxt[i] === '~' &&
            htmlTxt[i + 1] === '~' &&
            htmlTxt[i + 2] === '~') {
            indexes.push(i)
        }
    }
    indexes.length > 0 && console.log(`indexes:${indexes}`)
    const todo = []
    for (let j = 0; j < indexes.length; j += 2) {
        const target = htmlTxt.slice(indexes[j] + 3, indexes[j + 1])
        todo.push(target)
            //htmlTxt = htmlTxt.replace(`~~~${target}~~~`, `<span style="color: rgb(87, 160, 130); font-weight: bold;">${target}</span>`)
    }
    for (let i = 0; i < todo.length; i++) {
        const target = todo[i]
        htmlTxt = htmlTxt.replace(`~~~${target}~~~`, `<span style="color: rgb(87, 160, 130); font-weight: bold;">${target}</span>`)
    }



    return htmlTxt
})



// console.log(result.join("\n"))
fs.writeFileSync("./result.txt", result.join("\n"))