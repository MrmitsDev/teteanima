document.documentElement.classList.add('js');
const icons={heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',sparkles:'m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7L12 3ZM3 3v4M1 5h4M21 17v4M19 19h4',message:'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5a9.5 9.5 0 1 1 19 0ZM7 10h10M7 14h6',pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',castle:'M3 21V7h4v4h3V4h4v7h3V7h4v14H3ZM9 21v-5a3 3 0 0 1 6 0v5M12 4V1l4 1-4 1M3 7V4M7 7V4M17 7V4M21 7V4',balloon:'M19 9c0 5-4 9-7 9S5 14 5 9a7 7 0 1 1 14 0ZM10 18l-1 3h6l-1-3M12 21v2M8 8c0-2 1-3 3-3',game:'M6 7h12a3 3 0 0 1 3 3l1 7a3 3 0 0 1-5 2l-3-2h-4l-3 2a3 3 0 0 1-5-2l1-7a3 3 0 0 1 3-3ZM7 10v5M4.5 12.5h5M16 11h.01M18 14h.01',compass:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-6-4-2 6-6 2 2-6 6-2Z',gift:'M3 8h18v4H3V8ZM5 12v9h14v-9M12 8v13M12 8H7a3 3 0 1 1 3-3l2 3Zm0 0h5a3 3 0 1 0-3-3l-2 3Z',mic:'M15 5v7a3 3 0 0 1-6 0V5a3 3 0 0 1 6 0ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8',expand:'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5',phone:'M21 16v4a2 2 0 0 1-2 2C10 21 3 14 2 5a2 2 0 0 1 2-2h4l2 5-3 2a16 16 0 0 0 7 7l2-3 5 2Z'};
document.querySelectorAll('[data-icon]').forEach(el=>{const path=icons[el.dataset.icon];if(path)el.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;});
const header=document.querySelector('#header'),menuButton=document.querySelector('.menu-toggle'),mobileNav=document.querySelector('#mobile-nav');const updateHeader=()=>header.classList.toggle('scrolled',window.scrollY>45);updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');mobileNav.classList.remove('open');mobileNav.inert=true;document.body.classList.remove('menu-open');}
menuButton.addEventListener('click',()=>{if(menuButton.getAttribute('aria-expanded')==='true'){closeMenu();return;}menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label','Fechar menu');mobileNav.classList.add('open');mobileNav.inert=false;document.body.classList.add('menu-open');});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{closeMenu();const target=document.querySelector(link.hash);if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileNav.classList.contains('open')){closeMenu();menuButton.focus();}if(e.key==='Tab'&&mobileNav.classList.contains('open')){const last=mobileNav.querySelector('a:last-child');if(e.shiftKey&&document.activeElement===menuButton){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();menuButton.focus();}}});window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const reveals=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.07});reveals.forEach(el=>observer.observe(el));}else reveals.forEach(el=>el.classList.add('visible'));
const galleryButtons=[...document.querySelectorAll('[data-gallery]')],dialog=document.querySelector('#lightbox'),largeImage=document.querySelector('#lightbox-image');let activeIndex=0,galleryOpener=null;
function showImage(index){activeIndex=(index+galleryButtons.length)%galleryButtons.length;const photo=galleryButtons[activeIndex].querySelector('img');largeImage.src=photo.src;largeImage.alt=photo.alt;document.querySelector('#lightbox-caption').textContent=photo.alt;document.querySelector('#lightbox-counter').textContent=`${activeIndex+1} / ${galleryButtons.length}`;}
galleryButtons.forEach((button,index)=>button.addEventListener('click',()=>{galleryOpener=button;showImage(index);dialog.showModal();document.body.classList.add('modal-open');}));document.querySelector('#lightbox-close').addEventListener('click',()=>dialog.close());document.querySelector('#lightbox-prev').addEventListener('click',()=>showImage(activeIndex-1));document.querySelector('#lightbox-next').addEventListener('click',()=>showImage(activeIndex+1));dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');galleryOpener?.focus({preventScroll:true});});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showImage(activeIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showImage(activeIndex-1);}});let touchX=0;largeImage.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;},{passive:true});largeImage.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>50)showImage(activeIndex+(delta<0?1:-1));},{passive:true});
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{const checkbox=[...document.querySelectorAll('[name=services]')].find(input=>input.value===link.dataset.service);if(checkbox)checkbox.checked=true;}));document.querySelectorAll('[data-event]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#event').value=link.dataset.event;}));
const form=document.querySelector('#orcamento'),status=document.querySelector('#form-status'),submitButton=form.querySelector('[type=submit]'),fallback=document.querySelector('#whatsapp-fallback'),today=new Date(),localDate=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;document.querySelector('#date').min=localDate;
function clearError(input){input.removeAttribute('aria-invalid');input.removeAttribute('aria-describedby');input.closest('.field')?.querySelector('.field-error')?.remove();}
submitButton.disabled=false;
function fieldError(input,message){input.setAttribute('aria-invalid','true');const error=document.createElement('span');error.className='field-error';error.id=`${input.id}-error`;error.textContent=message;input.setAttribute('aria-describedby',error.id);input.parentElement.append(error);}
form.querySelectorAll('input,select,textarea').forEach(input=>input.addEventListener('input',()=>{clearError(input);fallback.hidden=true;status.textContent='';}));
form.addEventListener('submit',e=>{e.preventDefault();form.querySelectorAll('input,select,textarea').forEach(clearError);let firstInvalid=null;for(const input of form.querySelectorAll('.field input,.field select,.field textarea')){let message='';if(input.required&&!input.value.trim())message='Preencha este campo, por favor.';else if(input.type==='email'&&input.validity.typeMismatch)message='Introduza um endereço de e-mail válido.';else if(input.type==='tel'&&input.value&&(!/^[+\d\s().-]+$/.test(input.value)||input.value.replace(/\D/g,'').length<7||input.value.replace(/\D/g,'').length>15))message='Introduza um número de telefone válido.';else if(input.type==='date'&&input.value&&input.value<localDate)message='Escolha uma data a partir de hoje.';else if(input.type==='number'&&input.value&&(!input.validity.valid||!Number.isInteger(Number(input.value))))message='Introduza um número inteiro entre 1 e 100 000.';else if(!input.validity.valid)message='Verifique o valor deste campo.';if(message){fieldError(input,message);firstInvalid??=input;}}
if(firstInvalid){status.className='error';status.textContent='Falta só rever os campos assinalados.';fallback.hidden=true;firstInvalid.focus();return;}
const data=new FormData(form),eventDate=data.get('date')?new Intl.DateTimeFormat('pt-PT').format(new Date(`${data.get('date')}T12:00:00`)):'A combinar';const message=['Olá! Gostaria de pedir um orçamento para uma festa/evento.','',`Nome: ${String(data.get('name')).trim()}`,`Telefone: ${data.get('phone')}`,data.get('email')?`E-mail: ${data.get('email')}`:'',`Data: ${eventDate}`,`Tipo de evento: ${data.get('event')}`,`Localidade: ${String(data.get('location')).trim()}`,data.get('guests')?`N.º aproximado de crianças/convidados: ${data.get('guests')}`:'',`Serviços: ${data.getAll('services').join(', ')||'Gostaria de ajuda para escolher'}`,data.get('message')?`Mensagem: ${String(data.get('message')).trim()}`:''].filter((line,index)=>line||index===1).join('\n');const url=`https://wa.me/351917314350?text=${encodeURIComponent(message)}`;submitButton.disabled=true;submitButton.textContent='A preparar o seu pedido…';fallback.href=url;fallback.hidden=false;status.className='success';status.textContent='Pedido preparado. Reveja a mensagem no WhatsApp e toque em enviar. Se não abrir, utilize o link abaixo.';window.open(url,'_blank','noopener,noreferrer');setTimeout(()=>{submitButton.disabled=false;submitButton.innerHTML='Preparar pedido no WhatsApp <span aria-hidden="true">↗</span>';},700);});

