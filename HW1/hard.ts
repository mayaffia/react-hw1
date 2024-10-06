//export type Camelize<ObjectType> = unknown;

type CamelToSnakeCase<S extends string> = S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<CamelToSnakeCase<Tail>>}`
    : S;

export type Camelize<T> = T extends object
    ? {
        [K in keyof T as CamelToSnakeCase<K & string>]: Camelize<T[K]>
    }
    : T;



type DeepPickHelper<T, K extends keyof T> = K extends string
    ? T[K] extends object
        ? { [P in K]: DeepPick<T[K], Extract<keyof T[K], string>> }
        : { [P in K]: T[K] }
    : never;

export type DeepPick<T, Paths extends string> =
    Paths extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
    ? DeepPickHelper<T, Key> & DeepPick<T[Key], Rest>
    : never
: Paths extends keyof T
    ? { [K in Paths]: T[K] }
    : never;


// Примеры использования

/* Camelize */
interface SnakeCase {
    person_name: string;
    person_age: number;
    person_details: {
        first_name: string;
        last_name: string;
    };
}

type CamelCaseExample = Camelize<SnakeCase>;

/* DeepPick */
interface Example {
    person: {
        name: string;
        details: {
            age: number;
            address: string;
        };
    };
    isActive: boolean;
}

type PersonDetails = DeepPick<Example, 'user.details.address' | 'isActive'>;
