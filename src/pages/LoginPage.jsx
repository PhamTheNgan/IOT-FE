import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import styles from './Auth.module.css'

const IconWifi = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0114.08 0" /><path d="M1.42 9a16 16 0 0121.16 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
  </svg>
)

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
)

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin.')
      return
    }
    setLoading(true)
    try {
      const res = await authService.login(form.username, form.password)
      const { access_token, refresh_token } = res.data
      localStorage.setItem('access_token', access_token)
      if (refresh_token) localStorage.setItem('refresh_token', refresh_token)
      navigate('/')
    } catch (err) {
      const msg = err.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      {/* Left panel */}
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <div className={styles.panelBrand}>
            <div className={styles.panelIcon}><IconWifi /></div>
            <div>
              <span className={styles.panelBrandName}>IOT Manager</span>
              <span className={styles.panelBrandSub}>Smart Device Control</span>
            </div>
          </div>

          <h2 className={styles.panelTitle}>
            Quản trị thiết bị<br /><span>thông minh</span> tập trung
          </h2>
          <p className={styles.panelDesc}>
            Giám sát, điều khiển và phân tích toàn bộ hệ thống IoT của bạn từ một nền tảng duy nhất.
          </p>

          <div className={styles.panelFeatures}>
            {[
              'Giám sát thiết bị theo thời gian thực',
              'Cảnh báo thông minh & tự động hóa',
              'Phân tích dữ liệu & báo cáo chi tiết',
            ].map((f) => (
              <div key={f} className={styles.panelFeature}>
                <div className={styles.featureIcon}><IconCheck /></div>
                <span className={styles.featureText}>{f}</span>
              </div>
            ))}
          </div>

          <div className={styles.panelStats}>
            <div className={styles.panelStat}><strong>99.9%</strong><span>Uptime</span></div>
            <div className={styles.panelStat}><strong>1,200+</strong><span>Thiết bị</span></div>
            <div className={styles.panelStat}><strong>24/7</strong><span>Giám sát</span></div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className={styles.formSide}>
        <div className={styles.card}>
          <h1 className={styles.title}>Đăng nhập</h1>
          <p className={styles.subtitle}>Chào mừng trở lại! Vui lòng nhập thông tin.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="username">Tên đăng nhập</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><IconUser /></span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Mật khẩu</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><IconLock /></span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : 'Đăng nhập'}
            </button>
          </form>

          <p className={styles.switchText}>
            Chưa có tài khoản?{' '}
            <Link to="/register" className={styles.link}>Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
