import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { AppKitButton } from '@reown/appkit-wagmi-react-native';
import { useReadContract } from 'wagmi';
import { intuitionDeployments, intuitionTestnet, MultiVaultAbi } from '@0xintuition/protocol';
import { formatEther } from 'viem';

export default function AccountIndex() {
  const { data, isLoading, error } = useReadContract({
    abi: MultiVaultAbi,
    functionName: 'getAtomCost',
    address: intuitionDeployments['MultiVault'][intuitionTestnet.id]
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <Text>Loading</Text>}
      {data !== undefined && <Text>{formatEther(data)}</Text>}
      <Text>{error?.message}</Text>
      <AppKitButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

