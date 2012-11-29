(function($) {    
    
    var methods = {        
        init: function(behavior) {                       
            var $this = $(this), data = $this.data('dmTabsBehavior');
            if (data && behavior.dm_behavior_id != data.dm_behavior_id) { 
                alert('You can not attach tabs behavior to same content');
            };
            $this.data('dmTabsBehavior', behavior);
        },
        start: function(behavior) {  
            var $this = $(this);
            
            var $copy = $this.children().clone(true, true);
            $this.data('dmTabsBehaviorPreviousDOM', $this.children().detach());
            $this.children().remove();
            
            var $wrapper = $('<div class="dmTabsBehavior ' + behavior.theme + '"></div>');
            var $titlesWrapper = $('<div class="tab-titles-wrapper"></div>');
            var $contentsWrapper = $('<div class="tab-contents-wrapper"></div>');
            $wrapper.append($titlesWrapper).append($contentsWrapper);
            
            var total = $copy.length; 
            $.each($copy, function(index){
                if (behavior.title == 'at_top') {
                    if (total/2 > index) {
                        $titlesWrapper.append($(this));
                    } else {
                        $contentsWrapper.append($(this));
                    };
                } else { // 'alternate'
                    if (index%2 == 0) {
                        $titlesWrapper.append($(this));
                    } else {
                        $contentsWrapper.append($(this));
                    };
                };
            });
            
            var self = this;
                        
            $.each($titlesWrapper.children(), function(index){
                var $this = $(this);
                $this.addClass('tab-title').addClass('tab-title-index-' + index);
                if (index + 1 == behavior.initialy_open) {
                    $this.addClass('tab-open');
                } else {
                    $this.addClass('tab-closed');
                };
                $this.bind(behavior.event, function(){
                    if ($this.hasClass('tab-open')) return;
                    methods['animate'].apply(self, [behavior, $(this)]);
                });
            });
            
            $.each($contentsWrapper.children(), function(index){
                var $this = $(this);
                $this.addClass('tab-content').addClass('tab-content-index-' + index);
                if (index + 1 == behavior.initialy_open) {
                    $this.addClass('tab-open');
                } else {
                    $this.addClass('tab-closed').css('display', 'none');
                };
            });
            
            $this.append($wrapper);
        },
        stop: function(behavior) {
            var $this = $(this);
            $this.children().remove();
            $this.append($this.data('dmTabsBehaviorPreviousDOM'));           
        },
        destroy: function(behavior) {            
            var $this = $(this);
            $this.data('dmTabsBehavior', null);
            $this.data('dmTabsBehaviorPreviousDOM', null);
        },
        animate: function(behavior, $sender) {
            var $this = $(this);
            if ($this.hasClass('dmTabsBehaviorAnimating')) return;
            $this.addClass('dmTabsBehaviorAnimating');
            
            var $currentOpenTab = $this.find('.tab-title.tab-open'), 
            $currentOpenContent = $this.find('.tab-content.tab-open'),
            $targetOpenTab = $sender, 
            $targetOpenContent = $($this.find('.tab-content')[$sender.index()]);
            
            function close() {
                $currentOpenTab.removeClass('tab-open').addClass('tab-closed');
                $currentOpenContent.removeClass('tab-open').addClass('tab-closed'); 
            };
            function open() {
                $targetOpenTab.removeClass('tab-closed').addClass('tab-open');
                $targetOpenContent.removeClass('tab-closed').addClass('tab-open');
            };
            switch(behavior.animation) {
                case 'slide': {
                        $currentOpenContent.slideUp(behavior.duration, behavior.easing, function(){
                            close();
                            $targetOpenContent.slideDown(behavior.duration, behavior.easing, function(){
                                open();
                                $this.removeClass('dmTabsBehaviorAnimating');
                            });
                        });
                } break;
                case 'show': {
                        $currentOpenContent.hide(behavior.duration, behavior.easing, function(){
                            close();
                            $targetOpenContent.show(behavior.duration, behavior.easing, function(){
                                open();
                                $this.removeClass('dmTabsBehaviorAnimating');
                            });
                        });
                } break;
                case 'fade': {
                        $currentOpenContent.fadeOut(behavior.duration, behavior.easing, function(){
                            close();
                            $targetOpenContent.fadeIn(behavior.duration, behavior.easing, function(){
                                open();
                                $this.removeClass('dmTabsBehaviorAnimating');
                            });
                        });
                } break;
                default: {
                        $currentOpenContent.css('display', 'none');
                        close();
                        $targetOpenContent.css('display', 'block');
                        open();
                        $this.removeClass('dmTabsBehaviorAnimating');
                } break;
            };
        }
    };
    
    $.fn.dmTabsBehavior = function(method, behavior){
        
        return this.each(function() {
            if ( methods[method] ) {
                return methods[ method ].apply( this, [behavior]);
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, [method] );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.dmTabsBehavior' );
            }; 
        });
    };

    $.extend($.dm.behaviors, {        
        dmTabsBehavior: {
            init: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmTabsBehavior('init', behavior);
            },
            start: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmTabsBehavior('start', behavior);
            },
            stop: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmTabsBehavior('stop', behavior);
            },
            destroy: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmTabsBehavior('destroy', behavior);
            }
        }
    });
    
})(jQuery);