// Configure the visible quote form without sending data or opening WhatsApp.
if(document.modelContext?.registerTool){
 const lifecycle=new AbortController();
 const eventOptions=[...document.querySelector('#event').options].map(o=>o.value).filter(Boolean);
 const serviceOptions=[...form.querySelectorAll('[name=services]')].map(i=>i.value);
 try{Promise.resolve(document.modelContext.registerTool({
  name:'configure_quote_interests',title:'Escolher animações para o orçamento',
  description:'Select the event type and animation interests in the visible quote form. Stages a request only: does not send information, create a booking, or open WhatsApp. Personal details remain for the visitor to complete.',
  inputSchema:{type:'object',properties:{eventType:{type:'string',enum:eventOptions},services:{type:'array',items:{type:'string',enum:serviceOptions},uniqueItems:true}},required:['eventType','services'],additionalProperties:false},
  annotations:{readOnlyHint:false,untrustedContentHint:false},
  execute(input){
   if(!input||typeof input!=='object'||Object.keys(input).some(k=>!['eventType','services'].includes(k))||!eventOptions.includes(input.eventType)||!Array.isArray(input.services)||input.services.some(s=>!serviceOptions.includes(s)))throw new Error('Tipo de evento ou serviço inválido.');
   document.querySelector('#event').value=input.eventType;
   form.querySelectorAll('[name=services]').forEach(i=>{i.checked=input.services.includes(i.value);});
   document.querySelector('#event').dispatchEvent(new Event('input',{bubbles:true}));
   form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
   return {status:'configured',eventType:input.eventType,services:[...new Set(input.services)],sent:false};
  }
 },{signal:lifecycle.signal})).catch(()=>{});}catch{}
 window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}

