/**
* TypeScript进阶篇读书笔记
*/

// 1. 类型别名
// TS 中用 type 定义类型别名，其实就是为了书写更方便
type Name = string;
type nameFunc = () => string;
type unionNameType = Name | nameFunc;
function getName(n: unionNameType): Name{
	if(typeof n === 'string'){
		return n;
	}else{
		return n();
	}
}



// 2. 
