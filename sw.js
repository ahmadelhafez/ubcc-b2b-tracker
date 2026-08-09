const V='b2b-v8';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.hostname.endsWith('supabase.co'))return; /* never intercept the API */
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request).then(r=>{const cl=r.clone();caches.open(V).then(c=>c.put(e.request,cl));return r;})
      .catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));
  } else if(/fonts\.gstatic|fonts\.googleapis|cdn\.jsdelivr|cdn\.sheetjs|covers\.openlibrary|books\.google/.test(u.hostname)){
    e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{const cl=r.clone();caches.open(V).then(c=>c.put(e.request,cl));return r;})));
  }
});
