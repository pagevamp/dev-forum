import jQuery from 'jquery';
import $ from 'jquery';

export const tags = () => {
    (function($) {
        let tagsArr = [];
      
          var methods = {
              init: function(opts) {
                  opts = opts || {};
                  opts.tags = opts.tags || [];
      
                  var me = $(this);
                  var clean = new RegExp(',', 'g');
                  me.wrap('<div class="tag-cloud" />');
                  var cloud = me.parents('.tag-cloud');
      
                  cloud.click(function() {
                      me.focus();
                  });
      
                  var addTag = function(value) {
                      value = value.replace(clean, '');
                      if (value !== '') {
                          var tag = $('<div class="tag bg-slate-100 py-2 px-4 text-sm rounded-2xl inline-block me-2"><span>' + value + '</span></div>');
                          var del = $('<a href="#" class="close">Delete</a>');
      
                          del.click(function() {
                              del.parent().remove();
                          });
                          
                          tag.append(del);
                          tag.insertBefore(me);
                      }
                    
                    tagsArr.push(value);
                  }
      
                  me.blur(function() {
                      addTag(this.value);
                      this.value = '';
                  });
                  me.keyup(function(e) {
                       var key = e.keyCode;
                      var isEnter = key == 13;
                      var isComma = key == 188;
                      var isBack = key == 8;
                      
                      if (isEnter || isComma) {
                          addTag(this.value);
                          this.value = '';
                      }
                      if (isBack && this.data('delete-prev')) { 
                          $(this).prev().remove(); 
                          $(this).data('delete-prev',false);
                      } else if(isBack && this.value === '') {
                          $(this).data('delete-prev', true); 
                          
                      }
                  });
                  $.each(opts.tags, function(i, e) {
                      addTag(e);
                  });
              },
              get: function() {
                  return $('.tag span',this.parent()).map(function() {
                      return $(this).text();
                  });
              },
              clear: function() {
                  $('div', this).remove();
              }
          };
          $.fn.tagcloud = function(method) {
              if (methods[method]) {
                  return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
              } else if (typeof method === 'object' || !method) {
                  return methods.init.apply(this, arguments);
              } else {
                  $.error('Method ' + method + ' does not exist on tagcloud plugin');
              }
          };
      })(jQuery);
      
      $('.tags').tagcloud({
          tags: ['Quint', 'USS Indianapolis', 'Orca']
      
      });
      var tags = $('.tags').tagcloud('get');    
}