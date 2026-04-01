export const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 450000,
    category: 'Audio',
    emoji: '🎧',
    description: 'Headphone nirkabel dengan noise cancelling',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 850000,
    category: 'Peripherals',
    emoji: '⌨️',
    description: 'Keyboard mekanikal RGB dengan switch blue',
  },
  {
    id: 3,
    name: 'USB-C Hub',
    price: 320000,
    category: 'Accessories',
    emoji: '🔌',
    description: 'Hub 7-in-1 dengan HDMI dan USB 3.0',
  },
  {
    id: 4,
    name: 'Webcam HD 1080p',
    price: 580000,
    category: 'Camera',
    emoji: '📷',
    description: 'Webcam full HD untuk video call profesional',
  },
  {
    id: 5,
    name: 'Mouse Ergonomic',
    price: 275000,
    category: 'Peripherals',
    emoji: '🖱️',
    description: 'Mouse ergonomis wireless silent click',
  },
  {
    id: 6,
    name: 'Monitor Stand',
    price: 195000,
    category: 'Accessories',
    emoji: '🖥️',
    description: 'Stand monitor adjustable dengan cable management',
  },
  {
    id: 7,
    name: 'Laptop Sleeve 14"',
    price: 145000,
    category: 'Accessories',
    emoji: '💼',
    description: 'Sleeve laptop waterproof ukuran 14 inci',
  },
  {
    id: 8,
    name: 'LED Desk Lamp',
    price: 230000,
    category: 'Lighting',
    emoji: '💡',
    description: 'Lampu meja LED dengan pengaturan kecerahan',
  },
];

export const formatPrice = (price) =>
  'Rp ' + price.toLocaleString('id-ID');
