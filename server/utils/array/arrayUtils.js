export default class {
    constructor(array) {
        this.array = array
    }

    async betweenIncludes(target, callback) {
        target = await target.map(async element => {
            console.log(`element{${element}} =`, this.array.includes(element))
            this.array.includes(element) ? true : false
        })
        callback(!target.includes(false))
    }
}