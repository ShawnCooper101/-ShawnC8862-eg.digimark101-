export default function Navigation() {
  const navLinks = [
    { name: 'Home', href: '/', external: false },
    { name: 'AI Assistant', href: '/', external: false },
    { name: 'Shop', href: 'https://digimark101.shop', external: true },
    { name: 'Resources', href: 'https://digimark101.info', external: true },
    { name: 'Software', href: 'https://app.allinonemarketing.com', external: true },
  ];

  return (
    <nav style={{
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target={link.external ? '_blank' : '_self'}
          rel={link.external ? 'noopener noreferrer' : undefined}
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
        >
          {link.name}
          {link.external && <span style={{ fontSize: '10px' }}>↗</span>}
        </a>
      ))}
    </nav>
  );
}
