(function(){
'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const small=matchMedia('(max-width: 700px)');
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* =====================  Datos  ===================== */
const STACK=[
  ['Servidor','Laravel · PHP','Aplicaciones web con lógica de negocio y APIs REST.',['Laravel','PHP','REST']],
  ['Interfaz','JavaScript · React','Interfaces dinámicas e interactivas.',['JavaScript','React JS','HTML/CSS']],
  ['.NET','C# · ASP.NET Core · Blazor','Aplicaciones de alto rendimiento con Blazor WebAssembly.',['C#','ASP.NET Core','Blazor WASM']],
  ['Datos','MySQL · Python','Gestión de bases de datos y análisis de información digital.',['MySQL','Workbench','Python','Excel']],
  ['Seguridad','Ciberseguridad','Hacking ético, análisis de vulnerabilidades y gestión de seguridad.',['Hacking ético','CISSP','CISM']],
  ['Sistemas','Linux · Windows Server','Administración de sistemas y control de versiones.',['Linux','Windows Server','IOS','Git']]
];
const ROLES=[
  ['2021 — hoy','Programador web','PNP · actual','Aplicaciones web institucionales con Laravel/PHP, JavaScript y ASP.NET Core / Blazor, sobre MySQL y APIs REST.',true],
  ['2019 — 2020','Auxiliar de procesador','División de Seguridad Digital','Análisis de información digital y gestión de bases de datos en seguridad digital.',false],
  ['2017 — 2019','Analista táctico','PNP','Análisis de información para la toma de decisiones operativas.',false]
];
const AREAS={sec:'Ciberseguridad',web:'Desarrollo web',dat:'Datos',int:'Inteligencia'};
const SPECS=[
  ['sec','S-01','CISSP · Seguridad de sistemas de información','Universidad Continental'],
  ['sec','S-02','CISM · Certified Information Security Manager','Universidad Continental'],
  ['sec','S-03','Análisis de vulnerabilidades','Universidad Continental'],
  ['sec','S-04','Laboratorio de amenazas','Universidad Continental'],
  ['sec','S-05','Ciberseguridad · Hacking ético','Tecsup'],
  ['sec','S-06','Ciberseguridad · Python, desarrollo de aplicaciones web','Tecsup'],
  ['web','W-01','Desarrolladores web · Interfaz','Tecsup'],
  ['web','W-02','Desarrolladores web · Servidor','Tecsup'],
  ['web','W-03','React JS','CodeHouse'],
  ['dat','D-01','Diplomado en Manejo de Bases de Datos e Integración de Datos: Modelado, Desarrollo y Visualización','Diplomado · CIBERTEC'],
  ['dat','D-02','Ciencia de datos con Python','Universidad Nacional de Ingeniería'],
  ['dat','D-03','Fundamentos de bases de datos','Universidad Continental'],
  ['dat','D-04','Asesor en Excel intermedio','Universidad Tecnológica del Perú'],
  ['int','I-01','Analista de inteligencia criminal','Unión Europea · Ministerio del Interior de España']
];
const PROJECTS=[
  {f:'nexpol.proj',n:'NEXPOL',st:'Tesis · en desarrollo',cl:'dev',
   w:'Plataforma web con inteligencia artificial (arquitectura RAG) que automatiza la redacción de actas de intervención policial a partir de la información que registra el efectivo.',
   meta:[['Rol','Diseño de base de datos, backend y flujos'],['Contexto','Artefacto tecnológico de tesis · UTP']],
   chips:['Python','FastAPI','RAG','IA generativa','Git'],flow:['Registro','Recuperación','Generación','Acta']},
  {f:'convenios.pbix',n:'Tablero de control de convenios',st:'Proyecto institucional',cl:'ok',
   w:'Tablero para visualizar y dar seguimiento a los convenios institucionales, con el detalle de cada uno, como donaciones de vehículos.',
   chips:['Power BI','Análisis de datos','Excel']},
  {f:'enfermeria.proj',n:'Sistema de registro de enfermería',st:'En desarrollo',cl:'dev',
   w:'Registro de atenciones y control de insumos: triage, constantes vitales, procedimientos y kárdex, con un módulo de autoservicio donde el paciente indica su nivel de dolor.',
   chips:['Laravel','PHP','MySQL']},
  {f:'jopa.idea',n:'Jopa',st:'Proyecto personal',cl:'idea',
   w:'Aplicación de finanzas personales para registrar y entender ingresos y gastos.',
   chips:['Desarrollo web','Finanzas']}
];
const GITHUB='https://github.com/paulcodejs-as';

/* =====================  Íconos  ===================== */
const svg=(d)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const ICON={
  about:svg('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 12h7M9 16h7M9 8h3"/>'),
  projects:svg('<path d="M3 6h7l2 2h9v11H3z"/><path d="M3 10h18"/>'),
  experience:svg('<path d="M5 4v16"/><circle cx="5" cy="7" r="1.6" fill="currentColor"/><circle cx="5" cy="13" r="1.6" fill="currentColor"/><path d="M9 7h10M9 13h7M9 18h4"/>'),
  education:svg('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c2 2 10 2 12 0v-4.5"/><path d="M22 9v6"/>'),
  stack:svg('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/>'),
  terminal:svg('<rect x="3" y="4" width="18" height="16"/><path d="M7 9l3 3-3 3M12 15h5"/>'),
  contact:svg('<circle cx="12" cy="12" r="4"/><path d="M16 8v5a2.5 2.5 0 0 0 5 0v-1a9 9 0 1 0-3.5 7.1"/>'),
  off:svg('<path d="M12 3v9"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/>'),
  min:svg('<path d="M5 18h14"/>'),max:svg('<rect x="5" y="5" width="14" height="14"/>'),x:svg('<path d="M6 6l12 12M18 6L6 18"/>')
};

/* =====================  Aplicaciones  ===================== */
const chips=a=>'<ul class="chips">'+a.map(c=>'<li>'+esc(c)+'</li>').join('')+'</ul>';
const APPS={
  about:{title:'sobre-mi.txt',label:'Sobre mí',w:560,h:470,render(b){
    b.innerHTML='<span class="kv o">Ingeniero de Sistemas · Programador web</span><h2>Paul Neder Araucano Salazar</h2>'+
      '<p>Ingeniero de Sistemas e Informática. Construyo aplicaciones web seguras y trabajo con análisis de datos, con base en seguridad digital.</p>'+
      '<p class="mutedp">Me gusta aprender nuevas tecnologías y enfrentar desafíos en el desarrollo web. Siempre busco aportar mi experiencia y creatividad en cada proyecto.</p>'+
      '<dl class="facts"><div><dt>Años de experiencia</dt><dd>9+</dd></div><div><dt>Cursos</dt><dd>14</dd></div><div><dt>Instituciones</dt><dd>7</dd></div><div><dt>Proyectos</dt><dd>5</dd></div></dl>'+
      '<div class="linkrow"><button type="button" class="lbtn pri" data-open="projects">Abrir proyectos</button><button type="button" class="lbtn" data-open="experience">Experiencia</button><button type="button" class="lbtn" data-open="education">Formación</button><button type="button" class="lbtn" data-open="terminal">Terminal</button></div>';
  }},
  projects:{title:'C:\\Proyectos',label:'Proyectos',w:720,h:500,render(b,arg){
    b.innerHTML='<div class="explorer"><div class="files" role="tablist" aria-label="Proyectos">'+
      PROJECTS.map((p,i)=>'<button type="button" role="tab" data-i="'+i+'">'+ICON.about+esc(p.f)+'</button>').join('')+'</div><div class="detail" role="tabpanel"></div></div>';
    const tabs=[...b.querySelectorAll('.files button')], det=b.querySelector('.detail');
    const show=i=>{
      const p=PROJECTS[i]; tabs.forEach((t,k)=>t.setAttribute('aria-selected',k===i?'true':'false'));
      det.innerHTML='<span class="state '+p.cl+'">'+esc(p.st)+'</span><h2>'+esc(p.n)+'</h2><p>'+esc(p.w)+'</p>'+
        (p.meta?'<dl class="sheet2">'+p.meta.map(m=>'<div><dt>'+esc(m[0])+'</dt><dd>'+esc(m[1])+'</dd></div>').join('')+'</dl>':'')+chips(p.chips)+
        (p.flow?'<div class="flow" aria-hidden="true">'+p.flow.map(s=>'<span>'+esc(s)+'</span>').join('<i></i>')+'</div>':'');
    };
    tabs.forEach(t=>t.addEventListener('click',()=>show(+t.dataset.i)));
    b._show=show; show(arg||0);
  },again(b,arg){ if(typeof arg==='number') b._show(arg); }},
  experience:{title:'experiencia.log',label:'Experiencia',w:600,h:470,render(b){
    b.innerHTML='<span class="kv">2017 a 2026 · Policía Nacional del Perú</span><h2>Trayectoria profesional</h2><ol class="roles">'+
      ROLES.map(r=>'<li class="role'+(r[4]?' now':'')+'"><div class="yrs">'+esc(r[0])+'</div><div><h3>'+esc(r[1])+'</h3><span class="org">'+esc(r[2])+'</span><p>'+esc(r[3])+'</p></div></li>').join('')+'</ol>';
  }},
  education:{title:'formacion.db',label:'Formación',w:620,h:520,render(b){
    const count=k=>SPECS.filter(s=>s[0]===k).length;
    b.innerHTML='<h2>Formación y especializaciones</h2><div class="cards">'+
      '<div class="card"><span class="kv o">Título profesional</span><h3>Ingeniero de Sistemas e Informática</h3><p>Universidad Tecnológica del Perú</p></div>'+
      '<div class="card"><span class="kv o">Título técnico</span><h3>Técnico en Ciencias Administrativas y Policiales</h3><p>Policía Nacional del Perú</p></div></div>'+
      '<div class="filters" role="group" aria-label="Filtrar por tema"><button type="button" data-f="all" aria-pressed="true">Todas<span>'+SPECS.length+'</span></button>'+
      Object.keys(AREAS).map(k=>'<button type="button" data-f="'+k+'" aria-pressed="false">'+AREAS[k]+'<span>'+count(k)+'</span></button>').join('')+'</div>'+
      '<ul class="specs">'+SPECS.map(s=>'<li data-a="'+s[0]+'"><span class="code">'+s[1]+'</span><div><b>'+esc(s[2])+'</b><span class="src">'+esc(s[3])+'</span></div></li>').join('')+'</ul>';
    const fb=[...b.querySelectorAll('.filters button')], li=[...b.querySelectorAll('.specs li')];
    fb.forEach(x=>x.addEventListener('click',()=>{fb.forEach(y=>y.setAttribute('aria-pressed',y===x?'true':'false'));li.forEach(l=>l.hidden=x.dataset.f!=='all'&&l.dataset.a!==x.dataset.f);}));
  }},
  stack:{title:'stack.cfg',label:'Stack',w:660,h:480,render(b){
    b.innerHTML='<h2>Tecnologías</h2><div class="cards">'+STACK.map(s=>'<div class="card"><span class="kv">'+esc(s[0])+'</span><h3>'+esc(s[1])+'</h3><p>'+esc(s[2])+'</p>'+chips(s[3])+'</div>').join('')+'</div>';
  }},
  terminal:{file:'terminal.sh',title:'terminal · paul@paulos',label:'Terminal',w:600,h:400,cls:'term',render(b){
    b.innerHTML='<div class="tout" aria-live="polite"></div><form class="tline" autocomplete="off"><label for="termIn">paul@paulos:~$</label><input id="termIn" type="text" spellcheck="false" autocapitalize="off" aria-label="Escribe un comando"></form>';
    const out=b.querySelector('.tout'), form=b.querySelector('form'), inp=b.querySelector('input');
    const hist=[]; let hi=0;
    const print=h=>{const d=document.createElement('div');d.innerHTML=h;out.appendChild(d);b.scrollTop=b.scrollHeight;};
    const FILES={'sobre-mi.txt':'about','proyectos':'projects','experiencia.log':'experience','formacion.db':'education','stack.cfg':'stack','contacto.url':'contact'};
    const NAMES={'sobre-mi':'about',sobre:'about',about:'about',proyectos:'projects',projects:'projects',experiencia:'experience',formacion:'education','formación':'education',stack:'stack',terminal:'terminal',contacto:'contact'};
    const run=raw=>{
      const line=raw.trim(); print('<span class="c">paul@paulos:~$</span> '+esc(line)); if(!line) return;
      const [cmd,...rest]=line.split(/\s+/), arg=rest.join(' ').toLowerCase(), c=cmd.toLowerCase();
      if(c==='ayuda'||c==='help') print('<span class="k">ayuda</span>        esta lista\n<span class="k">quien</span>        quién soy\n<span class="k">ls</span>           archivos disponibles\n<span class="k">abrir</span> &lt;app&gt;  abre una sección (proyectos, experiencia, formacion, stack, contacto, sobre-mi)\n<span class="k">proyectos</span>    lista de proyectos\n<span class="k">stack</span>        tecnologías\n<span class="k">github</span>       mi perfil de GitHub\n<span class="k">fecha</span>        fecha y hora\n<span class="k">info</span>         datos del sistema\n<span class="k">limpiar</span>      limpia la pantalla\n<span class="k">salir</span>        apaga y vuelve a la habitación');
      else if(c==='quien'||c==='whoami') print('Paul Neder Araucano Salazar\nIngeniero de Sistemas e Informática · Programador web · Lima, Perú');
      else if(c==='ls'||c==='dir') print(Object.keys(FILES).map(f=>'<span class="g">'+f+(f==='proyectos'?'/':'')+'</span>').join('   '));
      else if(c==='cat'||c==='abrir'||c==='open'||c==='cd'){
        const id=FILES[arg.replace(/\/$/,'')]||NAMES[arg.replace(/\.\w+$/,'')];
        if(id){print('Abriendo '+esc(APPS[id].label)+'…');openApp(id);} else print('No se encontró "'+esc(arg||'')+'". Escribe <span class="k">ls</span>.');
      }
      else if(c==='proyectos') print(PROJECTS.map((p,i)=>'<span class="g">'+(i+1)+'.</span> '+esc(p.n)+' <span class="k">['+esc(p.st)+']</span>').join('\n')+'\nEscribe <span class="k">abrir proyectos</span> para ver las fichas.');
      else if(c==='stack') print(STACK.map(s=>'<span class="k">'+esc(s[0]).padEnd(10,' ')+'</span> '+esc(s[3].join(', '))).join('\n'));
      else if(c==='experiencia') print(ROLES.map(r=>'<span class="k">'+esc(r[0]).padEnd(12,' ')+'</span> '+esc(r[1])+' · '+esc(r[2])).join('\n'));
      else if(c==='formacion'||c==='formación') print('Ingeniero de Sistemas e Informática (UTP)\n'+Object.keys(AREAS).map(k=>'<span class="k">'+AREAS[k].padEnd(15,' ')+'</span> '+SPECS.filter(s=>s[0]===k).length+' programas').join('\n'));
      else if(c==='github'||c==='contacto') print('GitHub: <a href="'+GITHUB+'" style="color:#8fb3ff">github.com/paulcodejs-as</a>');
      else if(c==='fecha'||c==='date') print(esc(new Date().toLocaleString('es-PE',{dateStyle:'full',timeStyle:'short'})));
      else if(c==='info'||c==='neofetch') print('<span class="c"> ____  </span>  <span class="k">paul</span>@<span class="k">paulos</span>\n<span class="c">|  _ \\ </span>  Sistema: PaulOS Rev. C\n<span class="c">| |_) |</span>  Ubicación: Lima, Perú\n<span class="c">|  __/ </span>  Tecnologías: PHP, JavaScript, C#, Python\n<span class="c">|_|    </span>  Proyectos: '+PROJECTS.length+' · Cursos: '+SPECS.length);
      else if(c==='limpiar'||c==='clear'||c==='cls') out.innerHTML='';
      else if(c==='salir'||c==='exit') {print('Cerrando la sesión…');setTimeout(leave,350);}
      else if(c==='sudo') print('Acceso denegado.');
      else print('No reconozco el comando: '+esc(cmd)+'. Escribe <span class="k">ayuda</span>.');
    };
    form.addEventListener('submit',e=>{e.preventDefault();const v=inp.value;if(v.trim()){hist.push(v);hi=hist.length;}inp.value='';run(v);});
    inp.addEventListener('keydown',e=>{
      if(e.key==='ArrowUp'&&hi>0){hi--;inp.value=hist[hi];e.preventDefault();}
      else if(e.key==='ArrowDown'){hi=Math.min(hist.length,hi+1);inp.value=hist[hi]||'';e.preventDefault();}
    });
    b.addEventListener('click',e=>{if(!String(getSelection())&&e.target.tagName!=='A')inp.focus({preventScroll:true});});
    print('PaulOS Rev. C · terminal\nEscribe <span class="k">ayuda</span> para ver los comandos.');
    b._focus=()=>inp.focus({preventScroll:true});
  }},
  contact:{title:'contacto.url',label:'Contacto',w:480,h:330,render(b){
    b.innerHTML='<h2>Contacto</h2><p class="mutedp">Mi código y mis repositorios están en GitHub.</p>'+
      '<table><tr><th>Nombre</th><td>Paul Neder Araucano Salazar</td></tr><tr><th>Especialidad</th><td>Desarrollo web · Datos · Ciberseguridad</td></tr><tr><th>Ubicación</th><td>Lima, Perú</td></tr><tr><th>GitHub</th><td><a href="'+GITHUB+'">github.com/paulcodejs-as</a></td></tr></table>'+
      '<div class="linkrow"><a class="lbtn pri" href="'+GITHUB+'">Abrir GitHub</a></div>';
  }}
};
const ORDER=['about','projects','experience','education','stack','terminal','contact'];

/* =====================  Gestor de ventanas  ===================== */
const os=$('os'), desk=$('desk'), tabsEl=$('tabs'), menu=$('menu'), startBtn=$('startBtn');
const wins={}; let zTop=10, opened=0;
function focusWin(id){
  Object.keys(wins).forEach(k=>{wins[k].el.classList.toggle('focus',k===id);wins[k].tab.classList.toggle('on',k===id&&!wins[k].el.hidden);});
  if(wins[id]) wins[id].el.style.zIndex=++zTop;
}
function topVisible(){let best=null;Object.keys(wins).forEach(k=>{const w=wins[k];if(!w.el.hidden&&(!best||+w.el.style.zIndex>+wins[best].el.style.zIndex))best=k;});return best;}
function closeWin(id){const w=wins[id];if(!w)return;w.el.remove();w.tab.remove();delete wins[id];const t=topVisible();if(t)focusWin(t);}
function openApp(id,arg){
  const app=APPS[id]; if(!app) return; closeMenu();
  if(wins[id]){ wins[id].el.hidden=false; focusWin(id); if(app.again) app.again(wins[id].body,arg); if(wins[id].body._focus&&!small.matches) wins[id].body._focus(); return; }
  const el=document.createElement('section'); el.className='win'+(app.cls?' '+app.cls:''); el.setAttribute('role','dialog'); el.setAttribute('aria-label',app.label);
  const dw=desk.clientWidth, dh=desk.clientHeight, w=Math.min(app.w,dw-16), h=Math.min(app.h,dh-16), k=opened++%6;
  el.style.width=w+'px'; el.style.height=h+'px';
  el.style.left=Math.max(8,Math.min(dw-w-8,120+k*34))+'px'; el.style.top=Math.max(8,Math.min(dh-h-8,24+k*28))+'px';
  el.innerHTML='<header class="bar"><span class="t">'+esc(app.title)+'</span><button type="button" class="mn" aria-label="Minimizar">'+ICON.min+'</button><button type="button" class="mx" aria-label="Maximizar">'+ICON.max+'</button><button type="button" class="x" aria-label="Cerrar">'+ICON.x+'</button></header><div class="body"></div>';
  const body=el.querySelector('.body'), bar=el.querySelector('.bar');
  const tab=document.createElement('button'); tab.type='button'; tab.innerHTML=ICON[id]+esc(app.label);
  tab.addEventListener('click',()=>{const w0=wins[id]; if(w0.el.hidden){w0.el.hidden=false;focusWin(id);} else if(w0.el.classList.contains('focus')){w0.el.hidden=true;tab.classList.remove('on');const t=topVisible();if(t)focusWin(t);} else focusWin(id);});
  tabsEl.appendChild(tab);
  wins[id]={el,body,tab};
  el.addEventListener('pointerdown',()=>focusWin(id));
  el.querySelector('.x').addEventListener('click',e=>{e.stopPropagation();closeWin(id);});
  el.querySelector('.mn').addEventListener('click',e=>{e.stopPropagation();el.hidden=true;tab.classList.remove('on');const t=topVisible();if(t)focusWin(t);});
  el.querySelector('.mx').addEventListener('click',()=>el.classList.toggle('max'));
  bar.addEventListener('dblclick',e=>{if(!e.target.closest('button'))el.classList.toggle('max');});
  let drag=null;
  bar.addEventListener('pointerdown',e=>{
    if(e.target.closest('button')||small.matches||el.classList.contains('max')) return;
    drag={x:e.clientX-el.offsetLeft,y:e.clientY-el.offsetTop}; bar.setPointerCapture(e.pointerId); bar.style.cursor='grabbing';
  });
  bar.addEventListener('pointermove',e=>{
    if(!drag) return;
    el.style.left=Math.max(-el.offsetWidth+80,Math.min(desk.clientWidth-80,e.clientX-drag.x))+'px';
    el.style.top=Math.max(0,Math.min(desk.clientHeight-34,e.clientY-drag.y))+'px';
  });
  const end=()=>{drag=null;bar.style.cursor='';};
  bar.addEventListener('pointerup',end); bar.addEventListener('pointercancel',end);
  body.addEventListener('click',e=>{const o=e.target.closest('[data-open]');if(o)openApp(o.dataset.open);});
  desk.appendChild(el); app.render(body,arg); focusWin(id);
  if(body._focus&&!small.matches) body._focus();
}
function closeMenu(){menu.hidden=true;startBtn.setAttribute('aria-expanded','false');}
$('icons').innerHTML=ORDER.map(id=>'<button type="button" class="icon" data-app="'+id+'"><span class="tile">'+ICON[id]+'</span>'+esc(APPS[id].file||APPS[id].title)+'</button>').join('');
$('icons').addEventListener('click',e=>{const b=e.target.closest('[data-app]');if(b)openApp(b.dataset.app);});
menu.innerHTML='<p>Aplicaciones</p>'+ORDER.map(id=>'<button type="button" data-app="'+id+'">'+ICON[id]+esc(APPS[id].label)+'</button>').join('')+'<hr><button type="button" data-act="off">'+ICON.off+'Apagar y salir</button>';
menu.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.app)openApp(b.dataset.app);else{closeMenu();leave();}});
startBtn.addEventListener('click',e=>{e.stopPropagation();menu.hidden=!menu.hidden;startBtn.setAttribute('aria-expanded',String(!menu.hidden));});
desk.addEventListener('pointerdown',closeMenu);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
$('offBtn').addEventListener('click',()=>leave());
const clock=$('clock'); const tick=()=>{clock.textContent=new Date().toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'});}; tick(); setInterval(tick,20000);

/* =====================  Entrar y salir  ===================== */
let state='room', twStart=0, pending=null, booted=false, renderer=null;
const boot=$('boot');
function setState(s){state=s;document.body.dataset.state=s;}
function showOS(){
  setState('os'); os.classList.add('on'); requestAnimationFrame(()=>requestAnimationFrame(()=>os.classList.add('show')));
  const [id,arg]=pending||['about']; pending=null;
  const start=()=>{ boot.hidden=true; if(!wins.about&&!booted) openApp('about'); booted=true; openApp(id,arg); };
  if(booted||reduce){ start(); return; }
  boot.hidden=false; boot.innerHTML='';
  const lines=['<b>PaulOS</b> Rev. C · iniciando','Cargando módulos: laravel, react, dotnet, python … OK','Montando /proyectos … 5 elementos','Verificando seguridad … OK','Bienvenido, visitante.'];
  lines.forEach((l,i)=>setTimeout(()=>{const d=document.createElement('div');d.innerHTML=l;boot.appendChild(d);},i*230));
  setTimeout(start,lines.length*230+350);
}
function enter(id,arg){
  if(state!=='room') return; pending=[id||'about',arg];
  if(!renderer||reduce){ showOS(); return; }
  setState('in'); twStart=performance.now();
}
function leave(){
  if(state!=='os'||!renderer) return;
  os.classList.remove('show'); setTimeout(()=>os.classList.remove('on'),360);
  if(reduce){ setState('room'); tw=0; return; }
  setState('out'); twStart=performance.now();
}
$('powerBtn').addEventListener('click',()=>enter('about'));

/* =====================  Habitación 3D  ===================== */
const canvas=$('room'), spotsEl=$('spots');
if(typeof THREE!=='undefined'){ try{renderer=new THREE.WebGLRenderer({canvas,antialias:true});}catch(e){renderer=null;} }
if(!renderer){ document.body.classList.add('no3d'); pending=['about']; showOS(); return; }
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0e1528); scene.fog=new THREE.Fog(0x0e1528,22,60);
const cam=new THREE.PerspectiveCamera(40,1,.1,120);
scene.add(new THREE.AmbientLight(0x7f8fc4,.55));
scene.add(new THREE.HemisphereLight(0x9fb3ea,0x141d33,.4));
const glow=new THREE.PointLight(0x9db8ff,.9,10); glow.position.set(0,3.5,.2); scene.add(glow);
const lamp=new THREE.SpotLight(0xffc48a,1.6,14,.8,.55,1.2); lamp.position.set(-2.35,3.75,-1.75); lamp.target.position.set(-1.2,2,.3);
lamp.castShadow=true; lamp.shadow.mapSize.set(1024,1024); scene.add(lamp); scene.add(lamp.target);

