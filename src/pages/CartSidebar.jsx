export default function CartSidebar({ isOpen, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: isOpen ? '320px' : 0,
        transition: 'width 200ms ease',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: 'rgba(0,0,0,0.2) 0 0 20px',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #eee' }}>
        <strong>Cart</strong>
        <button onClick={onClose} aria-label="Close cart">✕</button>
      </div>
      <div style={{ padding: '1rem' }}>
        <p>Your cart is empty.</p>
      </div>
    </div>
  )
}
