(function(window, $) {
    var CabanaCookies = function(elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        // this.metadata = this.$elem.data('notification');
    };

    CabanaCookies.prototype = {
        defaults: {
            content: ".header"
        },
        init: function() {
            this.config = $.extend({}, this.defaults, this.options);
            this.renderStyles();
            this.cookies();
            return this;
        },
        renderStyles: function() {

            var styles = "." + this.$elem.attr("class") + "{display:block;position:fixed;z-index:2000;opacity:1;left:0;right:0;bottom:100%;transform:translateY(100%)}";
            styles += "." + this.$elem.attr("class") + ".closed{transform:translateY(0);opacity:0}";

            var render = function(styles) {

                var css = document.createElement('style');
                css.type = 'text/css';

                if (css.styleSheet) css.styleSheet.cssText = styles;
                else css.appendChild(document.createTextNode(styles));

                document.getElementsByTagName("head")[0].appendChild(css);

            }

            window.onload = function() { render(styles) };
        },
        cookies: function() {
            var openNotifications = 0;
            var mainMargin = 0;
             this.$elem.each(function() {
                var name = $(this).attr('data-notification'),
                    value = $(this).find('[data-notification-set]').attr('data-notification-set');

                var cookie = $.cookie(name);

                if (cookie && cookie === value) {
                    return;
                }

                openNotifications++;
                mainMargin += $(this).outerHeight();

                $(this).removeClass('closed');
            });
	
             var content = this.options.content;

            $(content).css('margin-top', mainMargin);


            if (openNotifications > 0) {

                $('body').on('click', '[data-notification-set]', function(e) {

                    e.preventDefault();

                    var value = $(this).attr('data-notification-set'),
                        notification = $(this).parents('[data-notification]').first(),
                        name = notification.attr('data-notification'),
                        interval = notification.attr('data-notification-interval') || $(this).attr('data-notification-interval') || 0;

                    interval = parseInt(interval);

                    var notificationHeight = notification.outerHeight();

                    if (typeof interval !== 'number') {
                        interval = 0;
                    }

                    if (!$.cookie(name, value, { expires: interval })) {
                        return console.log('Could not set cookie');
                    } else {
                        notification.addClass('closed');
                    }



                     $(content).each(function() {
                        var margin = parseInt($(this).css('margin-top'));
                        margin = margin - notificationHeight;

                        if (margin < 0) {
                            margin = 0;
                        }

                        $(this).css('margin-top', margin);
                    });

                });

            }
        }
    }


    CabanaCookies.defaults = CabanaCookies.prototype.defaults;

    $.fn.CabanaCookies = function(options) {

        return this.each(function() {
            new CabanaCookies(this, options).init();
        });
    };

    window.CabanaCookies = CabanaCookies;
})(window, jQuery);
