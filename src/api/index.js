import Mock from "mockjs";
Mock.setup({ 
    timeout: "200-600" 
});
const adminMenus = [
    // generate some mock menu data
    { id: 1, name: "Dashboard", path: "/dashboard", icon: "dashboard"},
    { id: 2, name: "User Management", path: "/users", icon: "user"},
    { id: 3, name: "Settings", path: "/settings", icon: "settings", children: [
        { id: 4, name: "Profile", path: "/settings/profile", icon: "user"},
        { id: 5, name: "Security", path: "/settings/security", icon: "lock"}
    ] }
];


Mock.mock("http://www.demo.com/login", "post", (options) => {
    const {username, password} = JSON.parse(options.body);
    if(username === "admin" && password === "123456"){
        return {
            code: 200,
            message: "Login success",
            data: {
                token: "sfdsfdsfdsfsfddsfsf",
                user:{
                    username: "sibo",
                    roles: ["admin"]
                },
                menus: adminMenus
            }
        }
    }
    else{
        return {
            code: 401,
            message: "Login failed",
        }
    }
});