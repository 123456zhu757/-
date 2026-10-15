import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, Headphones, Music2, Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react'
import './styles.css'

type Member = { name: string; role: string; keyword: string; initials: string; color: string; takeaway: string; contribution: string; letter: string }
const members: Member[] = [
  { name: '林沐晴', role: '项目统筹', keyword: '连接', initials: 'LMQ', color: '#f06445', takeaway: '把不同想法放在同一张地图上，协作才有了方向。', contribution: '推进项目节奏，连接每一个人的声音。', letter: '保持好奇，把问题问到底。' },
  { name: '陈星野', role: '研究分析', keyword: '洞察', initials: 'CXY', color: '#1835d1', takeaway: '数据的意义不在数字本身，而在看见人的需求。', contribution: '梳理调研信息，提炼用户洞察。', letter: '用事实校准直觉。' },
  { name: '许知夏', role: '视觉设计', keyword: '表达', initials: 'XZX', color: '#baff22', takeaway: '好设计是让复杂的内容被一眼理解。', contribution: '建立项目视觉与叙事表达。', letter: '保留那一点不合时宜的热爱。' },
  { name: '周予安', role: '方案策划', keyword: '推演', initials: 'ZYA', color: '#ffbd31', takeaway: '从一个好问题出发，方案才会有生命力。', contribution: '完成策略框架和落地路径。', letter: '先开始，再变好。' },
  { name: '宋言', role: '内容记录', keyword: '故事', initials: 'SY', color: '#f08bba', takeaway: '记录不是复述，而是把瞬间变成共同记忆。', contribution: '记录培训现场与小组故事。', letter: '记住每一次真诚的交流。' },
  { name: '顾北辰', role: '成果展示', keyword: '行动', initials: 'GBC', color: '#77c9de', takeaway: '行动让想法可被验证，也让团队彼此信任。', contribution: '制作成果演示与最终汇报。', letter: '把今天的想法落到明天。' },
]

const folders = [
  { title: '项目成果', code: '01 / PROJECT', color: '#baff22', body: '从问题定义到最终方案，我们完成了小组的第一次共创。', tags: ['明确目标', '用户洞察', '可行方案'] },
  { title: '培训学习', code: '02 / LEARNING', color: '#1835d1', body: '把课程、工具和讨论装进工作方法里，带回真实的工作现场。', tags: ['结构化思考', '表达协作', '复盘迭代'] },
  { title: '团队协作', code: '03 / TOGETHER', color: '#f06445', body: '六种不同的视角，组成了同一张更完整的答案。', tags: ['共同目标', '开放反馈', '彼此成就'] },
]

const photos = ['破冰时刻', '第一次共创', '白板上的问题', '午后讨论', '方案成形', '最后合影']

