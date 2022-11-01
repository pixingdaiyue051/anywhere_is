$(() => {
    $("#btnLogin").click(() => {
        let userName = $("#userName").val().trim();
        if (!userName) {
            $("#error_info").text("用户名不为空");
            return false;
        }
        let password = $("#password").val().trim();
        if (!password) {
            $("#error_info").text("密码不为空");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8511/user/login",
            data: {userName: userName, password: password},
            success(res) {
                if (res.success) {
                    $("#error_info").text(res.data);
                    window.location.href = './index.html';
                } else {
                    $("#error_info").text(res.msg);
                }
            }
        })
    });
})