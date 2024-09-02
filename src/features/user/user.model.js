export default class UserModel{
    constructor(id,name, email,password,type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static getAll(){
      return users;
    }
  static signIn(email,password){
    const user = users.find(u => u.email === email && u.password === password);
    if(user){
    return user; //Assuming validation passes
    }
    else {
        return false;  //Assuming validation fails
    }
  }
  static signUp(name,email,password,type){
    const newUser=new UserModel({
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        type: type,
      });
      users.push(newUser)
      console.log("User added to the database: ", newUser);
    return true;
    }
}

let users = [
    {
      id: 1,
      name: 'Seller User',
      email: 'seller@ecom.com',
      password: 'Password1',
      type: 'seller',
    },
    {
      id: 2,
      name: 'Customer User',
      email: 'customer@ecom.com',
      password: 'Password1',
      type: 'customer',
    },
  ];