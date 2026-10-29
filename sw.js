const C="ec-v2",A=["./","index.html","firebase-config.js","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const h=new URL(e.request.url).hostname;
 if(/googleapis\.com|firestore|identitytoolkit|securetoken/.test(h))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type==="opaque"){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k)).catch(()=>{})}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
