
export const useGeneralConfig = () => {

  return {
    admin: '0xa28d4AAcA48bE54824dA53a19b05121DE71Ef480',
    atomUriMaxLength: '250',
    decimalPrecision: '1000000000000000000',
    feeDenominator: '10000',
    minDelay: '86400',
    entry_fee: '500',
    minDeposit: process.env.EXPO_PUBLIC_CHAIN_ID === '8453' ? '25000000000000' : '690000000000000', //'25000000000000',
    minShare: '1000000',
    protocolVault: '0xC03F0dE5b34339e1B968e4f317Cd7e7FBd421FD1',
  };
};