function App() {
  const [started, setStarted] = useState(false)
  const [openLocker, setOpenLocker] = useState<number | null>(null)
  const [cardBack, setCardBack] = useState(false)
  const [folder, setFolder] = useState<number | null>(null)
  const [gallery, setGallery] = useState(false)
  const [photo, setPhoto] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const audio = useRef<HTMLAudioElement>(null)
  const close = () => { setOpenLocker(null); setCardBack(false) }
  useEffect(() => { if (!audio.current) return; playing ? audio.current.play().catch(() => setPlaying(false)) : audio.current.pause() }, [playing])
  return <main>
    <audio ref={audio} src="/assets/training-memory.mp3" muted={muted} onEnded={() => setPlaying(false)} />
    {!started && <section className="intro"><span className="tiny">新人培训项目汇报 · 第六小组</span><h1>OPEN THE<br/><i>LOCKER</i></h1><div className="intro-bottom"><span>OUR FIRST PROJECT<br/>STARTS HERE</span><button onClick={() => setStarted(true)}>打开储物柜 <ChevronRight size={18}/></button><b>100%<small>READY</small></b></div></section>}
    {started && <>
      <header><button className="brand" onClick={() => setStarted(false)}>THE SIX <em>LOCKER</em></button><nav><a href="#lockers">成员 ID</a><button onClick={() => setFolder(0)}>项目档案</button><button onClick={() => setGallery(true)}>培训相册</button></nav><span className="stamp">TRAINING<br/>2026</span></header>
      <section id="lockers" className="hero"><div className="hero-copy"><span>WELCOME TO</span><h2>我们的新人<br/><i>储物柜</i></h2><p>点击每一扇柜门，认识和你一起完成第一次项目的伙伴。</p></div><div className="lockers">
        {members.map((m, i) => <button className={'locker l'+i} key={m.name} onClick={() => setOpenLocker(i)} aria-label={`打开${m.name}的储物柜`}><div className="vents">≡<br/>≡</div><div className="locker-tag"><b>{String(i+1).padStart(2,'0')}</b><span>{m.name}</span></div><div className="sticker" style={{background:m.color}}>{m.keyword}</div><div className="polaroid">{m.initials}<small>新人培训</small></div><div className="handle"/></button>)}
      </div><p className="hint">CLICK A LOCKER TO OPEN</p></section>
      <section className="archive"><div className="archive-title"><span>TEAM ARCHIVE</span><h2>把收获<br/>装进<strong>档案夹</strong></h2></div><div className="folder-row">{folders.map((f, i) => <button key={f.title} className="folder" style={{background:f.color}} onClick={() => setFolder(i)}><small>{f.code}</small><b>{f.title}</b><span>OPEN ↗</span></button>)}</div></section>
      <section className="memory"><div><span>TRAINING ARCHIVE</span><h2>翻开我们的<br/><i>共同记忆</i></h2><button onClick={() => setGallery(true)}>打开相册 <BookOpen size={18}/></button></div><div className="photo-stack" onClick={() => setGallery(true)}>{photos.slice(0,3).map((p,i) => <article key={p} className={'photo p'+i}><div className="photo-fill">{i===0?'✦':'●'}</div><b>{p}</b><small>2026.10</small></article>)}</div></section>
      <section className="player"><div className={'record '+(playing?'spin':'')}><span/></div><div className="track"><small>VOICE ARCHIVE / 01</small><b>我们的培训回忆</b><div className="progress"><i/></div></div><button aria-label="播放或暂停" onClick={() => setPlaying(!playing)}>{playing?<Pause fill="currentColor"/>:<Play fill="currentColor"/>}</button><button aria-label="静音" onClick={() => setMuted(!muted)}>{muted?<VolumeX/>:<Volume2/>}</button><span className="replace">请替换为 assets/training-memory.mp3</span></section>
      <footer><span>TRAINING ENDS, OUR STORY STARTS</span><h2>把第一次<br/>一起做到更好</h2><button onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>回到储物柜 <RotateCcw size={16}/></button></footer>
    </>}
    {openLocker !== null && <LockerModal member={members[openLocker]} index={openLocker} back={cardBack} setBack={setCardBack} close={close}/>} 
    {folder !== null && <FolderModal folder={folders[folder]} close={() => setFolder(null)}/>} 
    {gallery && <GalleryModal photo={photo} setPhoto={setPhoto} close={() => setGallery(false)}/>} 
  </main>
}

function LockerModal({member,index,back,setBack,close}:{member:Member;index:number;back:boolean;setBack:(x:boolean)=>void;close:()=>void}) { return <div className="modal locker-modal"><button className="close" onClick={close}><X/></button><div className="inside"><span className="inside-label">LOCKER {String(index+1).padStart(2,'0')}</span><div className="id-wrap"><button className={'id-card '+(back?'back':'')} onClick={() => setBack(!back)}><div className="id-front"><span className="clip"/><small>NEW TALENT ID</small><div className="avatar" style={{background:member.color}}>{member.initials}</div><h3>{member.name}</h3><p>{member.role}</p><strong>{member.keyword}</strong><i>点击翻面</i></div><div className="id-back"><small>TRAINING NOTE</small><p>“{member.takeaway}”</p><hr/><b>我的贡献</b><span>{member.contribution}</span><hr/><b>给未来的自己</b><span>{member.letter}</span><i>点击翻回正面</i></div></button></div><div className="inside-props"><span className="note">FIRST<br/>DAY ✦</span><span className="badge">TEAM<br/>SIX</span><span className="tape">新人培训<br/>2026</span></div></div></div> }
function FolderModal({folder,close}:{folder:typeof folders[number];close:()=>void}) { return <div className="modal"><button className="close" onClick={close}><X/></button><article className="detail-paper"><small>{folder.code}</small><h2>{folder.title}</h2><p>{folder.body}</p><div>{folder.tags.map(t=><span key={t}>{t}</span>)}</div><hr/><b>在这里替换为你们的项目背景、过程、成果数据和复盘内容。</b></article></div> }
function GalleryModal({photo,setPhoto,close}:{photo:number;setPhoto:(n:number)=>void;close:()=>void}) { return <div className="modal"><button className="close" onClick={close}><X/></button><section className="album"><small>TRAINING PHOTO ALBUM · {String(photo+1).padStart(2,'0')} / 06</small><div className="album-photo"><span>在这里放入<br/>培训照片</span></div><h2>{photos[photo]}</h2><p>把真实照片放入 <code>public/assets/gallery</code> 后，在代码中替换此占位区域。</p><div className="album-controls"><button onClick={()=>setPhoto((photo+5)%6)}><ArrowLeft/></button><button onClick={()=>setPhoto((photo+1)%6)}><ArrowRight/></button></div></section></div> }
export default App
