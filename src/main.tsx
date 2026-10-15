import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, X } from 'lucide-react'
import './styles.css'
import './locker-reference.css'

/** 在这里替换姓名、岗位、照片与介绍。photo 留空时会显示姓名缩写。 */
const teamMembers = [
  { name: '成员 01', role: '项目统筹', initials: '01', color: '#f8bf42', photo: '', note: '负责推进项目节奏与团队协作。' },
  { name: '成员 02', role: '用户研究', initials: '02', color: '#f27d75', photo: '', note: '负责整理调研信息与用户洞察。' },
  { name: '成员 03', role: '视觉表达', initials: '03', color: '#45b9d7', photo: '', note: '负责项目视觉与内容表达。' },
  { name: '成员 04', role: '方案策划', initials: '04', color: '#b6d84a', photo: '', note: '负责策略框架与落地方案。' },
  { name: '成员 05', role: '内容记录', initials: '05', color: '#c896e4', photo: '', note: '负责培训记录与故事梳理。' },
  { name: '成员 06', role: '成果展示', initials: '06', color: '#f39a4b', photo: '', note: '负责汇报呈现与成果沉淀。' },
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
          <LockerDoor number="01" className="locker-one reference-left" stickers={['TEAM 06', '✿', 'FIRST DAY']} />
          <button className="locker openable reference-middle" onClick={() => setOpen(!open)} aria-label="打开团队身份柜"><div className="door-face"><Vent/><span className="locker-number">02</span><span className="door-label">TEAM<br/>IDENTITY</span><div className="sticker-group"><b>★</b><i>OUR<br/>CREW</i><em>♥</em></div><Handle/><div className="door-id-rack">{teamMembers.map((member, index) => <button key={member.name} className="hanging-card" style={{ '--card': member.color, '--tilt': `${(index % 3 - 1) * 3}deg` } as React.CSSProperties} onClick={(event) => { event.stopPropagation(); setSelected(index) }}><span className="lanyard"/><span className="clip"/><span className="mini-photo" style={member.photo ? { backgroundImage: `url(${member.photo})` } : {}}>{member.photo ? '' : member.initials}</span><b>{member.name}</b><small>{member.role}</small></button>)}</div></div><div className="locker-inside"><div className="inside-top"><span>TEAM ARCHIVE</span><b>06</b></div><div className="mini-books"><i/><i/><i/><i/><i/></div><div className="archive-sign">FIND A WORD<br/><b>OUR STORY</b></div><div className="mini-case">TRAINING<br/><b>FILES</b></div><div className="folder-box">SELECTED<br/><b>WORK</b></div><p>打开门内的身份牌 →</p></div></button>
          <LockerDoor number="03" className="locker-three reference-right" stickers={['SNAP', 'MEMORIES', '★']} />
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
