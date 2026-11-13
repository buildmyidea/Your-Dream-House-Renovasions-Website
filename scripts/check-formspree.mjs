import fs from 'node:fs';
import assert from 'node:assert/strict';
const { Window } = await import(process.env.RUNNER_TEMP+'/ydhr-form-check/node_modules/happy-dom/lib/index.js');
const html=fs.readFileSync('index.html','utf8');
const formHtml=html.slice(html.indexOf('<form class="project-enquiry"'),html.indexOf('</form>',html.indexOf('<form class="project-enquiry"'))+7);
const w=new Window({url:'https://yourdreamhomerenovations.com'});
w.document.write(formHtml);
let mode='pending',requests=[],release;
w.fetch=async(url,options)=>{
 requests.push({url,method:options.method,headers:options.headers,values:Object.fromEntries(options.body)});
 if(mode==='pending')return new Promise(r=>release=r);
 if(mode==='network')throw new Error('offline');
 if(mode==='validation')return {ok:false,json:async()=>({errors:[{field:'email',message:'Please enter a valid email address.'}]})};
 if(mode==='server')return {ok:false,json:async()=>({errors:[{message:'Service unavailable'}]})};
 return {ok:true,json:async()=>({ok:true})};
};
w.eval('const business={email:"infoydhr@gmail.com"};'+html.slice(html.indexOf("const enquiry = document.querySelector('.project-enquiry');"),html.indexOf('// Motion enhances',html.indexOf("const enquiry = document.querySelector('.project-enquiry');"))));
const form=w.document.querySelector('form'),button=form.querySelector('[type=submit]'),result=form.querySelector('.enquiry-result'),fallback=form.querySelector('.enquiry-fallback'),status=form.querySelector('.enquiry-status');
const fill=()=>{
 for(const [name,value] of Object.entries({fullName:' Website check ',telephone:'0400 000 000',email:'test@example.com',interest:'Major Renovations',locality:' Sydney ',description:'Bathroom renovation & accessible doorway'})){
  form.elements.namedItem(name).value=value;
  form.elements.namedItem(name).dispatchEvent(new w.Event('input',{bubbles:true}));
 }
};
const submit=()=>form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
const tick=()=>new Promise(r=>setTimeout(r,0));
assert.equal(form.action,'https://formspree.io/f/xvkagvpg');assert.equal(form.method,'post');assert(form.elements.namedItem('email'));assert(form.elements.namedItem('subject'));assert(form.elements.namedItem('_gotcha'));
fill();submit();assert(button.disabled);assert.equal(result.dataset.state,'sending');submit();assert.equal(requests.length,1);
assert.equal(requests[0].method,'POST');assert.equal(requests[0].headers.Accept,'application/json');
assert.equal(requests[0].values.fullName,'Website check');assert.equal(requests[0].values.locality,'Sydney');assert.equal(requests[0].values.email,'test@example.com');assert.equal(requests[0].values.subject,'Project enquiry — Major Renovations');
release({ok:true,json:async()=>({ok:true})});await tick();await tick();assert.equal(result.dataset.state,'success');assert(!button.disabled);assert.equal(form.elements.namedItem('fullName').value,'');assert(fallback.hidden);
mode='network';fill();submit();await tick();await tick();assert.equal(result.dataset.state,'error');assert(!fallback.hidden);assert.equal(form.elements.namedItem('email').value,'test@example.com');assert(!button.disabled);
mode='validation';submit();await tick();await tick();assert.equal(form.elements.namedItem('email').getAttribute('aria-invalid'),'true');assert(status.textContent.includes('valid email'));
mode='ok';form.elements.namedItem('email').dispatchEvent(new w.Event('input'));submit();await tick();await tick();assert.equal(result.dataset.state,'success');
mode='server';fill();submit();await tick();await tick();assert.equal(result.dataset.state,'error');assert(!fallback.hidden);
mode='ok';const previous=requests.length;form.elements.namedItem('fullName').value='   ';submit();await tick();assert.equal(requests.length,previous);
assert.equal((html.match(/<article class="work-tile/g)||[]).length,9);
console.log(JSON.stringify({checks:['endpoint and native POST fallback','all six fields and reply-to email','trimmed values and service subject','sending state and duplicate prevention','success and form reset','connection failure retains entries','server validation and correction','retry after failure','server error recovery','blank required field validation','nine portfolio cards preserved'],passed:true,realSubmissions:0}));
w.happyDOM.abort();
