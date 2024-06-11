export abstract class Model {

    public createdAt: string | null = null;
    public updatedAt: string | null = null;

    // Jesse's letter: qaassszdfxdfgbvcvb

    public serialise (json: {[key: string]: any}) {
        let keys = Object.keys(json);

        for (let key of keys) {
            // @ts-ignore
            this[key] = json[key];
        }
    }
}
export function activator<T extends Model>(type: { new(): T ;} ): T {
    return new type();
}
