const V='b2b-v10';
/* Assets only. The HTML is NEVER cached: every launch fetches the current app,
   so a deploy reaches the team immediately instead of after a cache expiry. */
const ASSETS=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.hostname.endsWith('supabase.co'))return;              /* never touch the API */
  const isDoc=e.request.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html');
  if(u.origin===location.origin&&isDoc){
    /* network first, no-store; only fall back to a cached copy when truly offline */
    e.respondWith(fetch(e.request,{cache:'no-store'})
      .then(r=>{const cl=r.clone();caches.open(V).then(c=>c.put('./index.html',cl));return r;})
      .catch(()=>caches.match('./index.html')));
    return;}
  if(u.origin===location.origin||/fonts\.gstatic|fonts\.googleapis|cdn\.jsdelivr|cdn\.sheetjs|covers\.openlibrary|books\.google/.test(u.hostname)){
    e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{const cl=r.clone();caches.open(V).then(c=>c.put(e.request,cl));return r;}).catch(()=>m)));
  }
});
