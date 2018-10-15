<script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js">
</script>

<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love">
    <i class="fa fa-angellist"></i>
  </span>
  <a class="theme-link" href="https://github.com/palmerye" target="view_window" style="cursor: pointer" rel="external nofollow">
    {{ config.author }}
  </a>
</div>

{% if theme.copyright %}
<div class="powered-by">
  {{ __('footer.powered', '<a class="theme-link" href="http://hexo.io" rel="external nofollow">Hexo</a>') }}
</div>

<span id="busuanzi_container_site_pv">
  PV <span id="busuanzi_value_site_pv"></span>
</span>
<span id="busuanzi_container_site_uv">
  &nbsp&nbsp | &nbsp&nbsp UV <span id="busuanzi_value_site_uv"></span>
</span>

<script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>

{% endif %}
