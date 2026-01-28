function StagingMessage() {
  const isOneCloud = window.location.href.includes('cwd-sidekick')

  if (isOneCloud) {
    return (
      <div
        style={{
          padding: '8px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#000',
          backgroundColor: '#ffbebe',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        <div>このページはModuleNaviのステージング環境です。</div>
        <div>
          コーディングの際は
          <a
            style={{ textDecoration: 'underline' }}
            href='https://kakunin.rakuten.ne.jp/public_access/ichiba/cwd/reference/latest/'
          >
            kakunin
          </a>
          サーバーを使用してください。
        </div>
      </div>
    )
  }

  return null
}

export default StagingMessage
