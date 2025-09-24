```ts
import { useReadContract } from 'wagmi';
import { intuitionDeployments, intuitionTestnet, MultiVaultAbi } from '@0xintuition/protocol';

  const { data, isLoading, error } = useReadContract({
    abi: MultiVaultAbi,
    functionName: 'getAtomCost',
    address: intuitionDeployments['MultiVault'][intuitionTestnet.id]
  });

```
