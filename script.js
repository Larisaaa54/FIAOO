/* FIA'O - script.js */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch(e){ return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch(e){ alert(tn('Storage is full. Use a smaller photo.')); return false; } };
const money = n => 'B/. ' + Number(n).toFixed(2);

/* Modales: cerrar con Cancelar o clic afuera */
document.addEventListener('click', e => {
  const c = e.target.closest('[data-close]'); if (c) c.closest('.modal').classList.remove('open');
  if (e.target.classList && e.target.classList.contains('modal')) e.target.classList.remove('open');
});

/* Filtros de clientes */
document.querySelectorAll('.pills button').forEach(btn => btn.onclick = () => {
  document.querySelectorAll('.pills button').forEach(x => x.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('#clients tbody tr').forEach(tr => { tr.style.display = (btn.dataset.f === 'all' || tr.dataset.s === btn.dataset.f) ? '' : 'none'; });
});

/* Ver / ocultar contraseña */
document.querySelectorAll('[data-eye]').forEach(b => b.onclick = () => { const i = document.getElementById(b.dataset.eye); i.type = i.type === 'password' ? 'text' : 'password'; });

/* Modo oscuro */
const themeBtn = $('#theme');
function setTheme(t){
  document.documentElement.dataset.theme = t;
  if (themeBtn) themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('theme', t); } catch(e){}
}
setTheme(document.documentElement.dataset.theme || 'light');
if (themeBtn) themeBtn.onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');

