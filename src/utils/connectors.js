import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";

const IS_MAINNET = process.env.REACT_APP_NETWORK === "mainnet";
const chainId = IS_MAINNET ? 1 : 5;
const rpcUrl = IS_MAINNET
  ? "https://mainnet.infura.io/v3/"
  : "https://goerli.infura.io/v3/";
const scanUrl = IS_MAINNET
  ? "https://etherscan.io"
  : "https://goerli.etherscan.io";

const BINANCE_MAINNET_PARAMS = {
  chainId: chainId,
  chainName: "Ether",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: [rpcUrl],
  blockExplorerUrls: [scanUrl],
};

const injected = new InjectedConnector({ supportedChainIds: [chainId] });
const binance_wallet = new InjectedConnector({
  supportedChainIds: [Number(BINANCE_MAINNET_PARAMS.chainId)],
});
const trustWallet = new InjectedConnector({
  supportedChainIds: [Number(BINANCE_MAINNET_PARAMS.chainId)],
});

const walletConnect = new WalletConnectConnector({
  rpc: {
    5: "https://goerli.infura.io/v3/",
  },
  bridge: "https://bridge.walletconnect.org/",
  qrcode: true,
  pollingInterval: 12000,
});

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export { injected, trustWallet, walletConnect, binance_wallet };
