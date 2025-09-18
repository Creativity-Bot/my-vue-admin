<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img :src="logo" alt="" width="70px" height="70px"></img>
                <h1 class="ml">my vue project</h1>
            </div>
            <el-form ref="formRef" :model="ruleForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="Username" prefix-icon="User"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="Password" show-password prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="login">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import logo from '@/assets/logo.png'
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/store/auth';
const formRef = ref();
const authStore = useAuthStore();
const login = () => {
    formRef.value.validate((valid)=>{
        if(valid){     
            authStore.login(ruleForm);
        }
    }); 
}
const ruleForm = reactive({
    username: '',
    password: ''
});




const rules = reactive({
    username: [
        { required: true, message: 'Please input username', trigger: 'blur' },
        { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
    ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' }
    ]
})

</script>
<style lang="less" scoped>
.bg{
    background-image: url('@/assets/background.jpg');
    background-size: cover; // 等比缩放，铺满容器
    background-position: center; // 居中显示,
    height: 100vh;  // 视口高度
    background-repeat: no-repeat;
    .login{
        width: 500px;
        height: 300px;
        padding: 50px;
        box-shadow: 0 0 10px 10px #f4f4f4;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -200px;
        left: 50%;
        margin-left: -300px;
        .logo{
                display: flex;
                justify-content: center;
                align-items: center;
                h1{
                    color: #f4f4f4;
                }
                margin-bottom: 40px;
            }
    }
    
    // Custom style for Element Plus form error messages
    :deep(.el-form-item__error) {
        color: #f4f4f4 !important; // Your custom error color
        font-weight: bold;
    }   
}
</style>