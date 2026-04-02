import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import PageScaffold from '../../../../shared/ui/PageScaffold';

const products = [
  {id: '1', title: '便携咖啡机套装', price: '¥299', badge: '限时优惠'},
  {id: '2', title: '降噪头戴耳机', price: '¥899', badge: '口碑热销'},
  {id: '3', title: '轻量通勤双肩包', price: '¥239', badge: '新品'},
  {id: '4', title: '桌面香薰加湿器', price: '¥129', badge: '居家好物'},
  {id: '5', title: '氛围桌灯礼盒', price: '¥179', badge: '朋友常买'},
  {id: '6', title: '便携电煮杯', price: '¥159', badge: '补贴中'},
  {id: '7', title: '护肩按摩披肩', price: '¥269', badge: '今晚热卖'},
  {id: '8', title: '磁吸充电宝', price: '¥219', badge: '数码精选'},
];

const hotList = [
  {id: '1', title: '厨房收纳五件套', desc: '朋友复购率最高', price: '¥89'},
  {id: '2', title: '蓝牙白噪音音箱', desc: '睡前场景卖得很好', price: '¥149'},
  {id: '3', title: '通勤短风衣', desc: '这周收藏增长最快', price: '¥329'},
];

const categories = ['品牌特卖', '数码', '家居', '服饰', '超市'];

const ShoppingPage: React.FC = () => {
  return (
    <PageScaffold navMode="native" title="购物" backgroundColor="#F5F1EA">
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.heroEyebrow}>好友都在买</Text>
            <Text style={styles.heroTitle}>今晚 8 点，先把想要的加入清单</Text>
            <Text style={styles.heroHint}>高频囤货、朋友常买和限时补贴放在同一屏，像逛一个被编辑过的买手店。</Text>
            <View style={styles.heroPromo}>
              <View>
                <Text style={styles.heroPromoLabel}>618 预热专场</Text>
                <Text style={styles.heroPromoValue}>每满 300 减 50</Text>
              </View>
              <Text style={styles.heroPromoTime}>今晚 20:00</Text>
            </View>
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

          <View style={styles.storyRow}>
            <View style={styles.storyCardWarm}>
              <Text style={styles.storyLabel}>朋友常买</Text>
              <Text style={styles.storyTitle}>办公桌面焕新</Text>
            </View>
            <View style={styles.storyCardDark}>
              <Text style={styles.storyLabelDark}>限时补贴</Text>
              <Text style={styles.storyTitleDark}>数码 24 小时闪促</Text>
            </View>
          </View>

          <View style={styles.hotSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>热卖清单</Text>
              <Text style={styles.sectionHint}>今晚大家加购最多</Text>
            </View>
            {hotList.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.hotItem,
                  index !== hotList.length - 1 && styles.hotItemBorder,
                ]}>
                <View style={styles.hotRank}>
                  <Text style={styles.hotRankText}>{index + 1}</Text>
                </View>
                <View style={styles.hotCopy}>
                  <Text style={styles.hotTitle}>{item.title}</Text>
                  <Text style={styles.hotDesc}>{item.desc}</Text>
                </View>
                <Text style={styles.hotPrice}>{item.price}</Text>
              </View>
            ))}
          </View>

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
  container: {flex: 1, backgroundColor: '#F5F1EA'},
  hero: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 22,
    borderRadius: 30,
    backgroundColor: '#E56B62',
  },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFE7E7',
    letterSpacing: 1,
  },
  heroTitle: {
    marginTop: 10,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: '#fff',
  },
  heroHint: {marginTop: 10, fontSize: 14, lineHeight: 21, color: '#FFECEC'},
  heroPromo: {
    marginTop: 18,
    padding: 16,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroPromoLabel: {fontSize: 11, fontWeight: '700', color: '#FFEAEA', letterSpacing: 1},
  heroPromoValue: {marginTop: 6, fontSize: 19, fontWeight: '800', color: '#FFFFFF'},
  heroPromoTime: {fontSize: 13, fontWeight: '700', color: '#FFF3F3'},
  categoryRow: {paddingHorizontal: 16, paddingVertical: 16, gap: 10},
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFF8F2',
  },
  categoryText: {fontSize: 14, color: '#6E534A', fontWeight: '600'},
  storyRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  storyCardWarm: {
    flex: 1,
    padding: 16,
    borderRadius: 22,
    backgroundColor: '#F3D8BE',
  },
  storyCardDark: {
    flex: 1,
    padding: 16,
    borderRadius: 22,
    backgroundColor: '#332B2A',
  },
  storyLabel: {fontSize: 11, fontWeight: '800', color: '#9B5A42', letterSpacing: 1},
  storyTitle: {marginTop: 10, fontSize: 18, lineHeight: 24, fontWeight: '800', color: '#402C23'},
  storyLabelDark: {fontSize: 11, fontWeight: '800', color: '#F3C9BE', letterSpacing: 1},
  storyTitleDark: {marginTop: 10, fontSize: 18, lineHeight: 24, fontWeight: '800', color: '#FFF2EF'},
  hotSection: {
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 24,
    backgroundColor: '#FFF8F2',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D201B',
  },
  sectionHint: {
    fontSize: 12,
    color: '#9A7A6C',
  },
  hotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  hotItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8D9CD',
  },
  hotRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3E1D5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  hotRankText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#7D4F3C',
  },
  hotCopy: {
    flex: 1,
    paddingRight: 12,
  },
  hotTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A211E',
  },
  hotDesc: {
    marginTop: 4,
    fontSize: 12,
    color: '#8B6E61',
  },
  hotPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E75A5A',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  productCard: {
    width: '48.4%',
    borderRadius: 22,
    backgroundColor: '#FFFDF9',
    padding: 10,
    marginBottom: 12,
  },
  productImage: {width: '100%', height: 126, borderRadius: 16},
  productBadge: {marginTop: 10, fontSize: 11, fontWeight: '700', color: '#E75A5A'},
  productTitle: {marginTop: 6, fontSize: 15, lineHeight: 21, color: '#251D1A'},
  productPrice: {marginTop: 10, fontSize: 18, fontWeight: '800', color: '#E75A5A'},
});

export default ShoppingPage;
