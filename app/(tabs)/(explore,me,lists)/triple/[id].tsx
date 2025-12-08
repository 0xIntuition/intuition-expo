import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Text, View, useThemeColor } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { blurhash, getCachedImage, formatTrust, formatNumber, shortenAddress } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';

const GetTripleQuery = graphql(`
query GetTriple($term_id: String!) {
  triple(term_id: $term_id) {
    subject {
      term_id
      label
      cached_image {
        url
        safe
      }
    }
    predicate {
      term_id
      label
      cached_image {
        url
        safe
      }
    }
    object {
      term_id
      label
      cached_image {
        url
        safe
      }
    }
    creator {
      id
      label
      cached_image {
        url
        safe
      }
    }
    triple_term {
      total_market_cap
      total_position_count
    }
    positions_aggregate {
      aggregate {
        count
        sum {
          shares
        }
      }
    }
    counter_positions_aggregate {
      aggregate {
        count
        sum {
          shares
        }
      }
    }
  }
}
`);

interface SectionItemProps {
  item: {
    term_id: string;
    label?: string | null;
    cached_image?: {
      url?: string;
      safe?: boolean;
    } | null;
  };
  isLast: boolean;
}

interface ProgressBarProps {
  supportAmount: number;
  opposeAmount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ supportAmount, opposeAmount }) => {
  const supportColor = useThemeColor({ light: '#34C759', dark: '#30D158' }, 'tint');
  const opposeColor = useThemeColor({ light: '#FF3B30', dark: '#FF453A' }, 'text');
  const backgroundColor = useThemeColor({}, 'border');

  const total = supportAmount + opposeAmount;
  const supportPercentage = total > 0 ? (supportAmount / total) * 100 : 50;
  const opposePercentage = total > 0 ? (opposeAmount / total) * 100 : 50;

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarBackground, { backgroundColor }]}>
        <View style={[styles.progressBarFill, { backgroundColor: supportColor, width: `${supportPercentage}%` }]} />
        <View style={[styles.progressBarFill, { backgroundColor: opposeColor, width: `${opposePercentage}%` }]} />
      </View>
    </View>
  );
};

interface StakingRowProps {
  label: string;
  trustAmount: string;
  voteCount: string;
  color: string;
  isLast?: boolean;
}

const StakingRow: React.FC<StakingRowProps> = ({ label, trustAmount, voteCount, color, isLast = false }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const voteCountColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {};

  return (
    <View style={[styles.stakingRow, { backgroundColor }, separator]}>
      <View style={styles.stakingRowLeft}>
        <View style={[styles.stakingIndicator, { backgroundColor: color }]} />
        <Text style={[styles.stakingLabel, { color: textColor }]}>{label}</Text>
      </View>
      <View style={styles.stakingRowRight}>
        <Text style={[styles.stakingTrust, { color: textColor }]}>{trustAmount} TRUST</Text>
        <Text style={[styles.stakingCount, { color: voteCountColor }]}>
          {voteCount} votes
        </Text>
      </View>
    </View>
  );
};

interface StatRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const StatRow: React.FC<StatRowProps> = ({ label, value, isLast = false }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const labelColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {};

  return (
    <View style={[styles.statRow, { backgroundColor }, separator]}>
      <Text style={[styles.statLabel, { color: labelColor }]}>{label}</Text>
      <Text style={[styles.statValue, { color: textColor }]}>{value}</Text>
    </View>
  );
};

const CreatorSection: React.FC<{
  creator: {
    id: string;
    label?: string | null;
    cached_image?: { url?: string; safe?: boolean } | null
  }
}> = ({ creator }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');

  return (
    <Link href={`../account/${creator.id}` as any} asChild>
      <Pressable style={[styles.creatorItem, { backgroundColor }]}>
        <View style={styles.creatorContent}>
          {creator.cached_image?.url && (
            <Image
              source={getCachedImage(creator.cached_image.url)}
              placeholder={blurhash}
              blurRadius={creator.cached_image?.safe ? 0 : 5}
              style={styles.creatorImage}
            />
          )}
          <Text style={[styles.creatorText, { color: textColor }]} numberOfLines={1}>
            {creator.label || shortenAddress(creator.id)}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={chevronColor} />
        </View>
      </Pressable>
    </Link>
  );
};

