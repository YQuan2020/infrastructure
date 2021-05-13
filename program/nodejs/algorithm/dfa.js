class Filter {
    constructor () {
        this.map = {}
    }
    addWord (word) {
        let currentMap = this.map
        const arr = [...word]
        arr.forEach((char, index) => {
            if (currentMap[char]) {
                currentMap = currentMap[char]
            } else {
                const child = {isEnd: false}
                currentMap[char] = child
                currentMap = child
            }
            if (index == arr.length - 1) {
                if (Object.keys(currentMap).includes('isEnd')) {
                    currentMap['isEnd'] = true
                } else {
                    currentMap['isEnd'] = true
                }
            } 
        })
    }

    print () {
        console.log(JSON.stringify(this.map))
    }
}

const f = new Filter()
f.addWord('但是开发骄傲地方')
f.addWord('但是开发骄傲地方是地方撒')
f.addWord('和管理开始的风格')
f.addWord('和管理开始是地方撒的风格')
f.print()