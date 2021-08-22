<template>
    <div class="login">
        <div class="login__warp">
            <h2 class="login__title">人力资源管理系统</h2>
            <h3 class="login__title-vice">用户登陆</h3>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" class="login-code-index" @keyup.enter.native="handleLogin">
                    </el-input>
                    <div class="login-code">
                        <img :src="codeUrl" @click="getCode" />
                    </div>
                </el-form-item>
                <el-checkbox v-model="loginForm.rememberMe" style="
            margin: 0px 0px 25px 0px;
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            line-height: 17px;
          ">记住密码</el-checkbox>
                <el-form-item style="width: 100%">
                    <el-button :loading="loading" size="medium" type="primary" style="width: 100%" class="login__button" @click.native.prevent="handleLogin">
                        <span v-if="!loading">登 录</span>
                        <span v-else>登 录 中...</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © 2019-2020 劳务派遣 All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { Message } from 'element-ui'
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
    name: "Login",
    data() {
        return {
            codeUrl: "",
            cookiePassword: "",
            loginForm: {
                username: "admin",
                password: "admin123",
                rememberMe: false,
                code: "",
                uuid: "",
            },
            loginRules: {
                username: [
                    { required: true, trigger: "blur", message: "用户名不能为空" },
                ],
                password: [
                    { required: true, trigger: "blur", message: "密码不能为空" },
                ],
                code: [
                    { required: true, trigger: "change", message: "验证码不能为空" },
                ],
            },
            loading: false,
            redirect: undefined,
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    created() {
        this.getCode();
    },
    methods: {
        routerFun() {
            store.dispatch('GetInfo').then(res => {
                const roles = res.roles
                store.dispatch('GenerateRoutes',{roles}).then(accessRoutes => {
                    riuter.addRouters(accessRoutes)
                })
            })
        }, 
        async getCode() {
            getCodeImg().then((res) => {
                console.log(res)
                this.codeUrl = "data:image/gif;base64," + res.img;
                this.loginForm.uuid = res.uuid;
            });
        },
       handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (this.loginForm.rememberMe) {
                        Cookies.set("username", this.loginForm.username, { expires: 30 });
                        Cookies.set("password", encrypt(this.loginForm.password), {
                            expires: 30,
                        });
                        Cookies.set("rememberMe", this.loginForm.rememberMe, {
                            expires: 30,
                        });
                    } else {
                        Cookies.remove("username");
                        Cookies.remove("password");
                        Cookies.remove("rememberMe");
                    }
                    this.$store.dispatch("Login",this.loginForm)
                    .then(() =>{
                        this.routerFun();
                    })
                    .catch(() => {
                        this.loading = false;
                        this.getCode();
                    })
                }
            });
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
    position: relative;
    height: 100%;
    background-size: cover;
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #999999;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #999999;
        border-color: #999999;
    }
    .el-button--primary {
        background: #553724;
        border: 1px solid #553724;
        border-radius: 18px;
    }
}
.login__warp {
    padding: 0 60px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}
.login__bg1 {
    position: absolute;
    left: -160px;
    top: 110px;
    width: 159px;
    height: 73px;
}
.login__bg2 {
    position: absolute;
    right: -205px;
    top: 10px;
    width: 183px;
    height: 84px;
}
.login__bg3 {
    position: absolute;
    right: -58px;
    top: 309px;
    width: 124px;
    height: 57px;
    z-index: -3;
}
.login__bg4 {
    position: absolute;
    left: -37px;
    bottom: 49px;
    width: 116px;
    height: 67px;
    z-index: -3;
}
.login__bg5 {
    position: absolute;
    left: 32%;
    bottom: 0;
    width: 98px;
    height: 94px;
}
.login__bg6 {
    position: absolute;
    right: 32%;
    bottom: 0;
    width: 65px;
    height: 34px;
}
.login__bg1,
.login__bg2,
.login__bg3,
.login__bg4,
.login__bg5,
.login__bg6 {
    img {
        width: 100%;
        height: 100%;
    }
}

.login__title {
    font-size: 36px;
    font-family: FZDBSK--GBK1-0, FZDBSK--GBK1;
    font-weight: normal;
    color: #553724;
    line-height: 41px;
    letter-spacing: 1px;
    text-align: center;
    position: relative;
    margin-bottom: 45px;
    &::before,
    &::after {
        content: "";
        width: 83px;
        height: 7px;
        position: absolute;
        left: -50px;
        top: 15px;
        background-size: 100%;
    }
    &::after {
        left: auto;
        right: -50px;
        background-size: 100%;
    }
}
.login__title-vice {
    position: absolute;
    top: 145px;
    left: 125px;
    font-size: 18px;
    font-weight: normal;
    color: #333333;
    line-height: 21px;
}
.title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
}

.login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 370px;
    height: 454px;
    padding: 115px 62px 5px 62px;
    background-size: 95%;
    box-shadow: 0px 0px 56px 0px rgba(71, 71, 71, 0.18);
    .el-input {
        height: 38px;
        input {
            height: 38px;
        }
    }
    .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 2px;
    }
}
.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}
.login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
        cursor: pointer;
        vertical-align: middle;
    }
}
.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
}
.login__button,
.login__button:hover {
    background: #553724;
    border: 1px solid #553724;
    border-radius: 18px;
    color:#fff;
}
.login-code-index {
    .el-input__inner {
        width: 100%;
    }
}
</style>