const SectionItem: React.FC<SectionItemProps> = ({ item, isLast }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  return (
    <Link href={`../atom/${item.term_id}` as any} asChild>
      <Pressable
        style={{ ...styles.sectionItem, backgroundColor, ...separator }}
      >
        <View style={styles.sectionItemContent}>
          {item.cached_image?.url && (
            <Image
              source={getCachedImage(item.cached_image.url)}
              placeholder={blurhash}
              blurRadius={item.cached_image?.safe ? 0 : 5}
              style={styles.sectionItemImage}
            />
          )}
          <Text style={[styles.sectionItemText, { color: textColor }]} numberOfLines={1}>
            {item.label || 'Untitled'}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={chevronColor} />
        </View>
      </Pressable>
    </Link>
  );
};

export default function Triple() {


  const { id } = useLocalSearchParams();
  const termId = Array.isArray(id) ? id[0] : id

  const { data, isLoading } = useQuery({
    queryKey: ['getTriple', id],
    queryFn: () => execute(GetTripleQuery, {
      term_id: termId
    })
  })

  // Theme colors for staking section
  const supportColor = useThemeColor({ light: '#34C759', dark: '#30D158' }, 'tint');
  const opposeColor = useThemeColor({ light: '#FF3B30', dark: '#FF453A' }, 'text');

  const title = isLoading ? '' : data?.triple?.subject?.label + ' ' + data?.triple?.predicate?.label + ' ' + data?.triple?.object?.label

  return (
    <>
      <Stack.Screen
        options={{
          title,
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        {isLoading && <Text>Loading</Text>}
        {data !== undefined && (
          <View>
            {/* Claim Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Claim</Text>
              <View style={styles.sectionContent}>
                {data.triple?.subject && (
                  <SectionItem
                    item={data.triple.subject}
                    isLast={false}
                  />
                )}
                {data.triple?.predicate && (
                  <SectionItem
                    item={data.triple.predicate}
                    isLast={false}
                  />
                )}
                {data.triple?.object && (
                  <SectionItem
                    item={data.triple.object}
                    isLast={true}
                  />
                )}
              </View>
            </View>

            {/* Staking Section */}
            {data.triple && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Staking</Text>
                <View style={styles.sectionContent}>
                  <StakingRow
                    label="Support"
                    trustAmount={formatTrust(data.triple.positions_aggregate?.aggregate?.sum?.shares)}
                    voteCount={formatNumber(data.triple.positions_aggregate?.aggregate?.count)}
                    color={supportColor}
                    isLast={false}
                  />
                  <StakingRow
                    label="Oppose"
                    trustAmount={formatTrust(data.triple.counter_positions_aggregate?.aggregate?.sum?.shares)}
                    voteCount={formatNumber(data.triple.counter_positions_aggregate?.aggregate?.count)}
                    color={opposeColor}
                    isLast={true}
                  />
                </View>
                <ProgressBar
                  supportAmount={parseFloat(data.triple.positions_aggregate?.aggregate?.sum?.shares || '0')}
                  opposeAmount={parseFloat(data.triple.counter_positions_aggregate?.aggregate?.sum?.shares || '0')}
                />
              </View>
            )}

            {/* Statistics Section */}
            {data.triple?.triple_term && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Statistics</Text>
                <View style={styles.sectionContent}>
                  <StatRow
                    label="Total Mkt Cap"
                    value={`${formatTrust(data.triple.triple_term.total_market_cap)} TRUST`}
                    isLast={false}
                  />
                  <StatRow
                    label="Total Holders"
                    value={formatNumber(data.triple.triple_term.total_position_count)}
                    isLast={true}
                  />
                </View>
              </View>
            )}

            {/* Creator Section */}
            {data.triple?.creator && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Creator</Text>
                <View style={styles.sectionContent}>
                  <CreatorSection creator={data.triple.creator} />
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    marginBottom: 8,
    opacity: 0.6,
  },
  sectionContent: {
    borderRadius: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  sectionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  sectionItemContent: {
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sectionItemImage: {
    width: 29,
    height: 29,
    borderRadius: 6,
    marginRight: 12,
  },
  sectionItemText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
  },
  // Progress Bar
  progressBarContainer: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  // Staking Row
  stakingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  stakingRowLeft: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stakingIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  stakingLabel: {
    fontSize: 17,
    fontWeight: '400',
  },
  stakingRowRight: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },
  stakingTrust: {
    fontSize: 17,
    fontWeight: '600',
  },
  stakingCount: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 2,
  },
  // Stat Row
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  statLabel: {
    backgroundColor: 'transparent',
    fontSize: 17,
    fontWeight: '400',
  },
  statValue: {
    backgroundColor: 'transparent',
    fontSize: 17,
    fontWeight: '600',
  },
  // Creator Section
  creatorItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    borderRadius: 10,
  },
  creatorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  creatorImage: {
    width: 29,
    height: 29,
    borderRadius: 14.5,
    marginRight: 12,
  },
  creatorText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
  },
});

