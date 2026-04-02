import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const products = [
  {id: '1', title: '便携咖啡机套装', price: '¥299', badge: '限时优惠'},
  {id: '2', title: '降噪头戴耳机', price: '¥899', badge: '口碑热销'},
  {id: '3', title: '轻量通勤双肩包', price: '¥239', badge: '新品'},
  {id: '4', title: '桌面香薰加湿器', price: '¥129', badge: '居家好物'},
];

const categories = ['品牌特卖', '数码', '家居', '服饰', '超市'];

const ShoppingPage: React.FC = () => {
  return (
    <PageScaffold navMode="native" title="购物" backgroundColor="#F6F1EE">
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerMeta}>
            <Text style={styles.subtitle}>天天好价 · 朋友常买 · 限时补贴</Text>
          </View>

          <View style={styles.banner}>
            <Text style={styles.bannerEyebrow}>618 预热专场</Text>
            <Text style={styles.bannerTitle}>今晚 8 点开启满减补贴</Text>
            <Text style={styles.bannerHint}>跨店每满 300 减 50，品牌券可叠加</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}>
            {categories.map(category => (
              <View key={category} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.grid}>
            {products.map(product => (
              <View key={product.id} style={styles.productCard}>
                <Image
                  source={{uri: `https://picsum.photos/seed/shop_${product.id}/320/240`}}
                  style={styles.productImage}
                />
                <Text style={styles.productBadge}>{product.badge}</Text>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </PageScaffold>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F6F1EE'},
  headerMeta: {paddingHorizontal: 16, paddingTop: 8},
  subtitle: {marginTop: 8, fontSize: 14, color: '#8A7068'},
  banner: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 28,
    backgroundColor: '#E75A5A',
  },
  bannerEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFE7E7',
    letterSpacing: 1,
  },
  bannerTitle: {
    marginTop: 10,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#fff',
  },
  bannerHint: {marginTop: 10, fontSize: 14, color: '#FFECEC'},
  categoryRow: {paddingHorizontal: 16, paddingVertical: 16, gap: 10},
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  categoryText: {fontSize: 14, color: '#6E534A', fontWeight: '600'},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  productCard: {
    width: '48.4%',
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
  },
  productImage: {width: '100%', height: 126, borderRadius: 14},
  productBadge: {marginTop: 10, fontSize: 11, fontWeight: '700', color: '#E75A5A'},
  productTitle: {marginTop: 6, fontSize: 15, lineHeight: 21, color: '#251D1A'},
  productPrice: {marginTop: 10, fontSize: 18, fontWeight: '800', color: '#E75A5A'},
});

export default ShoppingPage;