/* ===== Traducciones ES (los textos del HTML estan en ingles) ===== */
const ES = {
"Home":"Inicio","Credit":"Crédito","Products":"Productos","Clients":"Clientes","Reports":"Reportes","Contact":"Contacto",
"FIA'O digitizes customer, debt, and payment management for convenience stores and small businesses in Panama, replacing the traditional paper ledger with a modern digital management system.":"FIA'O digitaliza la gestión de clientes, deudas y pagos para minisúperes y pequeños negocios en Panamá, reemplazando el cuaderno de papel tradicional por un sistema digital moderno.",
"Log in":"Iniciar sesión","Sign up free":"Regístrate gratis","Good morning, John 👋":"Buenos días, John 👋","Total balance to collect":"Saldo total por cobrar","Owes":"Debe","Paid":"Pagado",
"Debts & Payments":"Deudas y Pagos","Manage customer debts, register payments, and track balances easily.":"Administra las deudas de tus clientes, registra pagos y controla saldos fácilmente.",
"Select customer":"Seleccionar cliente","Current Debt":"Deuda actual","Credit Limit":"Límite de crédito","Automatic Blocking":"Bloqueo automático",
"Debt History":"Historial de deudas","Milk (2) Fiado":"Leche (2) Fiado","Rice (1) Fiado":"Arroz (1) Fiado","Bread (3) Fiado":"Pan (3) Fiado","Pending":"Pendiente",
"Oct 14":"14 oct","Oct 12":"12 oct","Oct 10":"10 oct","Oct 8":"8 oct",
"Recent Activity":"Actividad reciente","Paid B/. 15.00":"Pagó B/. 15.00","New debt: B/. 12.50":"Nueva deuda: B/. 12.50","Payment received: B/. 20.00":"Pago recibido: B/. 20.00","Today":"Hoy","Yesterday":"Ayer",
"Register Payment":"Registrar pago","Payment amount":"Monto del pago","Payment type":"Tipo de pago","Partial Payment":"Pago parcial","Full Payment":"Pago total","Mark as Paid":"Marcar como pagado",
"Debt Overview":"Resumen de deudas","Outstanding Debt":"Deuda pendiente","Payments Today":"Pagos de hoy","Customers with Debt":"Clientes con deuda","Overdue":"Vencido",
"Inventory":"Inventario","Register Fiado Sale":"Registrar venta fiada","Your inventory, always exact":"Tu inventario, siempre exacto",
"Showing core products and add option. Use search bar to look up items.":"Mostrando productos principales y opción de agregar. Usa la barra de búsqueda para encontrar artículos.",
"Beverages":"Bebidas","Dairy":"Lácteos","Pantry":"Despensa","Bakery":"Panadería","Eggs":"Huevos","Rice":"Arroz","Sugar":"Azúcar","White Bread":"Pan blanco",
"2L bottle":"botella 2L","dozen":"docena","5 lb bag":"bolsa 5 lb","2 lb bag":"bolsa 2 lb","loaf":"barra",
"Add New Product":"Agregar producto","Create a new item":"Crear un nuevo artículo","New Product":"Nuevo producto","⬆ Upload photo":"⬆ Subir foto",
"Product name":"Nombre del producto","Category":"Categoría","Unit":"Unidad","Price (sales price)":"Precio (de venta)","Stock":"Existencias","Cancel":"Cancelar","Add Product":"Agregar producto",
"Search and manage your customers.":"Busca y administra a tus clientes.","All":"Todos","On Time":"Al día",
"Client":"Cliente","Purchases":"Compras","Pending debt":"Deuda pendiente","Status":"Estado","Actions":"Acciones","View detail →":"Ver detalle →",
"Automatic Reminder Sent":"Recordatorio automático enviado",
"WhatsApp to Ramón Batista: \"Hello Ramón, you have B/. 35.00 pending in Minisúper Doña Chela. See you soon!\"":"WhatsApp a Ramón Batista: \"Hola Ramón, tienes B/. 35.00 pendientes en Minisúper Doña Chela. ¡Hasta pronto!\"",
"✓ Sent":"✓ Enviado",
"Credit activity and payment summaries.":"Actividad de crédito y resúmenes de pagos.","From":"Desde","To":"Hasta","Customer":"Cliente","Apply Filters":"Aplicar filtros",
"Total Active Credit":"Crédito activo total","Collected This Month":"Cobrado este mes","Pending Balances":"Saldos pendientes","Total Customers":"Total de clientes",
"+8.4% from last month":"+8.4% vs. el mes pasado","+12.1% efficiency":"+12.1% de eficiencia","-3 accounts overdue":"-3 cuentas vencidas","+5 new this month":"+5 nuevos este mes",
"Credit Activity & Payments Flow":"Actividad de crédito y flujo de pagos",
"Week 1 · Week 2 · Week 3 · Week 4 — 🟧 Credit Issued 🟩 Payments Received 🟥 Overdue":"Semana 1 · Semana 2 · Semana 3 · Semana 4 — 🟧 Crédito otorgado 🟩 Pagos recibidos 🟥 Vencido",
"Payment Status Breakdown":"Desglose de estado de pagos","On Time (75%)":"Al día (75%)","Pending (17%)":"Pendiente (17%)","Overdue (8%)":"Vencido (8%)",
"Recent Credit Transactions":"Transacciones de crédito recientes","Description":"Descripción","Amount":"Monto","Date":"Fecha",
"Grocery items & supplies":"Víveres y suministros","Weekly hardware credit":"Crédito semanal de ferretería","Bakery stock order":"Pedido de panadería",
"Contact us":"Contáctanos","We'd love to hear from you.":"Nos encantaría saber de ti.","Name":"Nombre","Email":"Correo","Message":"Mensaje","Send message":"Enviar mensaje",
"© 2026 FIA'O. All rights reserved.":"© 2026 FIA'O. Todos los derechos reservados.",
"We are innovation with purpose":"Somos innovación con propósito","Technology at the service of small businesses":"Tecnología al servicio de los pequeños negocios",
"Total Control":"Control total","Manage your inventory, sales, and debts all from one place":"Administra tu inventario, ventas y deudas desde un solo lugar",
"More Security":"Más seguridad","Digitize the credit and keep track of your customers safely":"Digitaliza el crédito y controla a tus clientes de forma segura",
"Better Relationships":"Mejores relaciones","Keep your clients informed and on time":"Mantén a tus clientes informados y al día",
"Log In":"Iniciar sesión","Enter your credentials":"Ingresa tus credenciales","Password":"Contraseña","You forgot your password?":"¿Olvidaste tu contraseña?","I'm not a robot":"No soy un robot",
"No account?":"¿No tienes cuenta?","Sign up":"Regístrate",
"Sign up for free":"Regístrate gratis","Create your account on FIAO and start managing your credit sales easily, securely, and in an organized way.":"Crea tu cuenta en FIAO y empieza a administrar tus ventas a crédito de forma fácil, segura y organizada.",
"Fast & Easy":"Rápido y fácil","Create your account in just a few minutes":"Crea tu cuenta en pocos minutos","Secure":"Seguro","We protect your business and customer information":"Protegemos la información de tu negocio y tus clientes",
"Create your account":"Crea tu cuenta","Complete the form to get started":"Completa el formulario para comenzar","Full name":"Nombre completo","Email address":"Correo electrónico","Phone number":"Número de teléfono","Business name":"Nombre del negocio",
"Create account":"Crear cuenta","Already have an account?":"¿Ya tienes cuenta?"
};
const ES_PH = {
"🔍 Search products by name...":"🔍 Buscar productos por nombre...","e.g. Sugar":"p. ej. Azúcar","e.g. Pantry":"p. ej. Despensa","e.g. 2 lb bag":"p. ej. bolsa 2 lb",
"Search client by name or phone...":"Buscar cliente por nombre o teléfono...","Add your name":"Escribe tu nombre","Add your email":"Escribe tu correo","Add your number":"Escribe tu número","Your business":"Tu negocio"
};
const ES_TITLE = {"Home":"Inicio","Credit":"Crédito","Products":"Productos","Clients":"Clientes","Reports":"Reportes","Contact":"Contacto","Log in":"Iniciar sesión","Sign up":"Registro"};


