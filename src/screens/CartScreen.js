import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItem,
  incrementQty,
  decrementQty,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from '../store/cartSlice';
import { formatPrice } from '../data/products';

export default function CartScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  const handleClearCart = () => {
    Alert.alert(
      'Kosongkan Cart',
      'Yakin ingin menghapus semua item dari cart?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Kosongkan',
          style: 'destructive',
          onPress: () => dispatch(clearCart()),
        },
      ]
    );
  };

  const handleRemoveItem = (id, name) => {
    Alert.alert('Hapus Item', `Hapus "${name}" dari cart?`, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => dispatch(removeItem(id)),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemEmoji}>
        <Text style={styles.emojiText}>{item.emoji}</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)} / unit</Text>
        <View style={styles.qtyCtrl}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch(decrementQty(item.id))}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNum}>{item.qty}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch(incrementQty(item.id))}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.itemTotal}>{formatPrice(item.price * item.qty)}</Text>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => handleRemoveItem(item.id, item.name)}
        >
          <Text style={styles.removeBtnText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Cart masih kosong</Text>
          <Text style={styles.emptySub}>Tambahkan produk dari tab Produk</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
        <Text style={styles.headerSub}>{count} item dipilih</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{formatPrice(total)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClearCart}>
          <Text style={styles.clearText}>Kosongkan Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F6',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  list: {
    padding: 12,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    marginBottom: 10,
  },
  itemEmoji: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F3F0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  emojiText: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  itemPrice: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    marginBottom: 8,
  },
  qtyCtrl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  qtyBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  qtyBtnText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  qtyNum: {
    width: 28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 2,
    minHeight: 60,
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  removeBtn: {
    marginTop: 8,
  },
  removeBtnText: {
    fontSize: 12,
    color: '#E24B4A',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 14,
    color: '#888',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 15,
    color: '#555',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  checkoutBtn: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  clearBtn: {
    borderWidth: 1,
    borderColor: '#E24B4A',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  clearText: {
    color: '#E24B4A',
    fontSize: 14,
    fontWeight: '500',
  },
});