// Leave text and controls unobstructed by the floating contact on small screens.
const floatingContact=document.querySelector('.whatsapp-float');
const contactObstacles=[...document.querySelectorAll('.hero-copy,.trust-grid>div,.service,.mini-service,.gallery-item,.event-row,.process-grid li,.review-card,.cta-panel,.contact-line,.footer-grid a,.footer-bottom,main h2,main .eyebrow')];
let formVisible=false,contactFrame=0;
function updateFloatingContact(){
 contactFrame=0;
 const button=floatingContact.getBoundingClientRect();
 const obscuresContent=window.matchMedia('(max-width:760px)').matches&&contactObstacles.some(el=>{
  const rect=el.getBoundingClientRect();
  return rect.width>0&&rect.bottom>button.top-8&&rect.top<button.bottom+8&&rect.right>button.left-8&&rect.left<button.right+8;
 });
 const hidden=formVisible||obscuresContent||document.body.classList.contains('modal-open')||document.body.classList.contains('menu-open');
 floatingContact.classList.toggle('is-hidden',hidden);
 floatingContact.tabIndex=hidden?-1:0;
 floatingContact.setAttribute('aria-hidden',String(hidden));
}
function scheduleFloatingContact(){if(!contactFrame)contactFrame=requestAnimationFrame(updateFloatingContact);}
window.addEventListener('scroll',scheduleFloatingContact,{passive:true});
window.addEventListener('resize',scheduleFloatingContact);
new MutationObserver(scheduleFloatingContact).observe(document.body,{attributes:true,attributeFilter:['class']});
if('IntersectionObserver' in window){
 new IntersectionObserver(entries=>{formVisible=entries.some(entry=>entry.isIntersecting);scheduleFloatingContact();},{threshold:0}).observe(form);
}
window.addEventListener('load',scheduleFloatingContact,{once:true});
scheduleFloatingContact();
