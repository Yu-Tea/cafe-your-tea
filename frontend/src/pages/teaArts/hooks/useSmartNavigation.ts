import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const useSmartNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    const checkCanGoBack = () => {
      // ブラウザの履歴をチェック
      const hasHistory = window.history.length > 1

      // 同一ドメインからの遷移かをチェック
      const hasInternalReferrer = document.referrer && 
        new URL(document.referrer).origin === window.location.origin

      // sessionStorageでの履歴管理
      const hasInternalNavigation = sessionStorage.getItem('internal_nav') === 'true'

      // 4. React Routerのstateをチェック
      const hasRouterState = location.state?.from

      setCanGoBack(
        hasHistory && (hasInternalReferrer || hasInternalNavigation || hasRouterState)
      )
    }

    checkCanGoBack()

    // 内部遷移フラグを設定
    sessionStorage.setItem('internal_nav', 'true')
  }, [location])

  const goBack = () => {
    if (canGoBack) {
      navigate(-1) // React Routerの戻る機能
    } else {
      navigate('/') // トップページへ
    }
  }

  return {
    canGoBack,
    goBack,
    buttonText: canGoBack ? '戻る' : 'TOPページ',
  }
}