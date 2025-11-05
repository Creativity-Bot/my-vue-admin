const fieldMap = {
    description: "故障描述",
    address: "设备地址",
    equNo: "设备编号",
    level: "报警级别",//1严重 2紧急 3一般
    time: "报警时间",
    code: "故障代码",
    status: "当前状态",//1待指派 2处理中 处理异常
}

const getFieldLabel = (key) => {
    return fieldMap[key] || key;
}

export { getFieldLabel };