Object.assign(ES, {
"Register fiado":"Registrar fiado","Client":"Cliente","+ New Client":"+ Nuevo cliente","Product":"Producto","Quantity":"Cantidad","TOTAL OF THE FIADO":"TOTAL DEL FIADO",
"Recent fiado sales":"Ventas fiadas recientes","Assign credit sales to a client in less than a minute.":"Asigna ventas a crédito a un cliente en menos de un minuto.",
"New Client":"Nuevo cliente","Add client":"Agregar cliente","Edit Product":"Editar producto","Save changes":"Guardar cambios","Click to change photo":"Haz clic para cambiar la foto",
"No sales yet.":"Aún no hay ventas.","Not enough stock":"No hay suficientes existencias","Fiado registered!":"¡Fiado registrado!","Delete this product?":"¿Eliminar este producto?","Delete this sale?":"¿Eliminar esta venta?",
"Message sent! (demo)":"¡Mensaje enviado! (demo)","Storage is full. Use a smaller photo.":"Almacenamiento lleno. Usa una foto más pequeña.",
"Confirm password":"Confirmar contraseña","I accept the terms and conditions":"Acepto los términos y condiciones",
"Please fill in all fields.":"Completa todos los campos.","Enter a valid email.":"Ingresa un correo válido.","Phone must have at least 7 digits.":"El teléfono debe tener al menos 7 dígitos.",
"Password must be at least 6 characters.":"La contraseña debe tener al menos 6 caracteres.","Passwords do not match.":"Las contraseñas no coinciden.","You must accept the terms.":"Debes aceptar los términos.",
"That email is already registered.":"Ese correo ya está registrado.","Account created! Redirecting to log in...":"¡Cuenta creada! Redirigiendo al inicio de sesión...",
"Incorrect email or password.":"Correo o contraseña incorrectos.","Please check \"I'm not a robot\".":"Marca \"No soy un robot\".","Welcome back! Redirecting...":"¡Bienvenido de nuevo! Redirigiendo...","Product name is required.":"El nombre del producto es obligatorio.","Enter a valid price.":"Ingresa un precio válido."
});
Object.assign(ES_PH, {"Search products, pantry, drinks...":"Buscar productos, despensa, bebidas...","Confirm your password":"Confirma tu contraseña","At least 6 characters":"Mínimo 6 caracteres"});
const tn = s => (lang === 'es' && ES[s]) ? ES[s] : s;

