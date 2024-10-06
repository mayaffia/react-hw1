
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type MyCapitalize<T extends string> = T extends `${infer F}${infer R}`
    ? `${Uppercase<F>}${R}` : T;

export type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

export type ParseURLParams<S extends string> =
    S extends `${infer Prefix}:${infer Param}/${infer RemainingPath}`
    ? Param | ParseURLParams<RemainingPath>
    : S extends `${infer Prefix}:${infer Param}`
    ? Param
    : never;



// Примеры использования

/* DeepPartial */
interface Person {
    name: string;
    age: number;
    address: {
        street: string;
        house: number;
    };
}

const partialPerson: DeepPartial<Person> = {
    name: "Maya",
    address: {
        house: 10
    }
};


/* MyCapitalize */
type CapitalizedHello = MyCapitalize<'something'>; // 'Hello'

const smth: CapitalizedHello = 'Something';
// const s: CapitalizedHello = 'something'; а так уже нельзя

console.log(smth)


/* DeepMutable */
interface ReadonlyPerson {
    readonly age: number;
    readonly name: string;
    readonly address: {
        readonly street: string;
        readonly house: number;
    };
}

type MutablePerson = DeepMutable<ReadonlyPerson>;

const mutablePerson: MutablePerson = {
    age: 20,
    name: "Maya",
    address: {
        street: "Some streer",
        house: 10
    }
};

mutablePerson.name = "Alice";
mutablePerson.address.house = 20;


/* ParseURLParams */

type Params = ParseURLParams<'posts/:id/:user'>; // 'id' | 'user'

const param1: Params = 'id';
const param2: Params = 'user';
// const param3: Params = 'kk'; а так уже сделать нельзя
