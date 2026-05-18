// CELARIS London — site behaviour
(function(){
  var hdr=document.getElementById('hdr');
  var hasHero=document.body.dataset.hero==='true';
  function onScroll(){
    if(!hdr)return;
    if(!hasHero||window.scrollY>40){hdr.classList.add('solid');}
    else{hdr.classList.remove('solid');}
  }
  if(!hasHero&&hdr)hdr.classList.add('solid');
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  // mobile menu
  var b=document.getElementById('burger'),m=document.getElementById('mobnav'),x=document.getElementById('mobx');
  if(b&&m){b.addEventListener('click',function(){m.classList.add('open');document.body.style.overflow='hidden';});}
  if(x&&m){x.addEventListener('click',function(){m.classList.remove('open');document.body.style.overflow='';});}
  if(m){m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open');document.body.style.overflow='';});});}

  // reveal on scroll
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

  // portfolio filter
  var fbtns=document.querySelectorAll('.filter button');
  if(fbtns.length){
    fbtns.forEach(function(btn){
      btn.addEventListener('click',function(){
        var cat=btn.dataset.cat;
        fbtns.forEach(function(x){x.classList.toggle('on',x===btn);});
        document.querySelectorAll('.collection').forEach(function(sec){
          var show=cat==='all'||sec.dataset.cat===cat;
          sec.style.display=show?'':'none';
        });
        window.scrollTo({top:0,behavior:'smooth'});
      });
    });
  }

  // contact form -> mailto (no-backend graceful fallback)
  var f=document.getElementById('cform');
  if(f){
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var n=encodeURIComponent(f.name.value||''),
          c=encodeURIComponent(f.company.value||''),
          e=encodeURIComponent(f.email.value||''),
          msg=encodeURIComponent(f.message.value||'');
      var body='Name: '+n+'%0D%0ACompany: '+c+'%0D%0AEmail: '+e+'%0D%0A%0D%0A'+msg;
      window.location.href='mailto:info@celarislondon.uk?subject='+
        encodeURIComponent('Enquiry — '+(f.company.value||f.name.value||'CELARIS London'))+'&body='+body;
      var s=document.querySelector('.sent');if(s)s.style.display='block';
    });
  }
})();
