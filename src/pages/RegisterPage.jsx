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

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
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

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.email || !form.password || !form.confirm) {
      setError('Vui lòng nhập đầy đủ thông tin.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Email không hợp lệ.')
      return
    }
    if (form.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }
    setLoading(true)
    try {
      await authService.register(form.username, form.email, form.password)
      setSuccess('Đăng ký thành công! Chuyển đến trang đăng nhập...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
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
            Bắt đầu quản lý<br />thiết bị <span>thông minh</span>
          </h2>
          <p className={styles.panelDesc}>
            Tạo tài khoản và kết nối toàn bộ hệ sinh thái IoT của bạn chỉ trong vài phút.
          </p>

          <div className={styles.panelFeatures}>
            {[
              'Kết nối không giới hạn thiết bị',
              'Bảng điều khiển trực quan, dễ dùng',
              'Bảo mật dữ liệu theo chuẩn enterprise',
            ].map((f) => (
              <div key={f} className={styles.panelFeature}>
                <div className={styles.featureIcon}><IconCheck /></div>
                <span className={styles.featureText}>{f}</span>
              </div>
            ))}
          </div>

          <div className={styles.panelStats}>
            <div className={styles.panelStat}><strong>Free</strong><span>Bắt đầu</span></div>
            <div className={styles.panelStat}><strong>5 phút</strong><span>Thiết lập</span></div>
            <div className={styles.panelStat}><strong>Miễn phí</strong><span>Dùng thử</span></div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className={styles.formSide}>
        <div className={styles.card}>
          <h1 className={styles.title}>Tạo tài khoản</h1>
          <p className={styles.subtitle}>Đăng ký để bắt đầu sử dụng hệ thống.</p>

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
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><IconMail /></span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
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
                  placeholder="Ít nhất 6 ký tự"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="confirm">Xác nhận mật khẩu</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><IconLock /></span>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={form.confirm}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.successMsg}>{success}</p>}

            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : 'Tạo tài khoản'}
            </button>
          </form>

          <p className={styles.switchText}>
            Đã có tài khoản?{' '}
            <Link to="/login" className={styles.link}>Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
