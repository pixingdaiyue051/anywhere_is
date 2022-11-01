$(() => {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8511/user/list",
        success(res) {
            if (res.success) {
                $.each(res.data, (i, d) => {
                    $(".ht_tq_w .ht_table_w tbody").append(
                        '<tr><td>' + d.trueName + '</td><td>' + d.phone + '</td></tr>'
                    );
                });
            } else {
                $("#error_info").text(res.msg);
            }
        }
    })
})