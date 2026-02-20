export function DotGridBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.3,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#050505] opacity-80" />
    </div>
  )
}
