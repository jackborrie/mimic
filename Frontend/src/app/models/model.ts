export class Model {

    // Jesse's letter: qaassszdfxdfgbvcvb

    serialise (json: {[key: string]: any}) {
        let keys = Object.keys(json);

        for (let key of keys) {
            if (key === 'userName') {
                key = 'username';
            }
            // @ts-ignore
            this[key] = json[key];
        }
    }
}
export function activator<T extends Model>(type: { new(): T ;} ): T {
    return new type();
}
