// js/app.js
​// ============================================================
// 1. TAB SWITCHING
// ============================================================
function switchTab(tabId, element) {
document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
document.getElementById('tab-' + tabId).classList.add('active');
if (element) element.classList.add('active');
document.getElementById('main-scroll').scrollTo(0, 0);
}
​document.querySelectorAll('.nav-btn').forEach(btn => {
btn.addEventListener('click', function () {
const tab = this.dataset.tab;
switchTab(tab, this);
});
});
​// ============================================================
// 2. TYPEWRITER EFFECT
// ============================================================
const roles = ['Cyber Security Analyst', 'Full-Stack Developer', 'Ethical Hacker', 'IT Consultant'];
let roleIdx = 0,
charIdx = 0,
isDeleting = false;
​function typeWriter() {
const current = roles[roleIdx];
const el = document.getElementById('typewriter');
if (isDeleting) {
el.textContent = current.substring(0, charIdx - 1);
charIdx--;
} else {
el.textContent = current.substring(0, charIdx + 1);
charIdx++;
}
let speed = isDeleting ? 40 : 100;
if (!isDeleting && charIdx === current.length) {
speed = 2000;
isDeleting = true;
} else if (isDeleting && charIdx === 0) {
isDeleting = false;
roleIdx = (roleIdx + 1) % roles.length;
speed = 500;
}
setTimeout(typeWriter, speed);
}
setTimeout(typeWriter, 1000);
​// ============================================================
// 3. LIVE CLOCK & RANDOM IP
// ============================================================
function updateTopBar() {
const now = new Date();
document.getElementById('live-clock').textContent =
${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')};
document.getElementById('live-date').textContent =
now.toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short' });
}
setInterval(updateTopBar, 1000);
updateTopBar();
​document.getElementById('mock-ip').textContent =
${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)};
​// ============================================================
// 4. TERMINAL SIMULATOR
// ============================================================
const termOut = document.getElementById('terminal-output');
const commands = [
{ text: 'Initializing Cyber-Spider Node...', color: 'text-slate-500 font-semibold' },
{ text: 'Loading security protocols [OK]', color: 'text-teal-700 font-semibold' },
{ text: 'root@rizu-enterprise:# whoami', color: 'text-slate-900 font-bold' },
{ text: 'Rizu Zaman - Security & Web Expert', color: 'text-sky-700 font-bold' },
{ text: 'root@rizu-enterprise:# systemctl status firewall', color: 'text-slate-900 font-bold' },
{ text: 'Active: active (running) - SECURE', color: 'text-teal-700 font-bold' },
{ text: 'root@rizu-enterprise:~# _', color: 'text-slate-900 font-bold cursor-blink' },
];
let lineIdx = 0;
​function typeTerminal() {
if (lineIdx < commands.length) {
const p = document.createElement('p');
p.className = mb-1 ${commands[lineIdx].color};
p.textContent = commands[lineIdx].text;
const oldCursor = termOut.querySelector('.cursor-blink');
if (oldCursor) oldCursor.remove();
termOut.appendChild(p);
termOut.scrollTop = termOut.scrollHeight;
lineIdx++;
const delay = lineIdx === commands.length ? 9999999 : Math.random() * 400 + 200;
setTimeout(typeTerminal, delay);
}
}
setTimeout(typeTerminal, 1500);
​// ============================================================
// 5. REALISTIC SPIDER-WEB BACKGROUND CANVAS (Interactive)
// ============================================================
const canvas = document.getElementById('matrix-spider-canvas');
const ctx = canvas.getContext('2d');
let width, height, nodes = [];
let mouse = { x: null, y: null, active: false };
​function resizeCanvas() {
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
​window.addEventListener('mousemove', (e) => {
mouse.x = e.clientX;
mouse.y = e.clientY;
mouse.active = true;
});
​window.addEventListener('touchmove', (e) => {
if(e.touches.length > 0) {
mouse.x = e.touches[0].clientX;
mouse.y = e.touches[0].clientY;
mouse.active = true;
}
}, {passive: true});
​class SpiderNode {
constructor() {
this.x = Math.random() * width;
this.y = Math.random() * height;
this.vx = (Math.random() - 0.5) * 0.8;
this.vy = (Math.random() - 0.5) * 0.8;
this.radius = Math.random() * 2 + 1.5;
this.baseX = this.x;
this.baseY = this.y;
}
update() {
this.x += this.vx;
this.y += this.vy;
​if (this.x < 0 || this.x > width) this.vx *= -1;
if (this.y < 0 || this.y > height) this.vy *= -1;
​// Interaksi elastis dengan kursor mouse / sentuhan
if (mouse.active && mouse.x !== null) {
let dx = mouse.x - this.x;
let dy = mouse.y - this.y;
let dist = Math.sqrt(dx * dx + dy * dy);
if (dist < 140) {
let force = (140 - dist) / 140;
this.x -= (dx / dist) * force * 3;
this.y -= (dy / dist) * force * 3;
}
}
}
draw() {
ctx.beginPath();
ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
ctx.fillStyle = '#0284c7';
ctx.fill();
}
}
​const nodeCount = window.innerWidth > 768 ? 65 : 35;
for (let i = 0; i < nodeCount; i++) {
nodes.push(new SpiderNode());
}
​function drawSpiderWebCanvas() {
ctx.clearRect(0, 0, width, height);
​// Render koneksi jaring laba-laba elastis realistis
for (let i = 0; i < nodes.length; i++) {
nodes[i].update();
nodes[i].draw();
​for (let j = i + 1; j < nodes.length; j++) {
let dx = nodes[i].x - nodes[j].x;
let dy = nodes[i].y - nodes[j].y;
let dist = Math.sqrt(dx * dx + dy * dy);
​if (dist < 120) {
ctx.beginPath();
ctx.strokeStyle = rgba(2, 132, 199, ${0.35 - dist / 350});
ctx.lineWidth = 0.75;
ctx.moveTo(nodes[i].x, nodes[i].y);
ctx.lineTo(nodes[j].x, nodes[j].y);
ctx.stroke();
​// Efek jaring melengkung sekunder (Spider-web concentric style)
if (j % 3 === 0 && i % 3 === 0) {
ctx.beginPath();
ctx.strokeStyle = rgba(13, 148, 136, ${0.2 - dist / 600});
ctx.lineWidth = 0.4;
let midX = (nodes[i].x + nodes[j].x) / 2 + (Math.random() - 0.5) * 5;
let midY = (nodes[i].y + nodes[j].y) / 2 + (Math.random() - 0.5) * 5;
ctx.moveTo(nodes[i].x, nodes[i].y);
ctx.quadraticCurveTo(midX, midY, nodes[j].x, nodes[j].y);
ctx.stroke();
}
}
}
}
requestAnimationFrame(drawSpiderWebCanvas);
}
drawSpiderWebCanvas();
​// ============================================================
// 6. CONTACT FORM SUBMISSION
// ============================================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
const statusEl = document.getElementById('contact-status');
​contactForm.addEventListener('submit', async (e) => {
e.preventDefault();
const submitBtn = document.getElementById('contact-submit');
submitBtn.disabled = true;
submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> MENGIRIM...';
​const payload = {
name: document.getElementById('contact-name').value.trim(),
email: document.getElementById('contact-email').value.trim(),
message: document.getElementById('contact-message').value.trim(),
};
​try {
const res = await fetch('/api/contact', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
const data = await res.json();
statusEl.className = 'text-xs font-mono text-center mt-2 font-bold ' + (res.ok ? 'text-teal-700' : 'text-rose-600');
statusEl.textContent = res.ok ? '✓ Pesan terenkripsi berhasil dikirim!' : '✗ Gagal: ' + (data.error || 'unknown');
statusEl.classList.remove('hidden');
if (res.ok) contactForm.reset();
} catch (err) {
statusEl.className = 'text-xs font-mono text-center mt-2 font-bold text-rose-600';
statusEl.textContent = '✗ Error koneksi: ' + err.message;
statusEl.classList.remove('hidden');
} finally {
submitBtn.disabled = false;
submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> TRANSMIT SECURE DATA';
}
});
}
​// ============================================================
// 7. TRACK VISITOR
// ============================================================
async function trackVisitor() {
try {
await fetch('/api/threats', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ userAgent: navigator.userAgent }),
});
} catch (_) { /* silent */ }
}
if (document.readyState === 'complete') {
trackVisitor();
} else {
window.addEventListener('load', trackVisitor);
}
