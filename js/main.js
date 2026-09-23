/* ==========================================================================
   拾野茶集（SHIYE TEA）官方网站 - 全站交互脚本
   纯原生 JavaScript，无任何第三方依赖、无外部接口调用
   模块：导航 / 轮播 / 商品筛选 / 图集 / 规格 / 倒计时 / 优惠券 / FAQ /
        留言表单 / 返回顶部 / 滚动动效 / 轻提示
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var STORE_KEY = 'shiye_leads';
  var COUPON_KEY = 'shiye_coupons';

  /* 轻提示 ---------------------------------------------------------------- */
  var toastEl = null;
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2600);
  }

  /* 1. 移动端导航 -------------------------------------------------------- */
  function initNav() {
    var toggle = $('[data-nav-toggle]');
    var nav = $('#siteNav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav__link').forEach(function (a) {
      var target = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (target && target === here) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* 2. 产品轮播 ---------------------------------------------------------- */
  function initCarousels() {
    $$('[data-carousel]').forEach(function (root) {
      var track = $('.carousel__track', root);
      var slides = $$('.carousel__slide', root);
      var dotsBox = $('.carousel__dots', root);
      if (!track || slides.length < 1) return;
      var index = 0;
      var delay = parseInt(root.getAttribute('data-slide-delay'), 10) || 5000;
      var timer = null;

      if (dotsBox) {
        dotsBox.innerHTML = slides.map(function (s, i) {
          return '<button class="carousel__dot" type="button" data-goto="' + i +
            '" aria-label="切换到第' + (i + 1) + '屏"></button>';
        }).join('');
      }
      function render() {
        track.style.transform = 'translateX(' + (-index * 100) + '%)';
        $$('.carousel__dot', root).forEach(function (d, i) {
          d.classList.toggle('is-active', i === index);
        });
        slides.forEach(function (s, i) {
          s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
        });
      }
      function go(i) { index = (i + slides.length) % slides.length; render(); }
      function play() { stop(); timer = window.setInterval(function () { go(index + 1); }, delay); }
      function stop() { if (timer) window.clearInterval(timer); }

      var prev = $('[data-carousel-prev]', root);
      var next = $('[data-carousel-next]', root);
      if (prev) prev.addEventListener('click', function () { go(index - 1); play(); });
      if (next) next.addEventListener('click', function () { go(index + 1); play(); });
      if (dotsBox) dotsBox.addEventListener('click', function (e) {
        var b = e.target.closest('[data-goto]');
        if (b) { go(parseInt(b.getAttribute('data-goto'), 10)); play(); }
      });
      root.addEventListener('mouseenter', stop);
      root.addEventListener('mouseleave', play);
      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { go(index - 1); play(); }
        if (e.key === 'ArrowRight') { go(index + 1); play(); }
      });
      render();
      if (slides.length > 1) play();
    });
  }

  /* 3. 商品分类筛选与排序 ------------------------------------------------ */
  function initProductFilter() {
    var cards = $$('[data-filter-item], [data-product]');
    if (!cards.length) return;
    var buttons = $$('[data-filter]');
    var sort = $('[data-sort]');
    var counter = $('[data-result-count]');
    var state = { cat: 'all', sort: 'default' };

    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var ok = state.cat === 'all' || card.getAttribute('data-cat') === state.cat;
        card.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (counter) counter.textContent = shown;
      if (state.sort === 'default') return;
      var grid = cards[0].parentNode;
      var sorted = cards.slice().sort(function (a, b) {
        var pa = parseFloat(a.getAttribute('data-price'));
        var pb = parseFloat(b.getAttribute('data-price'));
        var ra = parseFloat(a.getAttribute('data-rank') || '0');
        var rb = parseFloat(b.getAttribute('data-rank') || '0');
        if (state.sort === 'price-asc') return pa - pb;
        if (state.sort === 'price-desc') return pb - pa;
        return rb - ra;
      });
      sorted.forEach(function (c) { grid.appendChild(c); });
    }
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        state.cat = btn.getAttribute('data-filter');
        apply();
      });
    });
    if (sort) sort.addEventListener('change', function () { state.sort = sort.value; apply(); });
    apply();
  }

  /* 4. 详情页图集 -------------------------------------------------------- */
  function initGallery() {
    var main = $('[data-gallery-main]');
    if (!main) return;
    $$('[data-gallery-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var src = thumb.getAttribute('data-src') || ($('img', thumb) || {}).src;
        if (!src) return;
        main.src = src;
        $$('[data-gallery-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
      });
    });
  }

  /* 5. 规格选择与数量 ---------------------------------------------------- */
  function initOptions() {
    $$('[data-opt-group]').forEach(function (group) {
      $$('[data-opt]', group).forEach(function (opt) {
        opt.addEventListener('click', function () {
          $$('[data-opt]', group).forEach(function (o) {
            o.classList.remove('is-active');
            o.setAttribute('aria-pressed', 'false');
          });
          opt.classList.add('is-active');
          opt.setAttribute('aria-pressed', 'true');
          var out = $('[data-opt-output]', group.parentNode);
          if (out) out.textContent = opt.getAttribute('data-opt');
        });
      });
    });
    $$('[data-qty]').forEach(function (box) {
      var input = $('input', box);
      var min = parseInt(input.getAttribute('min'), 10) || 1;
      var max = parseInt(input.getAttribute('max'), 10) || 99;
      var minus = $('[data-qty-minus]', box);
      var plus = $('[data-qty-plus]', box);
      if (minus) minus.addEventListener('click', function () {
        input.value = Math.max(min, (parseInt(input.value, 10) || min) - 1);
      });
      if (plus) plus.addEventListener('click', function () {
        input.value = Math.min(max, (parseInt(input.value, 10) || min) + 1);
      });
      input.addEventListener('change', function () {
        var v = parseInt(input.value, 10) || min;
        input.value = Math.min(max, Math.max(min, v));
      });
    });
    $$('[data-buy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var name = $('[data-product-name]');
        var opt = $('.opt.is-active[data-opt]');
        var qty = $('[data-qty] input');
        toast('已加入意向单：' + (name ? name.textContent.trim() : '拾野茶集产品') +
          (opt ? '（' + opt.getAttribute('data-opt') + '）' : '') +
          (qty ? ' × ' + qty.value : '') + '，客服将尽快与您确认');
      });
    });
  }

  /* 6. 活动倒计时 -------------------------------------------------------- */
  function initCountdown() {
    var boxes = $$('[data-countdown]');
    if (!boxes.length) return;
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var now = Date.now();
      boxes.forEach(function (box) {
        var end = new Date(box.getAttribute('data-deadline')).getTime();
        var left = Math.max(0, end - now);
        var d = Math.floor(left / 86400000);
        var h = Math.floor((left % 86400000) / 3600000);
        var m = Math.floor((left % 3600000) / 60000);
        var s = Math.floor((left % 60000) / 1000);
        var html = '<li><b>' + d + '</b><span>天</span></li><li><b>' + pad(h) + '</b><span>时</span></li>' +
          '<li><b>' + pad(m) + '</b><span>分</span></li><li><b>' + pad(s) + '</b><span>秒</span></li>';
        if (left <= 0) html = '<li><b>已结束</b><span>活动</span></li>';
        if (box.innerHTML !== html) box.innerHTML = html;
      });
    }
    tick();
    window.setInterval(tick, 1000);
  }

  /* 7. 优惠券领取与复制 -------------------------------------------------- */
  function initCoupons() {
    var saved = [];
    try { saved = JSON.parse(window.localStorage.getItem(COUPON_KEY) || '[]'); } catch (e) { saved = []; }
    $$('[data-coupon]').forEach(function (btn) {
      var code = btn.getAttribute('data-coupon');
      if (saved.indexOf(code) > -1) btn.textContent = '已领取 · 复制券码';
      btn.addEventListener('click', function () {
        var done = function () { toast('券码 ' + code + ' 已复制，下单时填入即可抵扣'); };
        var fail = function () { toast('券码：' + code + '（请手动复制给客服）'); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(done, fail);
        } else {
          var ta = document.createElement('textarea');
          ta.value = code;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (e) { fail(); }
          document.body.removeChild(ta);
        }
        if (saved.indexOf(code) < 0) {
          saved.push(code);
          try { window.localStorage.setItem(COUPON_KEY, JSON.stringify(saved)); } catch (e) {}
        }
        btn.textContent = '已领取 · 复制券码';
      });
    });
  }

  /* 8. FAQ 手风琴 -------------------------------------------------------- */
  function initFaq() {
    $$('.faq').forEach(function (faq) {
      $$('.faq__q', faq).forEach(function (q) {
        q.addEventListener('click', function () {
          var item = q.parentNode;
          var open = item.classList.contains('is-open');
          $$('.faq__item', faq).forEach(function (i) {
            i.classList.remove('is-open');
            $('.faq__q', i).setAttribute('aria-expanded', 'false');
            var mark = $('.faq__q span', i);
            if (mark) mark.textContent = '+';
          });
          if (!open) {
            item.classList.add('is-open');
            q.setAttribute('aria-expanded', 'true');
            var m = $('.faq__q span', item);
            if (m) m.textContent = '−';
          }
        });
      });
    });
  }

  /* 9. 留言 / 咨询表单 --------------------------------------------------- */
  function validateField(field) {
    var input = $('input, textarea, select', field);
    if (!input) return true;
    var value = (input.value || '').trim();
    var rule = input.getAttribute('data-rule');
    var msg = '';
    if (input.hasAttribute('required') && !value) msg = '请填写此项';
    else if (rule === 'phone' && !/^1[3-9]\d{9}$/.test(value)) msg = '请填写 11 位中国大陆手机号';
    else if (rule === 'name' && value.length < 2) msg = '姓名至少 2 个字';
    else if (rule === 'message' && value.length < 5) msg = '请至少填写 5 个字，方便我们准备方案';
    else if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) msg = '请先同意信息使用说明';
    var err = $('.form__error', field);
    if (err) err.textContent = msg;
    field.classList.toggle('has-error', !!msg);
    return !msg;
  }
  function initForms() {
    $$('[data-lead-form]').forEach(function (form) {
      $$('.field', form).forEach(function (field) {
        var input = $('input, textarea, select', field);
        if (input) input.addEventListener('blur', function () { validateField(field); });
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        $$('.field', form).forEach(function (field) { if (!validateField(field)) ok = false; });
        var status = $('.form-status', form);
        if (!ok) {
          if (status) { status.classList.remove('is-visible'); }
          toast('请检查标红项后再提交');
          var firstErr = $('.field.has-error input, .field.has-error textarea, .field.has-error select', form);
          if (firstErr) firstErr.focus();
          return;
        }
        var data = {};
        $$('input, textarea, select', form).forEach(function (el) {
          if (el.name) data[el.name] = el.type === 'checkbox' ? el.checked : el.value.trim();
        });
        var now = new Date();
        var stamp = '' + now.getFullYear() + ('0' + (now.getMonth() + 1)).slice(-2) + ('0' + now.getDate()).slice(-2);
        data.no = 'SY' + stamp + '-' + Math.floor(1000 + Math.random() * 9000);
        data.time = now.toLocaleString('zh-CN');
        data.page = location.pathname.split('/').pop() || 'index.html';
        var list = [];
        try { list = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]'); } catch (err) { list = []; }
        list.push(data);
        try { window.localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch (err) {}
        if (status) {
          status.innerHTML = '提交成功。您的咨询编号为 <strong>' + data.no +
            '</strong>，专属茶顾问将在 30 分钟内（工作日 9:00-18:00）与您联系。您也可以扫码添加企业微信，回复编号可优先处理。';
          status.classList.add('is-visible');
          status.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        toast('提交成功，咨询编号 ' + data.no);
        form.reset();
      });
    });
  }

  /* 10. 返回顶部与滚动动效 ---------------------------------------------- */
  function initScroll() {
    var toTop = $('[data-to-top]');
    if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    var reveals = $$('.reveal');
    function revealNow(el) { el.classList.add('is-visible'); }
    function inViewport(el) {
      var rect = el.getBoundingClientRect();
      var h = window.innerHeight || document.documentElement.clientHeight || 800;
      return rect.top < h * 0.96 && rect.bottom > 0;
    }
    reveals.forEach(function (el) { if (inViewport(el)) revealNow(el); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { revealNow(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });
      reveals.forEach(function (el) { if (!el.classList.contains('is-visible')) io.observe(el); });
    }
    window.setTimeout(function () { reveals.forEach(revealNow); }, 2500);
    if (toTop) {
      var onScroll = function () { toTop.classList.toggle('is-visible', window.scrollY > 520); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* 11. 站内锚点与咨询高亮 ---------------------------------------------- */
  function initConsultLinks() {
    $$('[data-consult]').forEach(function (el) {
      el.addEventListener('click', function () {
        if (el.tagName === 'A') toast('正在为您接入专属茶顾问，也可直接扫码添加企业微信');
      });
    });
  }

  window.SHIYE = { toast: toast };

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initCarousels();
    initProductFilter();
    initGallery();
    initOptions();
    initCountdown();
    initCoupons();
    initFaq();
    initForms();
    initScroll();
    initConsultLinks();
  });
})();
