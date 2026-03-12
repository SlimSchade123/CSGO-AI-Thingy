export function ReelMarker() {
  return (
    <>
      {/* Top triangle */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        style={{
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '14px solid #e4ae39',
          filter: 'drop-shadow(0 0 6px #e4ae3980)',
        }}
      />
      {/* Bottom triangle */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        style={{
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '14px solid #e4ae39',
          filter: 'drop-shadow(0 0 6px #e4ae3980)',
        }}
      />
      {/* Center line */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #e4ae3960, transparent)',
        }}
      />
    </>
  )
}
