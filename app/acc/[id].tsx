import { useLocalSearchParams } from 'expo-router';
import { AccountInfo } from '@/components/AccountInfo';
export default function Account() {
  const { id } = useLocalSearchParams();
  return <AccountInfo id={id as string} />;
}
