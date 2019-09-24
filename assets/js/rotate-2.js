    var angle = 60;
    $(document).ready(function () {
        var start = 60;
        var end = start + 90;
        $('#btn-01').click(function () {
            $('.spinner').animateRotate(start, end);
            start = end;
            end = end + 90;
        });

    });
    $.fn.animateRotate = function (startAngle, endAngle, duration, easing, complete) {
        return this.each(function () {
            var elem = $(this);

            $({
                deg: startAngle
            }).animate({
                deg: endAngle
            }, {
                duration: duration,
                easing: easing,
                step: function (now) {
                    elem.css({
                        'transform': 'rotate(' + now + 'deg)'
                    });
                },
                complete: complete || $.noop
            });
        });
    };
