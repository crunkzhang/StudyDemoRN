import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const WECHAT_GREEN = '#07C160';

export interface DiscoverStat {
  label: string;
  value: string;
}

export interface DiscoverAction {
  label: string;
  hint: string;
}

export interface DiscoverCard {
  eyebrow?: string;
  title: string;
  description: string;
  meta?: string;
}

interface DiscoverFeaturePageProps {
  title: string;
  subtitle: string;
  accentColor: string;
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  stats?: DiscoverStat[];
  quickActions?: DiscoverAction[];
  cards?: DiscoverCard[];
  searchPlaceholder?: string;
}

const DiscoverFeaturePage: React.FC<DiscoverFeaturePageProps> = ({
  title,
  subtitle,
  accentColor,
  heroLabel,
  heroTitle,
  heroDescription,
  stats = [],
  quickActions = [],
  cards = [],
  searchPlaceholder,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>{title}</Text>
          <Text style={styles.pageSubtitle}>{subtitle}</Text>
        </View>

        {searchPlaceholder ? (
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              placeholder={searchPlaceholder}
              placeholderTextColor="#92A098"
              style={styles.searchInput}
            />
          </View>
        ) : null}

        <View style={[styles.heroCard, {backgroundColor: accentColor}]}>
          <Text style={styles.heroLabel}>{heroLabel}</Text>
          <Text style={styles.heroTitle}>{heroTitle}</Text>
          <Text style={styles.heroDescription}>{heroDescription}</Text>

          {stats.length ? (
            <View style={styles.statsRow}>
              {stats.map(stat => (
                <View key={stat.label} style={styles.statBlock}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {quickActions.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>快捷入口</Text>
            <View style={styles.actionGrid}>
              {quickActions.map(action => (
                <Pressable key={action.label} style={styles.actionCard}>
                  <View style={[styles.actionDot, {backgroundColor: accentColor}]} />
                  <Text style={styles.actionLabel}>{action.label}</Text>
                  <Text style={styles.actionHint}>{action.hint}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {cards.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>推荐内容</Text>
            {cards.map(card => (
              <View key={card.title} style={styles.contentCard}>
                {card.eyebrow ? (
                  <Text style={[styles.cardEyebrow, {color: accentColor}]}>
                    {card.eyebrow}
                  </Text>
                ) : null}
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDescription}>{card.description}</Text>
                {card.meta ? <Text style={styles.cardMeta}>{card.meta}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F4F6F2'},
  scroll: {flex: 1},
  content: {paddingHorizontal: 16, paddingTop: 18, paddingBottom: 28},
  header: {marginBottom: 16},
  pageTitle: {fontSize: 31, fontWeight: '800', color: '#132118'},
  pageSubtitle: {
    marginTop: 8,
    color: '#6E7D73',
    fontSize: 14,
    lineHeight: 21,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchIcon: {fontSize: 18, color: '#6E7D73'},
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#132118',
    fontSize: 15,
    paddingVertical: 0,
  },
  heroCard: {
    borderRadius: 28,
    padding: 20,
    shadowColor: '#0B1610',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  heroLabel: {
    color: '#EAF8EF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  heroTitle: {
    marginTop: 12,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  heroDescription: {
    marginTop: 10,
    color: '#EFF8F2',
    fontSize: 14,
    lineHeight: 21,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statBlock: {flex: 1},
  statValue: {color: '#fff', fontSize: 20, fontWeight: '800'},
  statLabel: {marginTop: 4, color: '#EAF8EF', fontSize: 12},
  section: {marginTop: 22},
  sectionTitle: {fontSize: 18, fontWeight: '700', color: '#132118'},
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionCard: {
    width: '48.5%',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
  },
  actionDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  actionLabel: {
    marginTop: 16,
    fontSize: 17,
    fontWeight: '700',
    color: '#132118',
  },
  actionHint: {
    marginTop: 8,
    color: '#6E7D73',
    fontSize: 13,
    lineHeight: 19,
  },
  contentCard: {
    marginTop: 12,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 18,
  },
  cardEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#132118',
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#5E6D63',
  },
  cardMeta: {
    marginTop: 12,
    fontSize: 12,
    color: WECHAT_GREEN,
    fontWeight: '600',
  },
});

export default DiscoverFeaturePage;