/* ===== Idioma ===== */
let lang = 'en';
try { lang = localStorage.getItem('lang') || 'en'; } catch(e){}
const origText = new WeakMap();
const enTitle = document.title.split('| ')[1] || '';
function translateAll(l){
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const n = w.currentNode;
    if (n.parentElement.closest('script,style,[data-es]')) continue;
    const o = origText.has(n) ? origText.get(n) : n.nodeValue;
    const key = o.trim().replace(/\s+/g, ' ');
    if (!ES[key]) continue;
    origText.set(n, o);
    n.nodeValue = l === 'es' ? o.match(/^\s*/)[0] + ES[key] + o.match(/\s*$/)[0] : o;
  }
  document.querySelectorAll('[placeholder]').forEach(e => { if (!e.dataset.ph) e.dataset.ph = e.placeholder; e.placeholder = (l === 'es' && ES_PH[e.dataset.ph]) ? ES_PH[e.dataset.ph] : e.dataset.ph; });
  document.querySelectorAll('[data-es]').forEach(e => { if (!e.dataset.en) e.dataset.en = e.innerHTML; e.innerHTML = l === 'es' ? e.dataset.es : e.dataset.en; });
}
function setLang(l){
  lang = l; document.documentElement.lang = l;
  if (window.renderPage) window.renderPage();
  translateAll(l);
  document.title = "FIA'O | " + (l === 'es' ? (ES_TITLE[enTitle] || enTitle) : enTitle);
  const b = $('#lang'); if (b) b.textContent = l === 'es' ? 'EN' : 'ES';
  try { localStorage.setItem('lang', l); } catch(e){}
}
const langBtn = $('#lang');
if (langBtn) langBtn.onclick = () => setLang(lang === 'es' ? 'en' : 'es');

/* ===== Contacto (demo) ===== */
const cf = $('.contact-form[data-demo]');
if (cf) cf.onsubmit = e => { e.preventDefault(); alert(tn('Message sent! (demo)')); cf.reset(); };

/* ===== Registro e inicio de sesion (guardado en este navegador) ===== */
const showMsg = (key, ok) => { const m = $('#msg'); m.textContent = tn(key); m.className = 'msg ' + (ok ? 'ok' : 'err'); return false; };
async function hash(s){
  try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
  catch(e){ return btoa(unescape(encodeURIComponent(s))); }
}
const signupForm = $('#signupForm');
if (signupForm) signupForm.addEventListener('submit', async e => {
  e.preventDefault();
  const f = new FormData(signupForm), v = k => (f.get(k) || '').toString().trim();
  const name = v('name'), email = v('email').toLowerCase(), phone = v('phone'), business = v('business'), pw = (f.get('password') || '').toString(), pw2 = (f.get('password2') || '').toString();
  if (!name || !email || !phone || !business || !pw || !pw2) return showMsg('Please fill in all fields.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showMsg('Enter a valid email.');
  if (phone.replace(/\D/g, '').length < 7) return showMsg('Phone must have at least 7 digits.');
  if (pw.length < 6) return showMsg('Password must be at least 6 characters.');
  if (pw !== pw2) return showMsg('Passwords do not match.');
  if (!f.get('terms')) return showMsg('You must accept the terms.');
  const users = load('fiao_users', []);
  if (users.some(u => u.email === email)) return showMsg('That email is already registered.');
  users.push({ name, email, phone, business, pass: await hash(pw) });
  save('fiao_users', users);
  showMsg('Account created! Redirecting to log in...', true);
  setTimeout(() => location.href = 'login.html', 1200);
});
const loginForm = $('#loginForm');
if (loginForm) loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const f = new FormData(loginForm), email = (f.get('email') || '').toString().trim().toLowerCase(), pw = (f.get('password') || '').toString();
  if (!email || !pw) return showMsg('Please fill in all fields.');
  if (!$('#robot').checked) return showMsg('Please check "I\'m not a robot".');
  const u = load('fiao_users', []).find(x => x.email === email);
  if (!u || u.pass !== await hash(pw)) return showMsg('Incorrect email or password.');
  save('fiao_session', { name: u.name, email: u.email, business: u.business });
  showMsg('Welcome back! Redirecting...', true);
  setTimeout(() => location.href = 'credit.html', 900);
});

