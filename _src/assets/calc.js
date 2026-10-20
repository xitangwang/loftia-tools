(function(){var D=window.CROPS,tb=document.getElementById('cbody');if(!tb)return;
var $=function(i){return document.getElementById(i)};
function row(c,i){var tr=document.createElement('tr');tr.dataset.i=i;
tr.innerHTML='<td><a href="'+window.ROOT+'crops/'+c.slug+'/">'+c.name+'</a> '+(c.custom?'<span class="tag tbd">custom</span>':'<span class="tag" title="Seed price, sell price and grow time verified from community data (demo)">demo data</span>')+'</td>'+
'<td><input type="number" min="0" data-k="seed" value="'+(c.seed??'')+'" placeholder="TBD"></td><td><input type="number" min="0" data-k="sell" value="'+(c.sell??'')+'" placeholder="TBD"></td>'+
'<td><input type="number" min="0.1" step="0.5" data-k="grow" value="'+(c.grow??'')+'" placeholder="TBD"></td><td><input type="number" min="1" data-k="yield" value="'+(c.yield??1)+'" title="Crops per harvest. Not confirmed; default 1"></td>'+
'<td class="p">–</td><td class="ph">–</td><td class="tot">–</td>';tb.appendChild(tr)}
D.forEach(row);
function calc(){var plots=+$('plots').value||1,mins=+$('mins').value||60,rg=$('rapid').checked,fh=$('fruit').checked,res=[];
[].forEach.call(tb.rows,function(tr){var g=function(k){var v=tr.querySelector('[data-k='+k+']').value;return v===''?null:+v};
var s=g('seed'),p=g('sell'),t=g('grow'),y=g('yield')||1;tr.classList.remove('best');
if(s==null||p==null||!t){tr.querySelector('.p').textContent='TBD';tr.querySelector('.ph').textContent='TBD';tr.querySelector('.tot').textContent='TBD';return}
var ey=y*(fh?1.2:1),tt=rg?t/1.2:t,prof=p*ey-s,ph=prof*60/tt,cycles=Math.floor(mins/tt),tot=prof*cycles*plots;
tr.querySelector('.p').textContent=prof.toFixed(1);tr.querySelector('.ph').textContent=ph.toFixed(1);tr.querySelector('.tot').textContent=Math.round(tot)+' ('+cycles+'×)';res.push([ph,tr,tr.cells[0].textContent])});
res.sort(function(a,b){return b[0]-a[0]});if(res[0]){res[0][1].classList.add('best');$('bestout').textContent='Best Dew/hour per plot: '+res[0][2].replace(/demo data|custom/,'').trim()+' ('+res[0][0].toFixed(1)+' Dew/h)'}}
tb.addEventListener('input',calc);['plots','mins','rapid','fruit'].forEach(function(i){$(i).addEventListener('input',calc)});
$('addc').onclick=function(){var n=prompt('Crop name (e.g. a new Early Access crop)');if(!n)return;var c={slug:'',name:n,seed:null,sell:null,grow:null,yield:1,custom:1};D.push(c);row(c,D.length-1);tb.lastChild.cells[0].innerHTML=n.replace(/</g,'')+' <span class="tag tbd">custom</span>';calc()};
$('resetc').onclick=function(){location.reload()};calc()})();
