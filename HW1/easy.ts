
export type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

export type NOfArray<ArrayObj extends any[], N extends number> =
    N extends keyof ArrayObj ? ArrayObj[N] : never;

export type Unshift<ArrayType extends any[], El> = [El, ...ArrayType];

export type MyExclude<T, U> = T extends U ? never : T;


// Примеры использования
/* MyPick */
interface Person {
    name: string;
    age: number;
    sex: string;
    weight: number;
}

// Выбираем некоторые свойства
type PersonPick = MyPick<Person, 'name' | 'age'>;

// Добавляем только свойства из типа, иначе будет ошибка
const person: PersonPick = {
    name: 'Maya',
    age: 20
};

console.log(person)

/* NOfArray */
type MyArray = [boolean, number, string];

// Получаем тип элемента на позиции 1 - это 'number'
type FirstElem = NOfArray<MyArray, 1>;

const testEl: FirstElem = 42;
console.log(testEl)

/* Unshift */

type OrigArray = [number, string];

// Добавляем элемент типа 'boolean' в начало массива
type NewArray = Unshift<OrigArray, boolean>;

const newArray: NewArray = [true, 42, "Hello"];
console.log(newArray)

/* MyExclude */

type Orig = "a" | "b" | "c" | "d";

// Исключаем 'a' и 'b' из Orig
type Excluded = MyExclude<Orig, "a" | "b">;

const test: Excluded = "c"; // 'c' или 'd' допустимо
console.log(test)



