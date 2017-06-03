class Parent {
    static getAge(){
    	console.log(12);
    }
}

class Child extends Parent{
	static getAge(){
		console.log(13);
	}
}