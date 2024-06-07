export function generator(axiom, dictonary, counter) {
    if (typeof axiom != 'string' || typeof dictonary != 'object' || typeof counter != 'number') return 'Incorrect input'

    if (counter > 17) counter = 17
    
    let buffer = ''
    for (let i = 0; i < counter; i++) {
        for (let j = 0; j < axiom.length; j++) {
            buffer += dictonary[axiom[j]]
        }
        [axiom, buffer] = [buffer, '']
    }
    return axiom
}

