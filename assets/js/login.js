$(function() {
    //点击 去注册账号 的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 去登录 的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form

    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个名为 pwd 的校验规则
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位且不能包含空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                // return 一个提示消息
                return '两次密码不一致'
            }
            
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e) {
        e.preventDefault()
        // 提出参数对象储存为变量
        var data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,
        function(res){
            if(res.status !== 0){
                // return console.log(res.message)
                // 使用layer.msg()提示消息
                return layer.msg(res.message)
            }
            // console.log("注册成功")
            // 使用layer.msg()提示消息
            layer.msg("注册成功，请登录")
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0){
                    console.log(res)
                    return layer.msg('登陆失败！')
                }
                layer.msg("登陆成功")
                console.log(res.token)
                // 将登陆成功得到的tocken字符串，保存到localStorage中
                localStorage.setItem('tocken',res.tocken)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })

})