const INK=0x141d33, NAVY=0x2b3550, WHITE=0xfafbfc, BLUE=0x1f4fd1, SKY=0x5b7fe0, ORANGE=0xe8632b, WOOD=0xb07a4f, WOOD2=0x8f6140, GREY=0xdfe4ec;
function box(w,h,d,x,y,z,color,parent){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshLambertMaterial({color}));
  m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; (parent||scene).add(m); return m;
}
function cyl(r1,r2,h,x,y,z,color,parent,seg){
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg||18),new THREE.MeshLambertMaterial({color}));
  m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; (parent||scene).add(m); return m;
}
function texPlane(w,h,x,y,z,draw,cw,ch){
  const c=document.createElement('canvas'); c.width=cw; c.height=ch; draw(c.getContext('2d'),cw,ch);
  const t=new THREE.CanvasTexture(c);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t})); m.position.set(x,y,z); scene.add(m); return {m,t,c};
}
// Habitación
box(18,.2,13,0,-.1,1.5,0x1b2542); box(18,9,.2,0,4.5,-3,0x25325a); box(.2,9,13,-7,4.5,1.5,0x202b4e);
box(18,.3,.08,0,.15,-2.86,INK);
box(7,.04,3.6,0,.02,1.7,0x2e3d70); box(6.4,.05,3,0,.03,1.7,0x26335f);
// Escritorio
box(6.6,.18,2.9,0,2.0,-1.3,WOOD);
[[-3.1,-2.5],[-3.1,-.1],[3.1,-2.5],[3.1,-.1]].forEach(p=>box(.18,1.91,.18,p[0],.955,p[1],NAVY));
box(1.7,1.3,2.5,2.2,1.26,-1.3,WOOD2); [1.55,1.0].forEach(y=>{box(1.4,.42,.06,2.2,y,-.03,WOOD);box(.4,.07,.07,2.2,y,.02,INK);});
// Monitor
const mon=[box(1.2,.08,.75,0,2.13,-2.0,INK),box(.22,.75,.2,0,2.5,-2.05,INK),box(3.15,1.98,.24,0,3.47,-1.95,0x1b2440)];
const SCR={x:0,y:3.47,z:-1.82,w:2.85,h:1.68};
const scr=texPlane(SCR.w,SCR.h,SCR.x,SCR.y,SCR.z,()=>{},570,336); mon.push(scr.m);
box(.1,.1,.02,1.42,2.56,-1.82,0x7fa2ff).material=new THREE.MeshBasicMaterial({color:0xff8a5b});
function drawScreen(t){
  const g=scr.c.getContext('2d'), W=570,H=336;
  const gr=g.createRadialGradient(400,100,10,400,100,420); gr.addColorStop(0,'#24356a'); gr.addColorStop(1,'#101a33'); g.fillStyle=gr; g.fillRect(0,0,W,H);
  g.strokeStyle='rgba(127,162,255,.12)'; g.lineWidth=1; for(let x=0;x<W;x+=19){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();} for(let y=0;y<H;y+=19){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  for(let i=0;i<5;i++){ g.fillStyle='#fafbfc'; g.fillRect(18,16+i*52,30,30); g.fillStyle='#e8632b'; g.fillRect(21,46+i*52,30,3); g.fillStyle='rgba(250,251,252,.7)'; g.fillRect(14,53+i*52,38,4); }
  g.fillStyle='rgba(250,251,252,.18)'; g.font='900 64px Archivo,Arial,sans-serif'; g.textAlign='right'; g.fillText('PaulOS',W-22,250);
  g.fillStyle='#fafbfc'; g.fillRect(150,70,270,150); g.fillStyle='#141d33'; g.fillRect(150,70,270,22);
  g.fillStyle='#141d33'; g.font='900 22px Archivo,Arial,sans-serif'; g.textAlign='left'; g.fillText('PAUL ARAUCANO',164,126);
  g.fillStyle='#5a6680'; g.fillRect(164,140,220,6); g.fillRect(164,154,180,6); g.fillStyle='#1f4fd1'; g.fillRect(164,180,70,22);
  if(Math.floor(t/500)%2===0){ g.fillStyle='#e8632b'; g.fillRect(244,180,150,22); g.fillStyle='#fff'; g.font='500 13px monospace'; g.fillText('clic para entrar',254,196); }
  g.fillStyle='#141d33'; g.fillRect(0,H-30,W,30); g.fillStyle='#e8632b'; g.fillRect(0,H-32,W,2); g.fillRect(8,H-24,56,18);
  scr.t.needsUpdate=true;
}
drawScreen(0);
// Teclado, mouse, taza, cuaderno
box(2.0,.07,.62,0,2.125,-.7,GREY); box(1.86,.03,.5,0,2.17,-.7,0xc4ccd9);
box(.95,.02,.85,1.5,2.1,-.7,INK); box(.24,.09,.38,1.5,2.15,-.7,GREY);
cyl(.19,.16,.4,-1.45,2.29,-.55,ORANGE); box(.08,.2,.2,-1.22,2.3,-.55,ORANGE);
const note=new THREE.Group(); note.position.set(2.62,2.09,-1.75); note.rotation.y=-.18; scene.add(note);
box(.95,.07,1.25,0,.035,0,BLUE,note); box(.86,.03,1.16,0,.08,0,WHITE,note); box(.06,.05,.9,.3,.11,0,ORANGE,note);
// Lámpara
cyl(.32,.36,.08,-2.75,2.13,-2.2,INK); const arm=box(.08,1.5,.08,-2.6,2.85,-2.1,INK); arm.rotation.z=-.22; arm.rotation.x=.12;
const lampHead=cyl(.16,.42,.5,-2.38,3.68,-1.85,ORANGE,null,16); lampHead.rotation.z=-.5; lampHead.rotation.x=.4;
const bulb=new THREE.Mesh(new THREE.SphereGeometry(.14,12,10),new THREE.MeshBasicMaterial({color:0xffe2b8})); bulb.position.set(-2.28,3.52,-1.72); scene.add(bulb);
// Torre de PC
box(.95,1.95,2.1,4.2,.975,-1.4,0x1b2440); const led=box(.5,.06,.02,4.2,1.6,-.34,BLUE); led.material=new THREE.MeshBasicMaterial({color:0x6ea0ff});
box(.6,.9,.02,4.2,.75,-.34,0x25325a);
// Estante con libros
box(3.2,.12,.75,3.9,5.0,-2.6,WOOD); box(.1,.5,.6,2.5,4.72,-2.6,WOOD2); box(.1,.5,.6,5.3,4.72,-2.6,WOOD2);
[[ORANGE,1.0],[BLUE,.85],[WHITE,1.1],[SKY,.9],[NAVY,1.05],[ORANGE,.8],[WHITE,.95],[BLUE,1.1],[SKY,.75]].forEach((b,i)=>box(.22,b[1],.55,2.75+i*.27,5.06+b[1]/2,-2.6,b[0]));
const lean=box(.22,.9,.55,5.25,5.48,-2.6,ORANGE); lean.rotation.z=.32;
// Pósters
box(2.0,2.6,.06,-3.7,5.0,-2.87,INK);
texPlane(1.86,2.46,-3.7,5.0,-2.83,(g,W,H)=>{
  g.fillStyle='#fafbfc'; g.fillRect(0,0,W,H); g.strokeStyle='#dfe4ec'; for(let x=0;x<W;x+=16){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();} for(let y=0;y<H;y+=16){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  g.fillStyle='#e8632b'; g.fillRect(18,18,74,22); g.fillStyle='#fff'; g.font='500 13px monospace'; g.fillText('P-01',34,34);
  g.fillStyle='#1f4fd1'; g.font='900 46px Archivo,Arial,sans-serif'; g.fillText('NEXPOL',18,96);
  g.fillStyle='#141d33'; g.font='500 13px monospace'; g.fillText('RAG · FastAPI · IA',18,120);
  ['Registro','Recuperación','Generación','Acta'].forEach((s,i)=>{const y=160+i*44; g.strokeStyle='#1f4fd1'; g.lineWidth=2; g.strokeRect(40,y,176,28); g.fillStyle='#1f4fd1'; g.fillText(s,54,y+19); if(i<3){g.fillStyle='#e8632b';g.fillRect(126,y+28,3,16);}});
},256,340);
// Planta
cyl(.45,.34,.7,-5.2,.35,-1.6,ORANGE,null,12);
[[0,1.3,0,.75],[-.3,1.8,.15,.5],[.3,1.75,-.1,.48],[0,2.2,0,.4]].forEach(l=>{const s=new THREE.Mesh(new THREE.IcosahedronGeometry(l[3],0),new THREE.MeshLambertMaterial({color:0x3f8a6a,flatShading:true}));s.position.set(-5.2+l[0],l[1],-1.6+l[2]);s.castShadow=true;scene.add(s);});
// Silla
const chair=new THREE.Group(); chair.position.set(-1.1,0,1.9); chair.rotation.y=-.55; scene.add(chair);
box(1.2,.1,1.2,0,.08,0,INK,chair); cyl(.09,.09,1.1,0,.68,0,INK,chair,10);
box(1.5,.2,1.45,0,1.3,0,ORANGE,chair); box(1.5,1.5,.18,0,2.15,.72,ORANGE,chair);

/* Puntos interactivos */
let lampOn=true;
const SPOTS=[
  {t:'Entrar a la computadora',p:[0,4.75,-1.9],go:()=>enter('about')},
  {t:'Proyectos',p:[-3.7,6.5,-2.8],go:()=>enter('projects',0)},
  {t:'Formación',p:[3.9,6.45,-2.6],go:()=>enter('education')},
  {t:'Bitácora · experiencia',p:[2.62,2.6,-1.75],go:()=>enter('experience')},
  {t:'Terminal',p:[4.2,2.25,-1.0],go:()=>enter('terminal')},
  {t:'Lámpara',p:[-2.4,4.25,-1.85],go:b=>{lampOn=!lampOn;lamp.intensity=lampOn?1.6:0;bulb.material.color.set(lampOn?0xffe2b8:0x4a4f63);b.setAttribute('aria-pressed',String(lampOn));}}
];
SPOTS.forEach(s=>{
  const b=document.createElement('button'); b.type='button'; b.className='spot'; b.textContent=s.t; if(s.t==='Lámpara') b.setAttribute('aria-pressed','true');
  b.addEventListener('click',()=>s.go(b)); spotsEl.appendChild(b); s.el=b; s.v=new THREE.Vector3(s.p[0],s.p[1],s.p[2]);
});

/* Cámara */
const HOME_T=new THREE.Vector3(0,3.2,-1.3), HOME_DIR=new THREE.Vector3(3.4,1.5,9.4);
const SCR_T=new THREE.Vector3(SCR.x,SCR.y,SCR.z);
const homeP=new THREE.Vector3(), scrP=new THREE.Vector3(), curP=new THREE.Vector3(), curT=new THREE.Vector3(), pv=new THREE.Vector3();
let W=1,H=1,tw=0,mx=0,my=0,pmx=0,pmy=0;
function resize(){
  W=Math.max(1,window.innerWidth); H=Math.max(1,window.innerHeight); renderer.setSize(W,H,false);
  const asp=W/H; cam.aspect=asp; cam.updateProjectionMatrix();
  const k=Math.min(2.6,Math.max(1,1.25/asp));
  HOME_T.y=asp<1?1.9:3.2; homeP.copy(HOME_T).addScaledVector(HOME_DIR,k);
  SPOTS.forEach(sp=>{sp.hw=sp.el.offsetWidth/2+8;});
  const th=Math.tan(cam.fov*Math.PI/360), d=Math.min(SCR.h/(2*th),SCR.w/(2*th*asp))*.97;
  scrP.set(SCR.x,SCR.y,SCR.z+d);
}
window.addEventListener('resize',resize); resize();
window.addEventListener('pointermove',e=>{mx=e.clientX/W-.5;my=e.clientY/H-.5;});
const ray=new THREE.Raycaster(), ndc=new THREE.Vector2();
const hitMon=e=>{ndc.set(e.clientX/W*2-1,-(e.clientY/H)*2+1);ray.setFromCamera(ndc,cam);return ray.intersectObjects(mon,false).length>0;};
canvas.addEventListener('pointermove',e=>{if(state==='room'&&e.pointerType==='mouse')canvas.style.cursor=hitMon(e)?'pointer':'default';});
canvas.addEventListener('click',e=>{if(state==='room'&&hitMon(e))enter('about');});

const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
let lastScr=0;
function frame(t){
  requestAnimationFrame(frame);
  if(state==='os') return;
  if(state==='in'){ tw=Math.min(1,(t-twStart)/1700); if(tw>=1){ render(t); showOS(); return; } }
  else if(state==='out'){ tw=1-Math.min(1,(t-twStart)/1500); if(tw<=0){ tw=0; setState('room'); } }
  render(t);
}
function render(t){
  const s=t*.001, e=ease(tw);
  pmx+=(mx-pmx)*.05; pmy+=(my-pmy)*.05;
  const sway=reduce?0:Math.sin(s*.4)*.25;
  curP.copy(homeP); curP.x+=(-pmx*2.2+sway)*(1-e); curP.y+=(-pmy*1.1)*(1-e);
  curP.lerp(scrP,e); curT.copy(HOME_T).lerp(SCR_T,e);
  cam.position.copy(curP); cam.lookAt(curT);
  if(t-lastScr>250){ drawScreen(t); lastScr=t; }
  if(!reduce){ glow.intensity=.85+Math.sin(s*3.1)*.05; led.material.color.setHSL(.6,.9,.55+Math.sin(s*2.4)*.15); }
  cam.updateMatrixWorld();
  if(state==='room'){
    for(let i=0;i<SPOTS.length;i++){
      const sp=SPOTS[i]; pv.copy(sp.v).project(cam);
      const sx=Math.max(sp.hw,Math.min(W-sp.hw,(pv.x+1)/2*W));
      sp.el.style.transform='translate('+sx.toFixed(1)+'px,'+((1-pv.y)/2*H).toFixed(1)+'px) translate(-50%,-50%)';
    }
  }
  renderer.render(scene,cam);
}
requestAnimationFrame(frame);
})();




