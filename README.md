# ECommerce Cart - Redux Toolkit

Praktikum Pengayaan: E-Commerce Cart dengan Redux Toolkit

## Struktur Project

```
ECommerceCart/
├── App.js                        # Entry point + Navigator + Provider
├── package.json
└── src/
    ├── data/
    │   └── products.js           # Dummy data produk
    ├── screens/
    │   ├── ProductListScreen.js  # Screen daftar produk
    │   └── CartScreen.js         # Screen cart
    └── store/
        ├── store.js              # configureStore + redux-persist
        └── cartSlice.js          # createSlice: actions + selectors
```

## Fitur

### Fitur Wajib
- Menampilkan daftar produk (dummy data)
- Tambah produk ke cart (`addItem`)
- Hapus produk dari cart (`removeItem`)
- Kosongkan cart (`clearCart`)
- Total harga otomatis update

### Bonus (+20)
- Quantity increment/decrement di product list dan cart
- Badge jumlah item di tab Cart
- Persist state ke AsyncStorage via `redux-persist`

## Cara Install & Jalankan

```bash
# 1. Clone repo
git clone <repo-url>
cd ECommerceCart

# 2. Install dependencies
npm install

# 3. Jalankan
npx expo start
```

Scan QR code dengan Expo Go di HP, atau tekan `a` untuk Android emulator / `i` untuk iOS simulator.

## Redux State

```
store
└── cart (persisted ke AsyncStorage)
    └── items: [
          { id, name, price, emoji, category, description, qty }
        ]
```

### Actions
| Action | Payload | Keterangan |
|---|---|---|
| `addItem` | product object | Tambah atau increment qty |
| `removeItem` | id | Hapus item dari cart |
| `incrementQty` | id | +1 qty item |
| `decrementQty` | id | -1 qty, hapus jika qty = 1 |
| `clearCart` | - | Kosongkan seluruh cart |

### Selectors
| Selector | Return | Keterangan |
|---|---|---|
| `selectCartItems` | array | Semua item di cart |
| `selectCartTotal` | number | Total harga |
| `selectCartCount` | number | Total qty item |
