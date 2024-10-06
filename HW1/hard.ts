
type ConvertToCamel<S extends string> = S extends `${infer Start}_${infer End}`
    ? `${Start}${Capitalize<ConvertToCamel<End>>}`
    : S;

export type Camelize<T> = T extends object
    ? {
        [K in keyof T as ConvertToCamel<K & string>]: Camelize<T[K]>
    }
    : T;


type DeepPick<T, Paths extends string> = Paths extends `${infer Start}.${infer RemainingPath}`
    ? Start extends keyof T
        ? { [K in Start]: DeepPick<T[Start], RemainingPath> }
        : never
    : Paths extends keyof T
        ? { [K in Paths]: T[K] }
        : never;



// Примеры использования

/* Camelize */
interface SnakeCaseTest {
    first_name: string;
    last_name: string;
    person_address: {
        street_name: string;
        house_number: number;
    };
}

type CamelCaseTest = Camelize<SnakeCaseTest>;

const person: CamelCaseTest = {
    firstName: "Maya",
    lastName: "Ifraimova",
    personAddress: {
        streetName: "some street",
        houseNumber: 10
    }
};


/* DeepPick */

interface Person {
    info: {
        name: string;
        age: number;
        address: {
            street: string;
            house: number;
        };
    };
}

const person2: DeepPick<Person, 'info.name' | 'info.address.house'> = {
    info: {
        address: {
            house: 10
        }
    }
};