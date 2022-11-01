$(() => {
    let oldTel;
    $("#btnSub").click(() => {
        let tel = $("#tel").val().trim();
        if (!tel) {
            $("#error_info").text("手机号不为空");
            return false;
        }
        if (tel == oldTel) {
            return false;
        }
        let matched = /^(13[0-9]|14[5,7]|15[0-3,5-9]|17[0,3,5-8]|18[0-9]|166|198|199|147)\d{8}$/.test(tel);
        if (!matched) {
            $("#error_info").text("手机号码不正确");
            return false;
        }
        oldTel = tel;
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8511/outter/otp/phone/" + tel,
            success(res) {
                if (res.success) {
                    $("#error_info").text(res.data);
                } else {
                    $("#error_info").text(res.msg);
                }
            }
        })
    });
})