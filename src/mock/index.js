import Mock from "mockjs";
Mock.setup({ 
    timeout: "200-600" 
});
//管理员权限菜单
const menulist = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: "DataLine"
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "Lightning",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: "VideoCamera"
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: "DataAnalysis"
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/alert",
          icon: "Warning"
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: "MapLocation"
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "Files",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "DocumentCopy",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: "Share"
        },
        {
          name: "计费管理",
          url: "/operations/fees",
          icon: "Money"
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: "Phone"
    },
    {
      name: "会员卡管理",
      url: "/membership",
      icon: "Magnet"
    },
    {
      name: "招商管理",
      url: "/quote",
      icon: "Document"
    },
    {
      name: "系统设置",
      url: "/system",
      icon: "Setting"
    },
  
    {
      name: "个人中心",
      url: "/personal",
      icon: "User"
    },
]
//运营专员权限菜单
const menulist2 = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: "DataLine"
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "Lightning",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: "VideoCamera"
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: "DataAnalysis"
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/alert",
          icon: "Warning"
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: "MapLocation"
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "Files",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "DocumentCopy",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: "Share"
        },
        {
          name: "计费管理",
          url: "/operations/fees",
          icon: "Money"
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: "Phone"
    },
    {
      name: "会员卡管理",
      url: "/membership",
      icon: "Magnet"
    },  
    {
      name: "个人中心",
      url: "/personal",
      icon: "User"
    },
]


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
                    roles: ["admin"],
                    avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                },
                menus: menulist
            }
        }
    }
    else if(username === "user" && password === "user666"){
        return {
            code: 200,
            message: "Login success",
            data: {
                token: "usertokenlkg55dws5ch4ew97cl",
                user:{
                    username: "huihui",
                    roles: ["user"]
                },
                menus: menulist2
            }
        }
    }
    else{
        return {
            code: 401,
            message: "Your account does not exist, pls check username or password",
        }
    }
});

Mock.mock("http://www.demo.com/chartData",'get',()=>{
  return {
    code: 200,
    message: 'success',
    data: {
      list:[
        {name:"充电量",data: [20, 50, 30, 70, 60, 80, 40, 60, 50]},
        {name:"充电时长",data: [40, 60, 50, 80, 70, 90, 60, 70, 80]},
        {name:"充电功率",data:  [30, 40, 60, 50, 70, 20, 30, 40, 60]}
      ]
    }
  };
});

Mock.mock("http://www.demo.com/pieChartData",'get',()=>{
  return {
    code: 200,
    message: '操作成功',
    data: {
      list:[
        { value: 35, name: '充电桩' },  // 数据值和名称
        { value: 30, name: '充电站' },
        { value: 25, name: '充电杆' }
      ]
    }
  };
})

//echarts图表数据接口3 雷达图
Mock.mock("http://www.demo.com/chartRadarData",'get',()=>{
  return {
    code: 200,
    message: '操作成功',
    data: {
      list: [42, 30, 200, 350, 500, 180]
    }
  };
})