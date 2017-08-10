
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

// TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型

let un: undefined = undefined;

let nu: null = null;

let nu2: null = 5;  // null 只能定义null, undefined同样

let un1: undefined;

let num9: number = un1;

// 任意类型

// TypeScript中可以用any表示任意类型。使其使用起来的效果就像js变量一样

let any1: any = '123';

any1 = 7;

let any2: number = 123;

any2 = '123';  // 如果不是使用any, 合理会报错。

// 在任意值上访问任何属性都是允许的，对其任何操作返回的结果都是any的
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

let any3;  // 这里注意不能初始化，如果let any3 = '5'; 就不再是any；而是string了；
           // TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
any3 = 5;

any3 = '5';

// 最好的方式是杜绝这种声明但是不赋值和不确定type的写法。



// 联合类型

// 联合类型使用 | 分隔每个类型，表示类型只能是a |(或者) b

let union: number | string = '5';

union = 15;

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，
// 我们只能访问此联合类型的所有类型里共有的属性或方法.

function getLength(something: string|number): number{
	return something.length;
}

// 上述方法报错是因为不确定参数是string | number,而number是没有length属性的；

function getString(something: string|number): string{
	return something.toString();
}

// 上述方法访问 string 和 number 的共有属性是没问题的

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

console.log(union.length); // union 被推论为 number;


// 接口

// 那么对象的类型用什么定义呢？

// TypeScript用interface来表示接口，接口的作用是定义对象的 type;

// 以面向对象思想思考，接口封装的是抽象的公共的行为、动作。由具体的个体(class)去实现(implements);

// TypeScript的接口还可以定义对象的属性、特征，对象的属性、特征必须保持和接口的一致,不能多也不能少

interface Person{
	name: string,
	age: number
}

let guy: Person = {
	name: 'jack',
	age: 25
}

// 但是这样有时候会很麻烦，我们很多时候不需要都实现接口的属性，可以使用可选属性，就是加一个?
// 这时可以少，但是还是不可以多
interface Person2{
	name: string,
	age?: number
}

let guy2: Person2 = {
	name: 'jack'
}


// 如果我们非要给它新增一个未定义的属性呢，我们可以使用任意属性

interface Person3{
	name: string,
	age?: number,
	[propName: string]: any  // 任意属性,要求该接口内的基本属性、可选属性都必须是它的子属性
}

let guy3: Person3= {
	name: 'jack',
	job:'jser',
	address:'xxxxx'
}


interface Person4{
	name: string,
	age?: number, // type是number 并不是stirng的子属性，改成string 就可以了。
	[propName: string]: string  // 任意属性,要求该接口内的基本属性、可选属性都必须是它的子属性
}

let guy4: Person4= {
	name: 'jack',
	job:'jser',
	address:'xxxxx'
}


// 只读属性

// 如果我们需要定义接口中的属性在初始化赋值之后就不可以被改变，就可以使用readonly表示只读属性。

interface Animal{
	type: string,
	readonly id: number
}

let cat: Animal = {
	type: 'miao',
	id: 123 // 这里如果不给id初始化赋值，会报错
}

cat.id = 123;  // 报错， 因为 id 初始化后就变成只读属性了。

// 













