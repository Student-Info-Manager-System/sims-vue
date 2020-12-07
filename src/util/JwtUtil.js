import { Dialog } from "vant";
import $str from "./StrUtil";

let inu = that => that.$store.getters.getUser


let user = (that, set) => {
    let u = login(that)
    let url = ''
    if ($str.isT(u.type)) {
        url = '/sims/leader/v1/findLogin'
    }
    if ($str.isS(u.type)) {
        url = '/sims/student/v1/findLogin'
    }
    that.$axios
        .get(url, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((res) => {
            set(res.data.data)
        });
}

let getUser = (that, type, number, set) => {
    let url = ''
    if ($str.isT(type)) {
        url = '/sims/leader/v1/findByNumber/' + number
    }
    if ($str.isS(type)) {
        url = '/sims/student/v1/findByNumber/' + number
    }
    that.$axios
        .get(url, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((res) => {
            set(res.data.data)
        });
}

let login = that => {

    let u = inu(that)

    if ($str.isNull(u)) {
        Dialog.alert({
            title: '提示',
            message: '未登录，请先登录',
        }).then(() => {
            that.$router.push("/login")
            setTimeout(() => {
                that.$router.go(0);
            }, 100)
        })

    } else return u
};

let type = (that) => {
    let u = inu(that)

    if ($str.isNull(u)) {
        return '4'
    }
    try {
        return u.type
    }
    catch (err) {
        return '4'
    }
};

let logout = that => {
    let u = inu(that)

    if ($str.isNull(u)) {
        return
    }
    console.log(that)
    Dialog.confirm({
        title: "提示",
        message: "确定退出吗",
    })
        .then(() => {
            that.$store = null
            console.log("账户已注销");
            that.$axios.get("/sims/user/v1/logout").then(() => {
                that.$router.push("/login");
                setTimeout(() => {
                    that.$router.go(0);
                }, 100);
            });
        })
        .catch(() => {

        });


}

export default {
    inu, user, login, type, logout, getUser
}
