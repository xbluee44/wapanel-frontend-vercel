// Frontend-only UI logic. Calls /api/* endpoints (backend must implement them).
const OWNER_NUMBER = "085256283487"; // ditampilkan di UI

// navigation
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', (e) => {
    document.querySelectorAll('.nav a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
    const t = a.getAttribute('data-target');
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    document.getElementById(t).classList.add('active');
  });
});

// set owner number
document.getElementById('ownerNumber').innerText = OWNER_NUMBER;

// Login
async function login(){
  document.getElementById('msg').innerText = "";
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const token = document.getElementById('token').value;
  try {
    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, password, token })});
    const j = await res.json();
    if (j.success) {
      window.location.href = "/dashboard";
    } else {
      document.getElementById('msg').innerText = j.message || 'Login gagal';
    }
  } catch(e) {
    document.getElementById('msg').innerText = 'Server tidak tersedia';
  }
}

// send WA (calls backend)
async function sendWA(){
  const number = document.getElementById('waNumber').value;
  const message = document.getElementById('waMessage').value;
  try {
    const res = await fetch('/api/send_wa', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ number, message })});
    const j = await res.json();
    alert(JSON.stringify(j));
  } catch (e) { alert('Server error'); }
}

// broadcast
async function startBroadcast(){
  const targets = document.getElementById('bTargets').value.split('\n').map(s=>s.trim()).filter(Boolean);
  const message = document.getElementById('bMessage').value;
  const delay = Number(document.getElementById('bDelay').value) || 2000;
  const resp = await fetch('/api/broadcast', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ targets, message, delayMs: delay })});
  const j = await resp.json();
  const log = document.getElementById('bLog');
  log.innerText += JSON.stringify(j) + "\n";
}

// spammer simulation
async function startSpammerSim(){
  const target = document.getElementById('simTarget').value;
  const speed = Number(document.getElementById('simSpeed').value) || 5;
  const count = Number(document.getElementById('simCount').value) || 20;
  const resp = await fetch('/api/spammer/simulate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ target, speed, count })});
  const j = await resp.json();
  const log = document.getElementById('simLog');
  log.innerText += JSON.stringify(j) + "\n";
}

// clone repo
async function cloneRepo(){
  const repo = document.getElementById('cloneRepo').value;
  const res = await fetch('/api/clone', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ repo })});
  const j = await res.json();
  document.getElementById('cloneLog').innerText += JSON.stringify(j) + "\n";
}

// Telegram
async function initTelegram(){
  const token = document.getElementById('tgToken').value;
  const res = await fetch('/api/telegram/init', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ token })});
  const j = await res.json();
  document.getElementById('tgLog').innerText += JSON.stringify(j) + "\n";
}
async function sendTelegram(){
  const chatId = document.getElementById('tgChatId').value;
  const msg = document.getElementById('tgMessage').value;
  const res = await fetch('/api/telegram/send', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ chatId, message: msg })});
  const j = await res.json();
  document.getElementById('tgLog').innerText += JSON.stringify(j) + "\n";
}

// chat owner: prepare WA number in form
function chatOwner(){
  const msg = document.getElementById('ownerMsg').value;
  // fill WA form
  document.getElementById('waNumber').value = OWNER_NUMBER.replace(/^0/, '62'); // quick convert
  document.getElementById('waMessage').value = msg;
  // optionally auto-call sendWA()
    }
