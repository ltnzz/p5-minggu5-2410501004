import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  incrementQty,
  decrementQty,
  selectCartItems,
} from "../store/cartSlice";
import { PRODUCTS, formatPrice } from "../data/products";

export default function ProductListScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const getCartItem = (id) => cartItems.find((i) => i.id === id);

  const renderProduct = ({ item }) => {
    const cartItem = getCartItem(item.id);
    const inCart = !!cartItem;

    return (
      <View style={styles.card}>
        <View style={styles.emojiBox}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>
        <View style={styles.actions}>
          {inCart ? (
            <View style={styles.qtyCtrl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => dispatch(decrementQty(item.id))}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{cartItem.qty}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => dispatch(incrementQty(item.id))}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => dispatch(addItem(item))}
            >
              <Text style={styles.addBtnText}>+ Tambah</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Toko Online</Text>
        <Text style={styles.headerSub}>{PRODUCTS.length} produk tersedia</Text>
      </View>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F6",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  headerSub: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  list: {
    padding: 12,
    gap: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    marginBottom: 10,
  },
  emojiBox: {
    width: 52,
    height: 52,
    backgroundColor: "#F3F3F0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  emoji: {
    fontSize: 26,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  category: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    color: "#999",
    lineHeight: 17,
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  actions: {
    marginLeft: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingTop: 4,
  },
  addBtn: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  qtyCtrl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    overflow: "hidden",
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  qtyBtnText: {
    fontSize: 18,
    color: "#1A1A1A",
    fontWeight: "400",
  },
  qtyNum: {
    width: 28,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});
