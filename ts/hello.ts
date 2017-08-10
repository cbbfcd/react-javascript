
// 1. 原始数据类型的ts表示

// 布尔型

// 使用 boolean 定义数值类型

let isBoolean: boolean = false;

let creatByNewBoolean: boolean = new Boolean(1);

let createdByBoolean: boolean = Boolean(5);

// 这里可以看到第二个构造函数创建boolean对象编译不会通过。
// 说明了: 1. ts是一种将javaScript转换为强类型(静态)语言的方案
//         2. new Boolean() 与 Boolean() 的区别

// 补充:
// new 可以理解为构造函数，会建立原型链的继承、链接关系，返回的是一个对象。
// 在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。
// const Boolean : BooleanConstructor(value?: any) => boolean,
// 所以 Boolean(5) 是构造函数调用，返回的是一个 boolean
// 其他的基本类型，除了(null,undefined)也一样。


// 数值型

// 使用 number 定义数值类型

let num1: number = 6;

let num2: number = NaN;

let num3: number = Infinity;

let num4: number = 5.6;

let num5: number = +0;

let num6: number = 0xfff;

let num7: number = new Number(5);

let num8: number = Number(5);

// 二进制和八进制会在编译的时候转成十进制。



// 字符型

// 使用 string 定义字符串类型

let str: string = 'huangteng';

let age: number = 25;

let teml: string = `this is temp str by ${str} who's age is ${age}`



// 空值

// 用void表示没有任何返回值, 用其声明的变量只能是null\undefined

function saySomething(): void {
	alert('test');
}

let unuse: void = 5;

let unuse2: void = null;

let unuse3: void = undefined;



// null or undefined





