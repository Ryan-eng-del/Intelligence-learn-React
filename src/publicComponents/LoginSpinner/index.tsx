import style from './index.module.css'

const LoginSpinner = () => {
  return (
    <div className={style['dot-spinner']}>
      <div className={style['dot-spinner-dot']}></div>
      <div className={style['dot-spinner-dot']}></div>
      <div className={style['dot-spinner-dot']}></div>
      <div className={style['dot-spinner-dot']}></div>
      <div className={style['dot-spinner-dot']}></div>
      <div className={style['dot-spinner-dot']}></div>
      <div className={style['dot-spinner-dot']}></div>
      <div className={style['dot-spinner-dot']}></div>
    </div>
  )
}
export default LoginSpinner
