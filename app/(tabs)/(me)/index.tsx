import { StyleSheet, ActivityIndicator, Pressable, Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, useThemeColor } from '@/components/Themed';
import { AppKitButton, useAppKit } from '@reown/appkit-wagmi-react-native';
import { Stack, Link } from 'expo-router';
import { Image } from 'expo-image';
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { intuitionTestnet } from "@0xintuition/protocol";
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { blurhash, getCachedImage } from '@/lib/utils';
import { CrossPlatformPicker } from '@/components/CrossPlatformPicker';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
const AccountProfileQuery = graphql(`
query AccountProfile($accountId: String!, $positionsBool: positions_bool_exp) {
  account(id: $accountId) {
    atom {
      term_id
      label
      cached_image {
        safe
        url
      }
      organizations: as_subject_triples(
        where: {
          predicate_id: {
            _eq: "0x41f20a29ee2587b977cf5b1386f44392224b05280b6ea6e3188be7b673b98c4d"
          }
          positions: $positionsBool
        }
      ) {
        object {
          term_id
          label
          cached_image {
            url
            safe
          }
        }
      }
      projects: as_subject_triples(
        where: {
          predicate_id: {
            _eq: "0x35614b2d339d64b8ecad5d4b39968be8d3d5eb31d4ccf81185d152487805d7fb"
          }
          positions: $positionsBool
        }
      ) {
        object {
          term_id
          label
          cached_image {
            url
            safe
          }
        }
      }
      skills: as_subject_triples(
        where: {
          predicate_id: {
            _eq: "0xb5b5a44a01d657bf5a3f747c7609a1c665dff44b0b2c3a64556b137e3f0f9d02"
          }
          positions: $positionsBool
        }
      ) {
        object {
          term_id
          label
          cached_image {
            url
            safe
          }
        }
      }

      tags: as_subject_triples(
        where: {
          predicate_id: {
            _eq: "0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d"
          }
          positions: $positionsBool
        }
      ) {
        object {
          term_id
          label
          cached_image {
            url
            safe
          }
        }
      }
    }
  }
}    
`);

const sources = ['All', 'My'];

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

const SectionItem: React.FC<SectionItemProps> = ({ item, isLast }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  return (
    <Link href={`/(me)/atom/${item.term_id}` as any} asChild>
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

export default function MeIndex() {
  const { address, status } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const backgroundColor = useThemeColor({}, 'background');
  const secondaryBackgroundColor = useThemeColor({}, 'secondaryBackground');
  const [sourceIndex, setSourceIndex] = useState(0);
  const { open } = useAppKit()
  const isWrongChain = status === 'connected' && chainId !== intuitionTestnet.id;

  const { data, isLoading } = useQuery({
    enabled: !!address,
    queryKey: ['accountProfile', address, sourceIndex],
    queryFn: () => execute(AccountProfileQuery, {
      "accountId": address?.toLowerCase() || "",
      "positionsBool": sourceIndex === 0 ? {} : {
        "account_id": {
          "_eq": address
        }
      }
    })
  });

  const handleSwitchChain = () => {
    switchChain({ chainId: intuitionTestnet.id });
  };


  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={[{ backgroundColor }]}
          contentContainerStyle={styles.contentContainer}
          stickyHeaderIndices={[0]}
        >
          <View style={Platform.select({
            ios: ({ flex: 1, backgroundColor, paddingBottom: 10, marginHorizontal: 16 }),
            android: ({ alignItems: 'center', flex: 1, backgroundColor })
          })}>
            <CrossPlatformPicker
              options={sources}
              selectedIndex={sourceIndex}
              onOptionSelected={({ nativeEvent: { index } }) => {
                setSourceIndex(index);
              }}
              variant="segmented"
            />
          </View>
          {(() => {
            if (status === 'disconnected') {
              return (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Connect Your Wallet</Text>
                  <Text style={styles.emptySubtext}>
                    Connect your wallet to view your profile and contributions to the knowledge graph
                  </Text>
                  <AppKitButton />
                </View>
              );
            }

            if (isWrongChain) {
              return (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Wrong Network</Text>
                  <Text style={styles.emptySubtext}>
                    Please switch to Intuition Testnet to view your profile
                  </Text>
                  <Pressable
                    style={styles.switchChainButton}
                    onPress={handleSwitchChain}
                  >
                    <Text style={styles.switchChainButtonText}>Add & Switch to Intuition Testnet</Text>
                  </Pressable>
                </View>
              );
            }

            if (isLoading) {
              return (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" />
                  <Text style={styles.loadingText}>Loading profile information...</Text>
                </View>
              );
            }

            if (!data?.account?.atom) {
              return (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No Profile Found</Text>
                  <Text style={styles.emptySubtext}>
                    This wallet address doesn't have a profile in the knowledge graph yet
                  </Text>
                </View>
              );
            }

            const atom = data.account.atom;
            return (
              <>
                <View style={styles.profileHeader}>
                  {atom.cached_image?.url && (
                    <Image
                      source={getCachedImage(atom.cached_image.url)}
                      placeholder={blurhash}
                      blurRadius={atom.cached_image?.safe ? 0 : 5}
                      style={styles.profileImage}
                    />
                  )}
                  <Pressable onPress={() => open()}>
                    <Text style={{ ...styles.profileName, backgroundColor: secondaryBackgroundColor }}>
                      {atom.label}
                    </Text>
                  </Pressable>
                </View>

                {/* Organizations Section */}
                {atom.organizations.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Organizations</Text>
                    <View style={styles.sectionContent}>
                      {atom.organizations.map((org, index) => (
                        <SectionItem
                          key={org.object.term_id}
                          item={org.object}
                          isLast={index === atom.organizations.length - 1}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {/* Projects Section */}
                {atom.projects.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    <View style={styles.sectionContent}>
                      {atom.projects.map((project, index) => (
                        <SectionItem
                          key={project.object.term_id}
                          item={project.object}
                          isLast={index === atom.projects.length - 1}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {/* Skills Section */}
                {atom.skills.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.sectionContent}>
                      {atom.skills.map((skill, index) => (
                        <SectionItem
                          key={skill.object.term_id}
                          item={skill.object}
                          isLast={index === atom.skills.length - 1}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {/* Tags Section */}
                {atom.tags.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tags</Text>
                    <View style={styles.sectionContent}>
                      {atom.tags.map((tag, index) => (
                        <SectionItem
                          key={tag.object.term_id}
                          item={tag.object}
                          isLast={index === atom.tags.length - 1}
                        />
                      ))}
                    </View>
                  </View>
                )}
              </>
            );
          })()}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
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
    backgroundColor: 'transparent',
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
  sectionItemPressed: {
    opacity: 0.5,
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
  switchChainButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  switchChainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

