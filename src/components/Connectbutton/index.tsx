import React from "react";
import{ Button,useWalletModal} from '@pancakeswap-libs/uikit';
import styled from 'styled-components'


const ConnectWrapper = styled.div`
  display:block;
  position:fixed;
  top:20px;
  left:20px;
  z-index:999;
`
interface Props {
  account?: string;
  login: Login;
  logout: () => void;
}

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc",
}


type Login = (connectorId: ConnectorNames) => void;

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (  
    <ConnectWrapper>
      {account ? (
        <Button
          scale="sm"
          variant="tertiary"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
          scale="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          Connect
        </Button>
      )}
    </ConnectWrapper>
  );
};

export default React.memo(UserBlock);
