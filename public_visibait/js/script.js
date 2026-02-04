// Minimal memory game using visibait public images
const grid = document.getElementById('grid');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');

// Use 18 images from visibait repo (1..18) duplicated to make pairs
const base = 'https://raw.githubusercontent.com/visibait/valentines/main/public/game-photos/';
const images = Array.from({length:18}, (_,i)=> base + (i+1) + '.avif');
let cards = shuffle([...images, ...images]);

function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a }

function createGrid(){
  grid.innerHTML='';
  cards.forEach((src,idx)=>{
    const div=document.createElement('div');div.className='card cover';div.dataset.idx=idx;
    const img=document.createElement('img');img.src=src;img.alt='';img.style.display='none';
    div.appendChild(img);
    div.addEventListener('click',()=>onCardClick(div,src));
    grid.appendChild(div);
  });
}

let revealed=[];let matched=new Set();

function onCardClick(card,src){
  const idx = Number(card.dataset.idx);
  if(matched.has(idx) || revealed.includes(idx) ) return;
  const img = card.querySelector('img');
  card.classList.remove('cover'); img.style.display='block'; revealed.push(idx);
  if(revealed.length===2){
    const [a,b]=revealed; if(cards[a]===cards[b]){ matched.add(a); matched.add(b); revealed=[]; checkWin(); } else { setTimeout(()=>{ hideCard(a); hideCard(b); revealed=[]; },800); }
  }
}

function hideCard(idx){ const el = grid.querySelector(`.card[data-idx="${idx}"]`); if(el){ el.classList.add('cover'); el.querySelector('img').style.display='none'; } }

function checkWin(){ if(matched.size === cards.length){ overlay.classList.remove('hidden'); } }

closeBtn?.addEventListener('click',()=>{ overlay.classList.add('hidden'); resetGame(); });

function resetGame(){ cards = shuffle([...images,...images]); matched = new Set(); revealed = []; createGrid(); }

createGrid();