/* ===== Productos y venta fiada ===== */
if ($('#grid')) {
  const iso = () => new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  const DEF = [
    {id:'p1',name:'Coca Cola 2L',cat:'Beverages',unit:'2L bottle',price:2.25,stock:20,img:'img/coca-cola.jpg',emoji:'🥤'},
    {id:'p2',name:'Eggs',cat:'Dairy',unit:'dozen',price:2.90,stock:18,img:'img/eggs.jpg',emoji:'🥚'},
    {id:'p3',name:'Rice',cat:'Pantry',unit:'5 lb bag',price:5.75,stock:15,img:'img/rice.jpg',emoji:'🍚'},
    {id:'p4',name:'Sugar',cat:'Pantry',unit:'2 lb bag',price:0.85,stock:24,img:'img/sugar.jpg',emoji:'🍬'},
    {id:'p5',name:'White Bread',cat:'Bakery',unit:'loaf',price:1.50,stock:12,img:'img/bread.jpg',emoji:'🍞'}];
  let products = load('fiao_products', DEF);
  let clients = load('fiao_clients', ['Ramón Batista','Carlos Gómez','Ana Martínez','Yolanda Pérez']);
  let sales = load('fiao_sales', [{id:'s1',client:'Yolanda Pérez',pid:'p5',pname:'White Bread',qty:2,total:3,date:iso()}]);
  let editId = null, tmpImg = null, photoFor = null;

  function toData(file, cb){
    const r = new FileReader();
    r.onload = () => { const im = new Image(); im.onload = () => {
      const k = Math.min(1, 600 / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = im.width * k; c.height = im.height * k; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      cb(c.toDataURL('image/jpeg', .82)); }; im.src = r.result; };
    r.readAsDataURL(file);
  }
  const card = p => `<article class="product"><div class="img" data-photo="${p.id}" title="${esc(tn('Click to change photo'))}">${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.name)}">` : `<span>${p.emoji || '📦'}</span>`}<span class="tag">${esc(tn(p.cat))}</span></div><div class="info"><div class="top">${esc(tn(p.name))}<span>${money(p.price)}</span></div><small>${esc(tn(p.unit))}</small><div class="foot"><small>${tn('Stock')}: ${p.stock}</small><span><button class="icon-btn" data-edit="${p.id}">✎</button><button class="icon-btn red" data-rm="${p.id}">🗑</button></span></div></div></article>`;

  function renderGrid(){
    const f = ($('#q').value || '').toLowerCase();
    const list = products.filter(p => (p.name + ' ' + p.cat + ' ' + p.unit + ' ' + tn(p.name)).toLowerCase().includes(f));
    $('#grid').innerHTML = list.map(card).join('') + `<div class="add-card" id="addCard"><div><b>+</b>${tn('Add New Product')}<br><small>${tn('Create a new item')}</small></div></div>`;
    $('#grid').querySelectorAll('.img img').forEach(i => i.addEventListener('error', () => {
      const p = products.find(x => x.id === i.parentNode.dataset.photo); i.outerHTML = '<span>' + ((p && p.emoji) || '📦') + '</span>'; }));
  }
  function updTotal(){
    const p = products.find(x => x.id === $('#sProduct').value), q = Math.max(1, parseInt($('#sQty').value) || 1);
    $('#sTotal').textContent = money(p ? p.price * q : 0);
  }
  function renderSale(){
    const sc = $('#sClient'), cv = sc.value; sc.innerHTML = clients.map(c => `<option>${esc(c)}</option>`).join(''); if (cv) sc.value = cv;
    const sp = $('#sProduct'), pv = sp.value; sp.innerHTML = products.map(p => `<option value="${p.id}">${esc(tn(p.name))} (${money(p.price)})</option>`).join(''); if (pv) sp.value = pv;
    updTotal();
    $('#sales').innerHTML = sales.length ? sales.slice().reverse().map(s => `<div class="sale-row"><span><b>${esc(s.client)}</b> - ${esc(tn(s.pname))} (x${s.qty})</span><span><b class="amt">${money(s.total)}</b><button class="del" data-delsale="${s.id}" title="Delete">🗑</button></span></div>`).join('') : `<p>${tn('No sales yet.')}</p>`;
  }
  window.renderPage = () => { renderGrid(); renderSale(); };

  // Pestañas
  document.querySelectorAll('[data-tab]').forEach(t => t.onclick = () => {
    document.querySelectorAll('[data-tab]').forEach(x => x.classList.toggle('active', x === t));
    $('#tab-inv').hidden = t.dataset.tab !== 'inv'; $('#tab-sale').hidden = t.dataset.tab !== 'sale';
  });
  $('#q').oninput = renderGrid;

  // Producto: abrir / editar / borrar / cambiar foto
  function previewImg(){ const has = !!tmpImg; $('#upPrev').hidden = !has; $('#upTxt').hidden = has; if (has) $('#upPrev').src = tmpImg; }
  function openP(id){
    editId = id || null; const p = products.find(x => x.id === id) || {};
    $('#pForm').reset(); tmpImg = p.img || null; previewImg();
    $('#mTitle').textContent = tn(id ? 'Edit Product' : 'New Product'); $('#mBtn').textContent = tn(id ? 'Save changes' : 'Add Product');
    $('#pName').value = p.name || ''; $('#pCat').value = p.cat || ''; $('#pUnit').value = p.unit || ''; $('#pPrice').value = p.price ?? ''; $('#pStock').value = p.stock ?? '';
    $('#modal').classList.add('open');
  }
  $('#grid').addEventListener('click', e => {
    if (e.target.closest('#addCard')) return openP();
    const ed = e.target.closest('[data-edit]'); if (ed) return openP(ed.dataset.edit);
    const rm = e.target.closest('[data-rm]'); if (rm) { if (confirm(tn('Delete this product?'))) { products = products.filter(p => p.id !== rm.dataset.rm); save('fiao_products', products); window.renderPage(); } return; }
    const ph = e.target.closest('[data-photo]'); if (ph) { photoFor = ph.dataset.photo; $('#photoPick').click(); }
  });
  $('#photoPick').onchange = e => { const f = e.target.files[0]; if (!f) return;
    toData(f, d => { const p = products.find(x => x.id === photoFor); if (p) { p.img = d; save('fiao_products', products); renderGrid(); } e.target.value = ''; }); };
  $('#pFile').onchange = e => { const f = e.target.files[0]; if (f) toData(f, d => { tmpImg = d; previewImg(); }); };
  $('#pForm').onsubmit = e => {
    e.preventDefault();
    const name = $('#pName').value.trim(), price = parseFloat($('#pPrice').value);
    if (!name) return alert(tn('Product name is required.'));
    if (isNaN(price) || price < 0) return alert(tn('Enter a valid price.'));
    const data = { name, cat: $('#pCat').value.trim() || 'Pantry', unit: $('#pUnit').value.trim(), price, stock: parseInt($('#pStock').value) || 0, img: tmpImg };
    if (editId) Object.assign(products.find(p => p.id === editId), data); else products.push({ id: 'p' + Date.now(), emoji: '📦', ...data });
    if (save('fiao_products', products)) { $('#modal').classList.remove('open'); window.renderPage(); }
  };

  // Nuevo cliente
  $('#newClient').onclick = () => { $('#cForm').reset(); $('#cModal').classList.add('open'); };
  $('#cForm').onsubmit = e => {
    e.preventDefault(); const n = $('#cName').value.trim(); if (!n) return;
    if (!clients.includes(n)) { clients.push(n); save('fiao_clients', clients); }
    renderSale(); $('#sClient').value = n; $('#cModal').classList.remove('open');
  };

  // Registrar fiado
  $('#sDate').value = iso();
  $('#sProduct').onchange = updTotal; $('#sQty').oninput = updTotal;
  $('#saleForm').onsubmit = e => {
    e.preventDefault();
    const p = products.find(x => x.id === $('#sProduct').value), qty = Math.max(1, parseInt($('#sQty').value) || 1), client = $('#sClient').value;
    if (!p || !client) return;
    if (qty > p.stock) return alert(tn('Not enough stock'));
    p.stock -= qty;
    sales.push({ id: 's' + Date.now(), client, pid: p.id, pname: p.name, qty, total: +(p.price * qty).toFixed(2), date: $('#sDate').value });
    save('fiao_products', products); save('fiao_sales', sales);
    $('#sQty').value = 1; window.renderPage();
    const m = $('#sMsg'); m.textContent = tn('Fiado registered!'); setTimeout(() => m.textContent = '', 2200);
  };
  $('#sales').addEventListener('click', e => {
    const d = e.target.closest('[data-delsale]'); if (!d || !confirm(tn('Delete this sale?'))) return;
    const s = sales.find(x => x.id === d.dataset.delsale), p = s && products.find(x => x.id === s.pid); if (p) p.stock += s.qty;
    sales = sales.filter(x => x.id !== d.dataset.delsale); save('fiao_sales', sales); save('fiao_products', products); window.renderPage();
  });
}

setLang(lang);