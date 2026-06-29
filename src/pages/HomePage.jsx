import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import styles from './Home.module.css'

/* ── Icons ── */
const IcDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
)
const IcDevices = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>
)
const IcAlerts = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
)
const IcAnalytics = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)
const IcSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
)
const IcLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)
const IcWifi = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0114.08 0" /><path d="M1.42 9a16 16 0 0121.16 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
  </svg>
)
const IcRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
)
const IcShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IcUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)

/* ── Nav config ── */
const NAV = [
  { key: 'dashboard', label: 'Tổng quan', Icon: IcDashboard },
  { key: 'devices',   label: 'Thiết bị',  Icon: IcDevices },
  { key: 'alerts',    label: 'Cảnh báo',  Icon: IcAlerts },
  { key: 'analytics', label: 'Phân tích', Icon: IcAnalytics },
  { key: 'settings',  label: 'Cài đặt',   Icon: IcSettings },
]

/* ── Mock data ── */
const STATS = [
  { label: 'Tổng thiết bị', value: '24', sub: '+3 tháng này',    color: '#2563eb', bg: '#eff6ff' },
  { label: 'Đang online',   value: '19', sub: '79.2% hoạt động', color: '#10b981', bg: '#f0fdf4' },
  { label: 'Offline',       value: '5',  sub: '2 cần xử lý',     color: '#ef4444', bg: '#fef2f2' },
  { label: 'Cảnh báo',      value: '3',  sub: '1 nghiêm trọng',  color: '#f59e0b', bg: '#fffbeb' },
]

const DEVICES = [
  { id: 'IOT-001', name: 'Cảm biến nhiệt độ P1', type: 'Sensor',  location: 'Tầng 1 – P.A101', status: 'online',  signal: 92 },
  { id: 'IOT-002', name: 'Camera an ninh HLW',   type: 'Camera',  location: 'Lối vào chính',   status: 'online',  signal: 87 },
  { id: 'IOT-003', name: 'Cổng Gateway chính',   type: 'Gateway', location: 'Phòng máy chủ',   status: 'online',  signal: 99 },
  { id: 'IOT-004', name: 'Cảm biến độ ẩm P2',    type: 'Sensor',  location: 'Tầng 2 – P.B205', status: 'offline', signal: 0  },
  { id: 'IOT-005', name: 'Đèn thông minh L3',    type: 'Light',   location: 'Hành lang B',      status: 'online',  signal: 78 },
  { id: 'IOT-006', name: 'Khóa điện tử KĐT-1',   type: 'Lock',    location: 'Cửa chính',        status: 'warning', signal: 45 },
]

const ACTIVITY = [
  { type: 'warning', msg: 'IOT-006 tín hiệu yếu (45%)',      time: '5 phút trước' },
  { type: 'offline', msg: 'IOT-004 mất kết nối',             time: '2 giờ trước'  },
  { type: 'online',  msg: 'IOT-003 kết nối lại thành công',  time: '3 giờ trước'  },
  { type: 'warning', msg: 'Nhiệt độ P.A101 cao bất thường',  time: '5 giờ trước'  },
  { type: 'online',  msg: 'IOT-005 đã thêm vào hệ thống',    time: 'Hôm qua'      },
]

const STATUS_MAP = {
  online:  { label: 'Online',   cls: 'statusOnline'  },
  offline: { label: 'Offline',  cls: 'statusOffline' },
  warning: { label: 'Cảnh báo', cls: 'statusWarning' },
}

const ACTIVITY_COLORS = { online: '#10b981', offline: '#ef4444', warning: '#f59e0b' }

/* ── Helpers ── */
const FIELD_LABELS = {
  id:          'ID tài khoản',
  username:    'Tên đăng nhập',
  email:       'Email',
  role:        'Vai trò',
  fullName:    'Họ và tên',
  phone:       'Số điện thoại',
  createdAt:   'Ngày tạo',
  updatedAt:   'Cập nhật lần cuối',
  lastLogin:   'Đăng nhập lần cuối',
  status:      'Trạng thái tài khoản',
  isActive:    'Kích hoạt',
  isVerified:  'Đã xác thực',
}

const formatFieldValue = (key, val) => {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'boolean') return val ? 'Có' : 'Không'
  if (typeof val === 'object') return JSON.stringify(val)
  const s = String(val)
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s)) {
    try {
      return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(s))
    } catch { return s }
  }
  return s
}

