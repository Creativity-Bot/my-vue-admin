<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>今日营收</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="100000"></h1>
                        <div class="percentage">
                            -21%
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>本月总收入 (万元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="2924"></h1>
                        <div class="percentage">-21%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>会员卡储值金额 (元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="239824"></h1>
                        <div class="percentage">-16%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>服务费总金额 (元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="16824"></h1>
                        <div class="percentage">-7%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>停车费总金额 (元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="9687"></h1>
                        <div class="percentage">-4%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>电费总金额 (元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="223674"></h1>
                        <div class="percentage">-19%</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>

</script>
<style scoped>
.title {
    display: flex;
    align-items: center;
    .title-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgb(235, 236, 245);
        text-align: center;
        line-height: 30px;
    }
    h4 {
        margin-left: 20px;
        color: #666;
    }
}
.total {
    display: flex;
    align-items: center;
    h1 {
        font-size: 30px;
        margin-right: 20px;
    }
    .percentage {
        display: inline-block;
        padding: 3px 5px;
        height: 20px;
        font-size: 12px;
        background-color: rgb(235, 247, 239);
        border-radius: 2px;
        color:green;
        line-height: 20px;
    }
}
</style>