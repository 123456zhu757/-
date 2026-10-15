import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, X } from 'lucide-react'
import './styles.css'

/** 在这里替换姓名、岗位、照片与介绍。photo 留空时会显示姓名缩写。 */
const teamMembers = [
  { name: '孙刘轶', role: '懂事长', initials: '孙', color: '#f8bf42', photo: './assets/members/孙刘轶.jpg', note: '团队身份牌 01。' },
  { name: '朱天怡', role: '金嗓子', initials: '朱', color: '#f27d75', photo: './assets/members/朱天怡.jpg', note: '团队身份牌 02。' },
  { name: '朱弋洁', role: '金点子', initials: '朱', color: '#45b9d7', photo: './assets/members/朱弋洁.jpg', note: '团队身份牌 03。' },
  { name: '钱蕴程', role: '笔杆子', initials: '钱', color: '#b6d84a', photo: './assets/members/钱蕴程.jpg', note: '团队身份牌 04。' },
  { name: '王玮琦', role: '金点子', initials: '王', color: '#c896e4', photo: './assets/members/王玮琦.jpg', note: '团队身份牌 05。' },
  { name: '倪晨安', role: '笔杆子', initials: '倪', color: '#f39a4b', photo: './assets/members/倪晨安.jpg', note: '团队身份牌 06。' },
]

function App() {
  const [progress, setProgress] = useState(0)
  const [entered, setEntered] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  useEffect(() => { const interval = window.setInterval(() => setProgress(value => { const next = Math.min(value + (value < 74 ? 3 : 1), 100); if (next === 100) window.clearInterval(interval); return next }), 42); return () => window.clearInterval(interval) }, [])
  useEffect(() => { if (progress === 100) { const timeout = window.setTimeout(() => setEntered(true), 500); return () => window.clearTimeout(timeout) } }, [progress])
  return <main>
    {!entered ? <Welcome progress={progress} /> : <>
      <header className="site-header"><span>新人培训项目汇报</span><b>TEAM 06</b><span>2026 / FIRST PROJECT</span></header>
      <section className="locker-scene">
        <div className="scene-title"><span>WELCOME TO</span><h1>OUR <i>LOCKER</i></h1><p>六个人，把第一次共同完成的项目<br/>收进同一排校园储物柜。</p></div>
        <div className={'locker-bank ' + (open ? 'is-open' : '')}>
          <LockerDoor number="01" className="locker-one" stickers={['✦', 'BEST DAY', '☺']} />
          <button className="locker openable" onClick={() => setOpen(!open)} aria-label="打开团队身份柜"><div className="door-face"><Vent/><span className="locker-number">02</span><span className="door-label">TEAM<br/>IDENTITY</span><div className="sticker-group"><b>★</b><i>OUR<br/>CREW</i><em>♥</em></div><Handle/></div><div className="locker-inside"><div className="inside-top"><span>MEMBER IDS</span><b>TEAM 06</b></div><div className="card-rack">{teamMembers.map((member, index) => <button key={member.name} className="hanging-card" style={{ '--card': member.color, '--tilt': `${(index % 3 - 1) * 4}deg` } as React.CSSProperties} onClick={(event) => { event.stopPropagation(); setSelected(index) }}><span className="lanyard"/><span className="clip"/><span className="mini-photo" style={member.photo ? { backgroundImage: `url(${member.photo})` } : {}}>{member.photo ? '' : member.initials}</span><b>{member.name}</b><small>{member.role}</small></button>)}</div><p>点击身份牌，认识我们的成员 →</p></div></button>
          <LockerDoor number="03" className="locker-three" stickers={['TRAINING', '✿', 'GOOD LUCK']} />
          <LockerDoor number="04" className="locker-four" stickers={['☆', 'MEMORIES', 'SMILE']} />
        </div>
        <button className="open-tip" onClick={() => setOpen(!open)}>{open ? '合上身份柜' : '打开第二扇柜门'} <ArrowRight size={15}/></button>
      </section><footer>TRAINING ENDS, OUR STORY STARTS</footer>
    </>}{selected !== null && <MemberModal member={teamMembers[selected]} close={() => setSelected(null)} />}
  </main>
}
function Welcome({ progress }: { progress: number }) { return <section className="welcome"><div className="welcome-word" style={{ '--fill': `${progress}%` } as React.CSSProperties}>WELCOME</div><div className="welcome-meta">· TEAM 06 — TRAINING ARCHIVE</div><div className="loading"><b>{String(progress).padStart(2, '0')}<small>%</small></b><span><i style={{ width: `${progress}%` }}/></span><em>LOADING OUR FIRST STORY</em></div></section> }
function Vent() { return <span className="vent"><i/><i/><i/><i/></span> }
function Handle() { return <span className="handle"><i/></span> }
function LockerDoor({ number, stickers, className }: { number: string; stickers: string[]; className: string }) { return <div className={'locker '+className}><Vent/><span className="locker-number">{number}</span><span className="door-label">STUDENT<br/>LOCKER</span><div className="stickers">{stickers.map((sticker, index) => <b key={sticker} className={'sticker s'+index}>{sticker}</b>)}</div><Handle/><span className="bottom-vent"><i/><i/><i/></span></div> }
function MemberModal({ member, close }: { member: typeof teamMembers[number]; close: () => void }) { return <div className="member-modal" onClick={close}><article onClick={event => event.stopPropagation()}><button aria-label="关闭" onClick={close}><X/></button><span className="big-lanyard"/><div className="id-photo" style={member.photo ? { backgroundImage: `url(${member.photo})` } : { backgroundColor: member.color }}>{member.photo ? '' : member.initials}</div><div><small>TEAM 06 / IDENTITY CARD</small><h2>{member.name}</h2><b>{member.role}</b><p>{member.note}</p></div></article></div> }
export default App

createRoot(document.getElementById('root')!).render(<App />)
