import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'
import { ArrowRight, X } from 'lucide-react'
import './styles.css'
import './card-names.css'
import './map.css'
import './supplied-map.css'

/** 在这里替换姓名、岗位、照片与介绍。photo 留空时会显示姓名缩写。 */
const teamMembers = [
  { name: '孙刘轶', role: '懂事长', initials: '孙', color: '#f8bf42', photo: './assets/members/孙刘轶.jpg', note: '第三组成员身份牌 01。' },
  { name: '朱天怡', role: '金嗓子', initials: '朱', color: '#f27d75', photo: './assets/members/朱天怡.jpg', note: '第三组成员身份牌 02。' },
  { name: '朱弋洁', role: '金点子', initials: '朱', color: '#45b9d7', photo: './assets/members/朱弋洁.jpg', note: '第三组成员身份牌 03。' },
  { name: '钱蕴程', role: '笔杆子', initials: '钱', color: '#b6d84a', photo: './assets/members/钱蕴程.jpg', note: '第三组成员身份牌 04。' },
  { name: '王玮琦', role: '金点子', initials: '王', color: '#c896e4', photo: './assets/members/王玮琦.jpg', note: '第三组成员身份牌 05。' },
  { name: '倪晨安', role: '笔杆子', initials: '倪', color: '#f39a4b', photo: './assets/members/倪晨安.jpg', note: '第三组成员身份牌 06。' },
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
      <header className="site-header"><span>新人培训项目汇报</span><b>TEAM 03</b><span>2026 / FIRST PROJECT</span></header>
      <section className="locker-scene">
        <div className="scene-title"><span>WELCOME TO</span><h1>OUR <i>LOCKER</i></h1><p>六个人，把第一次共同完成的项目<br/>收进同一排储物柜。</p></div>
        <div className={'locker-bank ' + (open ? 'is-open' : '')}>
          <LockerDoor number="01" className="locker-one" stickers={['✦', 'BEST DAY', '☺']} />
          <button className="locker openable" onClick={() => setOpen(!open)} aria-label="打开第三组身份柜"><div className="door-face"><Vent/><span className="locker-number">02</span><span className="door-label">TEAM<br/>IDENTITY</span><div className="sticker-group"><b>★</b><i>OUR<br/>CREW</i><em>♥</em></div><Handle/></div><div className="locker-inside"><div className="inside-top"><span>MEMBER IDS</span><b>TEAM 03</b></div><div className="card-rack">{teamMembers.map((member, index) => <button key={member.name} className="hanging-card" style={{ '--card': member.color, '--tilt': `${(index % 3 - 1) * 4}deg` } as React.CSSProperties} onClick={(event) => { event.stopPropagation(); setSelected(index) }}><span className="lanyard"/><span className="clip"/><span className="mini-photo" style={member.photo ? { backgroundImage: `url(${member.photo})` } : {}}>{member.photo ? '' : member.initials}</span><b>{member.name}</b><small>{member.role}</small></button>)}</div><p>点击身份牌，认识我们的成员 →</p></div></button>
          <MapLocker />
          <LockerDoor number="04" className="locker-four" stickers={['☆', 'MEMORIES', 'SMILE']} />
        </div>
        <button className="open-tip" onClick={() => setOpen(!open)}>{open ? '合上身份柜' : '打开第二扇柜门'} <ArrowRight size={15}/></button>
      </section><footer>TRAINING ENDS, OUR STORY STARTS</footer>
    </>}{selected !== null && <MemberModal member={teamMembers[selected]} close={() => setSelected(null)} />}
  </main>
}
function Welcome({ progress }: { progress: number }) { return <section className="welcome"><div className="welcome-word" style={{ '--fill': `${progress}%` } as React.CSSProperties}>WELCOME</div><div className="welcome-meta">· TEAM 03 — TRAINING ARCHIVE</div><div className="loading"><b>{String(progress).padStart(2, '0')}<small>%</small></b><span><i style={{ width: `${progress}%` }}/></span><em>LOADING OUR FIRST STORY</em></div></section> }
function Vent() { return <span className="vent"><i/><i/><i/><i/></span> }
const mapStops = [
  { title: '点位 01', x: 28, y: 21 },
  { title: '点位 02', x: 63, y: 41 },
  { title: '点位 03', x: 70, y: 68 },
  { title: '点位 04', x: 47, y: 51 },
]
function MapLocker() {
  const [opened, setOpened] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  useEffect(() => {
    if (!mapVisible) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { if (active !== null) setActive(null); else setMapVisible(false) } }
    window.addEventListener('keydown', escape)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', escape) }
  }, [mapVisible, active])
  return <>
    <div className={'locker map-locker ' + (opened ? 'map-door-open' : '')}>
      <div className="map-cabinet-interior"><small>TEAM 03 / JOURNEY</small><button className="folded-map" onClick={() => { setActive(null); setMapVisible(true) }} disabled={!opened} aria-label="展开培训地图"><span>⌁</span><span>✧</span><span>♧</span><span>↗</span><b>OUR JOURNEY<br/>点击展开地图</b></button><p>一张地图，四段足迹</p></div>
      <button className="map-cabinet-door" onClick={() => setOpened(!opened)} aria-label={opened ? '合上第三扇柜门' : '打开第三扇柜门'} aria-expanded={opened}><Vent/><span className="locker-number">03</span><span className="door-label">OUR<br/>JOURNEY</span><div className="stickers"><b className="sticker s0">TRAINING</b><b className="sticker s1">✿</b><b className="sticker s2">OUR MAP</b></div><Handle/><span className="bottom-vent"><i/><i/><i/></span></button>
      {opened && <button className="map-close-cabinet" onClick={() => setOpened(false)}>合上柜门</button>}
    </div>
    {mapVisible && createPortal(<div className="journey-overlay supplied-map-overlay" role="dialog" aria-modal="true" aria-label="第三组培训地图"><button className="map-dismiss" aria-label="关闭地图" onClick={() => setMapVisible(false)}><X/></button><div className="map-heading"><small>TEAM 03 · TRAINING JOURNEY</small><h2>展开我们的足迹</h2><p>点击地图中的四个点位放大查看</p></div><div className={'paper-map supplied-map ' + (active !== null ? 'point-selected' : '')}>
      <div className="map-art" style={{ transformOrigin: active !== null ? mapStops[active].x + '% ' + mapStops[active].y + '%' : '50% 50%' }}>
        <img className="supplied-map-image" src="./assets/map/展开的地图.png" alt="浦发集团四个点位路线地图" draggable={false}/>
        <svg className="map-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path className="route-halo" d="M35.5 22.2 Q51.5 22.8 60 34.5 M67.2 47 Q71 54.5 70.3 60.4 M64 65 Q54 62.3 51.8 57 M44.5 46 Q28 38 29.2 27.5"/><path className="route-line" d="M35.5 22.2 Q51.5 22.8 60 34.5 M67.2 47 Q71 54.5 70.3 60.4 M64 65 Q54 62.3 51.8 57 M44.5 46 Q28 38 29.2 27.5"/></svg>
        {mapStops.map((stop, index) => <button key={stop.title} className={'map-pin image-hotspot ' + (active === index ? 'active' : '')} style={{ left: stop.x + '%', top: stop.y + '%' }} onClick={() => setActive(index)} aria-label={'放大' + stop.title}/>)}
      </div><div className="paper-creases" aria-hidden="true"/><div className="unfold-flap flap-left"/><div className="unfold-flap flap-right"/>
    </div>{active !== null && <div className="point-caption"><b>{mapStops[active].title}</b><button onClick={() => setActive(null)}>返回完整地图 ↗</button></div>}</div>, document.body)}
  </>
}
function Handle() { return <span className="handle"><i/></span> }
function LockerDoor({ number, stickers, className }: { number: string; stickers: string[]; className: string }) { return <div className={'locker '+className}><Vent/><span className="locker-number">{number}</span><span className="door-label">STUDENT<br/>LOCKER</span><div className="stickers">{stickers.map((sticker, index) => <b key={sticker} className={'sticker s'+index}>{sticker}</b>)}</div><Handle/><span className="bottom-vent"><i/><i/><i/></span></div> }
function MemberModal({ member, close }: { member: typeof teamMembers[number]; close: () => void }) { return <div className="member-modal" onClick={close}><article onClick={event => event.stopPropagation()}><button aria-label="关闭" onClick={close}><X/></button><span className="big-lanyard"/><div className="id-photo" style={member.photo ? { backgroundImage: `url(${member.photo})` } : { backgroundColor: member.color }}>{member.photo ? '' : member.initials}</div><div><small>TEAM 03 / IDENTITY CARD</small><h2>{member.name}</h2><b>{member.role}</b><p>{member.note}</p></div></article></div> }
export default App

createRoot(document.getElementById('root')!).render(<App />)
