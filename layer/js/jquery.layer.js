var modal = (function () {
    //初始化变量
    var method = {},
        $overpar, $modal, $content, $close, $title, drag = false;
    //动态创建html
    $overpar = $('<div id="overpar"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a href="#" id="close">×</a>');
    $title = $('<h1 id="title"></h1>')
    $(".main").append($overpar, $modal);
    $modal.append($content, $close);

    //关闭弹出层
    $close.on('click', function () {
        method.close();
    });
    $overpar.hide();
    $modal.hide();
    //定义居中方法
    method.center = function () {
        var left, top;
        left = ($(window).width() - $modal.outerWidth()) / 2;
        top = ($(window).height() - $modal.outerHeight()) / 2;
        $modal.css({
            left: left + $(window).scrollLeft(),
            top: top + $(window).scrollTop()
        });
    }

    //定义open方法
    method.open = function (settings) {
        $content.empty().append(settings.content);
        $content.css({
            width: settings.width || 'auto',
            height: settings.height || 'auto'
        });
        $(window).on('resize', method.center);
        method.center();
        $modal.show();
        $overpar.show();


    }

    //定义关闭方法
    method.close = function () {
            $overpar.hide();
            $modal.hide();
            $(window).off('resize', method.center) //释放内存，若不释放，内存泄漏
                // method.open = null;不能使用此方法；
        }
        //定义drag方法

    $modal.on('mousedown', function (e) {

        var event = window.event || e,
            divX = event.clientX - $modal.offset().left,
            divY = event.clientY - $modal.offset().top;
        //console.log(divX);
        $(document).on('mousemove', function (e) {
            var event = window.event || e,
                X = event.clientX,
                Y = event.clientY;

            var L = X - divX,
                H = Y - divY,
                divW = document.documentElement.clientWidth - ($modal.width() + $content.width()),
                divH = document.documentElement.clientHeight - ($modal.height() + $content.height());
            //console.log($modal.width());
            if (L < 0) {
                L = 0
            };
            if (H < 0) {
                H = 0
            };
            if (L > divW) {
                L = divW
            };
            if (H > divH) {
                H = divH
            };
            $modal.css({
                left: L + "px"
            });
            $modal.css({
                top: H + "px"
            });
        });
        $(document).on('mouseup', function () {
            $(document).off('mousemove');
            $modal.off('mouseup');
        })
    })
    return method;
}());