const timeAgo = (ms) => {
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'vừa xong'
  if (mins < 60) return `${mins} phút trước`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} giờ trước`
  return `${Math.floor(hrs / 24)} ngày trước`
}

/* ── Component ── */
export default function HomePage() {
  const navigate  = useNavigate()
  const [user, setUser]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [reloading, setReload]  = useState(false)
  const [activeNav, setNav]     = useState('dashboard')

  const fetchUser = useCallback(async (showReload = false) => {
    if (showReload) setReload(true)
    try {
      const res = await authService.getMe()
      setUser(res.data)
    } catch {
      authService.logout()
      navigate('/login')
    } finally {
      setLoading(false)
      setReload(false)
    }
  }, [navigate])

  useEffect(() => { fetchUser() }, [fetchUser])

  const handleLogout = () => { authService.logout(); navigate('/login') }

  if (loading) {
    return (
      <div className={styles.loadWrap}>
        <span className={styles.spinner} />
      </div>
    )
  }

  const initials = user?.username?.[0]?.toUpperCase() ?? 'U'
  const accessToken  = localStorage.getItem('access_token') ?? ''
  const hasRefresh   = !!localStorage.getItem('refresh_token')
  const refreshedAt  = localStorage.getItem('token_refreshed_at')
  const tokenPreview = accessToken ? `${accessToken.slice(0, 24)}...` : '—'

  return (
    <div className={styles.layout}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.sidebarBrand}>
            <div className={styles.sidebarLogo}><IcWifi /></div>
            <div>
              <span className={styles.sidebarBrandName}>IOT Manager</span>
              <span className={styles.sidebarBrandSub}>v2.0</span>
            </div>
          </div>

          <nav className={styles.nav}>
            {NAV.map(({ key, label, Icon }) => (
              <button
                key={key}
                className={`${styles.navItem} ${activeNav === key ? styles.navActive : ''}`}
                onClick={() => setNav(key)}
              >
                <span className={styles.navIcon}><Icon /></span>
                <span>{label}</span>
                {key === 'alerts' && <span className={styles.navBadge}>3</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.sidebarUser}>
          <div className={styles.sidebarAvatar}>{initials}</div>
          <div className={styles.sidebarUserInfo}>
            <span className={styles.sidebarUsername}>{user?.username ?? 'User'}</span>
            <span className={styles.sidebarRole}>{user?.role ?? 'Administrator'}</span>
          </div>
          <button className={styles.sidebarLogoutBtn} onClick={handleLogout} title="Đăng xuất">
            <IcLogout />
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.mainWrap}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>
              {NAV.find(n => n.key === activeNav)?.label ?? 'Tổng quan'}
            </h1>
            <p className={styles.pageSub}>Thứ Hai, 29 tháng 6 năm 2026</p>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.systemBadge}>
              <span className={styles.systemDot} />
              Hệ thống hoạt động
            </div>
            <div className={styles.topbarAvatar}>{initials}</div>
          </div>
        </header>

        <main className={styles.content}>

          {/* ══ DASHBOARD ══ */}
          {activeNav === 'dashboard' && (
            <>
              <div className={styles.statsGrid}>
                {STATS.map((s) => (
                  <div key={s.label} className={styles.statCard} style={{ '--accent': s.color, '--accent-bg': s.bg }}>
                    <div className={styles.statTop}>
                      <span className={styles.statLabel}>{s.label}</span>
                      <div className={styles.statIconWrap}><span className={styles.statDot} /></div>
                    </div>
                    <p className={styles.statValue}>{s.value}</p>
                    <p className={styles.statSub}>{s.sub}</p>
                    <div className={styles.statBar} />
                  </div>
                ))}
              </div>

              <div className={styles.contentGrid}>
                {/* Device table */}
                <div className={styles.tableCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Thiết bị gần đây</h3>
                    <button className={styles.cardAction} onClick={() => setNav('devices')}>Xem tất cả</button>
                  </div>
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Thiết bị</th><th>Loại</th><th>Vị trí</th>
                          <th>Tín hiệu</th><th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DEVICES.map((d) => {
                          const st = STATUS_MAP[d.status]
                          return (
                            <tr key={d.id}>
                              <td>
                                <div className={styles.deviceName}>{d.name}</div>
                                <div className={styles.deviceId}>{d.id}</div>
                              </td>
                              <td><span className={styles.typeTag}>{d.type}</span></td>
                              <td className={styles.locationCell}>{d.location}</td>
                              <td>
                                <div className={styles.signalWrap}>
                                  <div className={styles.signalBar}>
                                    <div
                                      className={styles.signalFill}
                                      style={{
                                        width: `${d.signal}%`,
                                        background: d.signal > 70 ? '#10b981' : d.signal > 30 ? '#f59e0b' : '#ef4444',
                                      }}
                                    />
                                  </div>
                                  <span className={styles.signalPct}>{d.signal}%</span>
                                </div>
                              </td>
                              <td>
                                <span className={`${styles.statusBadge} ${styles[st.cls]}`}>{st.label}</span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Activity */}
                <div className={styles.activityCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Hoạt động</h3>
                    <button className={styles.cardAction} onClick={() => setNav('alerts')}>Xem tất cả</button>
                  </div>
                  <div className={styles.activityList}>
                    {ACTIVITY.map((a, i) => (
                      <div key={i} className={styles.activityItem}>
                        <span className={styles.activityDot} style={{ background: ACTIVITY_COLORS[a.type] }} />
                        <div className={styles.activityBody}>
                          <p className={styles.activityMsg}>{a.msg}</p>
                          <p className={styles.activityTime}>{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══ SETTINGS / PROFILE ══ */}
          {activeNav === 'settings' && (
            <div className={styles.settingsWrap}>
              {/* Profile card */}
              <div className={styles.profileCard}>
                <div className={styles.profileCardHeader}>
                  <div className={styles.profileAvatarLg}>{initials}</div>
                  <div>
                    <h2 className={styles.profileName}>{user?.username ?? '—'}</h2>
                    <span className={styles.profileRoleBadge}>{user?.role ?? 'User'}</span>
                  </div>
                  <button
                    className={styles.reloadBtn}
                    onClick={() => fetchUser(true)}
                    disabled={reloading}
                    title="Tải lại thông tin"
                  >
                    <span className={reloading ? styles.spinning : ''}><IcRefresh /></span>
                    {reloading ? 'Đang tải...' : 'Làm mới'}
                  </button>
                </div>

                <div className={styles.sectionLabel}>
                  <IcUser />
                  Thông tin tài khoản <small>từ API /auth/me</small>
                </div>

                <div className={styles.profileGrid}>
                  {user && Object.entries(user).map(([key, val]) => (
                    <div key={key} className={styles.profileField}>
                      <span className={styles.profileFieldKey}>
                        {FIELD_LABELS[key] || key}
                      </span>
                      <span className={styles.profileFieldVal} title={String(val)}>
                        {formatFieldValue(key, val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session card */}
              <div className={styles.sessionCard}>
                <div className={styles.sectionLabel}>
                  <IcShield />
                  Phiên & Token
                </div>

                <div className={styles.sessionRows}>
                  <div className={styles.sessionRow}>
                    <span className={styles.sessionKey}>Trạng thái phiên</span>
                    <span className={styles.sessionActive}>
                      <span className={styles.sessionDot} /> Đang hoạt động
                    </span>
                  </div>

                  <div className={styles.sessionRow}>
                    <span className={styles.sessionKey}>Access Token</span>
                    <code className={styles.tokenPreview}>{tokenPreview}</code>
                  </div>

                  <div className={styles.sessionRow}>
                    <span className={styles.sessionKey}>Refresh Token</span>
                    <span className={hasRefresh ? styles.sessionActive : styles.sessionInactive}>
                      {hasRefresh ? '✓ Đã lưu' : '✗ Không có'}
                    </span>
                  </div>

                  {refreshedAt && (
                    <div className={styles.sessionRow}>
                      <span className={styles.sessionKey}>Token làm mới lần cuối</span>
                      <span className={styles.sessionVal}>{timeAgo(Number(refreshedAt))}</span>
                    </div>
                  )}

                  <div className={styles.sessionRow}>
                    <span className={styles.sessionKey}>Cơ chế tự động</span>
                    <span className={styles.sessionActive}>✓ Auto-refresh bật</span>
                  </div>
                </div>

                <div className={styles.sessionNote}>
                  Khi access token hết hạn (HTTP 401), hệ thống tự động dùng refresh token để lấy token mới và retry request gốc — không cần đăng nhập lại.
                </div>

                <button className={styles.logoutFullBtn} onClick={handleLogout}>
                  <IcLogout /> Đăng xuất
                </button>
              </div>
            </div>
          )}

          {/* ══ OTHER NAV (placeholder) ══ */}
          {activeNav !== 'dashboard' && activeNav !== 'settings' && (
            <div className={styles.comingSoon}>
              <div className={styles.comingSoonIcon}>
                {activeNav === 'devices'   && <IcDevices />}
                {activeNav === 'alerts'    && <IcAlerts />}
                {activeNav === 'analytics' && <IcAnalytics />}
              </div>
              <h2>{NAV.find(n => n.key === activeNav)?.label}</h2>
              <p>Tính năng đang được phát triển.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
