# WA Panel Frontend (Vercel)

Versi frontend-only (UI) dari WA Panel — login + dashboard (WhatsApp, Telegram, Spammer-sim, Clone Git).  
Deploy: push repo ke GitHub → Import Project di Vercel → Deploy.

**Catatan penting**: fitur runtime (QR pairing, send WA, clone/run repo) memerlukan backend server. UI sekarang memanggil placeholder endpoints like `/api/*`. Kamu harus menghubungkan endpoint tersebut ke backend yang berjalan di server lain.

Env / settings for backend:
- /api/login  (POST)
- /api/qr     (socket or GET polling)
- /api/send_wa (POST)
- /api/broadcast (POST)
- /api/clone  (POST)
- /api/telegram/init (POST)
- /api/spammer/simulate (POST)

Owner number default: 085256283487 (field `OWNER_NUMBER` visible in UI)
