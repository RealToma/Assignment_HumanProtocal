import { Box } from "@material-ui/core";
import styled from "styled-components";
import React, { useEffect, useState, useMemo } from "react";
import CustomBtn from "../../components/CustomBtn";
import { useWeb3React } from "@web3-react/core";

import { ethers } from "ethers";
import { CONTRACTS } from "../../utils/constants";
import { TRVL_ABI, THOMAS_ABI } from "../../utils/abi";

const Content = () => {
  const [tsupply_erc20, set_ts_erc20] = useState(0);
  const [tsupply_erc721, set_ts_erc721] = useState(0);
  const [erc20_address, set_erc20_address] = useState(null);
  const [erc20_amount, set_erc20_amount] = useState(0);
  const [erc721_address, set_erc721_address] = useState(null);
  const [metauri, set_metauri] = useState(null);

  const { account, library } = useWeb3React();

  const TRVL_Contract = useMemo(
    () =>
      library
        ? new ethers.Contract(
            CONTRACTS.TRVL_TOKEN,
            TRVL_ABI,
            library.getSigner()
          )
        : null,
    [library]
  );
  const TOM_Contract = useMemo(
    () =>
      library
        ? new ethers.Contract(
            CONTRACTS.THOMAS_NFT,
            THOMAS_ABI,
            library.getSigner()
          )
        : null,
    [library]
  );

  const mint_erc20 = async () => {
    try {
      // const role = await TRVL_Contract.MINTER_ROLE();
      // console.log(role);
      // const grantRole = await TRVL_Contract.grantRole(role, account);
      // await grantRole.wait();
      console.log(erc20_amount);
      const mint = await TRVL_Contract.mint(
        erc20_address,
        "0x" + (erc20_amount * Math.pow(10, 18)).toString(16)
      );
      await mint.wait();
      get_ts_erc20();
    } catch (e) {
      console.log(e);
    }
  };

  const mint_erc721 = async () => {
    const mint = await TOM_Contract.mint(erc721_address, metauri);
    await mint.wait();
    get_ts_erc721();
  };

  const get_ts_erc20 = async () => {
    try {
      let temp_ts = await TRVL_Contract.totalSupply();
      set_ts_erc20(parseInt(temp_ts._hex) / Math.pow(10, 18));
    } catch (e) {
      console.log(e);
    }
  };

  const get_ts_erc721 = async () => {
    try {
      let temp_ts = await TOM_Contract.totalSupply();
      set_ts_erc721(parseInt(temp_ts._hex) / Math.pow(10, 18));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledComponent>
      <MintBox>
        <Box
          display={"flex"}
          flex={"1"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
        >
          <LeftMintMox>
            <TitleText01>THEV Token</TitleText01>
            <InputBox01>
              <TitleText02>Amount(ETH) :</TitleText02>
              <Input01
                component={"input"}
                type={"number"}
                onChange={(e) => {
                  set_erc20_amount(e.target.value);
                }}
              ></Input01>
            </InputBox01>
            <InputBox01>
              <TitleText02>Number of Tokens :</TitleText02>
              <Input01
                component={"input"}
                type={"number"}
                onChange={(e) => {
                  set_erc20_amount(e.target.value);
                }}
              ></Input01>
            </InputBox01>
            <InputBox01>
              <TitleText02>Payment Method :</TitleText02>
              <Input01
                component={"input"}
                placeholder={"Ethereum"}
                onChange={(e) => {
                  set_erc20_amount(e.target.value);
                }}
              ></Input01>
            </InputBox01>
            <Box
              display={"flex"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={"40px"}
            >
              <Box
                display={"flex"}
                flex={"1"}
                justifyContent={"center"}
                alignItems={"center"}
                mr={"20px"}
                onClick={() => {}}
              >
                <CustomBtn
                  width={"100%"}
                  height={"50px"}
                  str={"Reset"}
                  fsize={"1.5rem"}
                  fcolor={"#da3282"}
                  bgcolor={"white"}
                  border={"none"}
                  bradius={"8px"}
                  fweight={"600"}
                />
              </Box>
              <Box
                display={"flex"}
                flex={"1"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={() => {
                  mint_erc20();
                }}
              >
                <CustomBtn
                  width={"100%"}
                  height={"50px"}
                  str={"Buy Now"}
                  fsize={"1.5rem"}
                  fcolor={"#da3282"}
                  bgcolor={"white"}
                  border={"none"}
                  bradius={"8px"}
                  fweight={"600"}
                />
              </Box>
            </Box>
          </LeftMintMox>
        </Box>
        <Box
          display={"flex"}
          flex={"0.1"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
        ></Box>
        <Box
          display={"flex"}
          flex={"1"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
        >
          <LeftMintMox>
            <TitleText01>Transaction Summary</TitleText01>
            <SupplyMintBox>
              <TitleText02>Token Rate : 1 ETH = 1000 THEV</TitleText02>
            </SupplyMintBox>
            <SupplyMintBox>
              <TitleText02>Total Tokens : {tsupply_erc20}</TitleText02>
            </SupplyMintBox>
            <SupplyMintBox>
              <TitleText02>Total USD : {tsupply_erc20}</TitleText02>
            </SupplyMintBox>
            <Box
              display={"flex"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={"40px"}
            >
              <Box
                display={"flex"}
                flex={"1"}
                justifyContent={"center"}
                alignItems={"center"}
                mr={"20px"}
                onClick={() => {}}
              >
                <CustomBtn
                  width={"100%"}
                  height={"50px"}
                  str={"Reset"}
                  fsize={"1.5rem"}
                  fcolor={"#da3282"}
                  bgcolor={"white"}
                  border={"none"}
                  bradius={"8px"}
                  fweight={"600"}
                />
              </Box>
              <Box
                display={"flex"}
                flex={"1"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={() => {
                  mint_erc20();
                }}
              >
                <CustomBtn
                  width={"100%"}
                  height={"50px"}
                  str={"Buy Now"}
                  fsize={"1.5rem"}
                  fcolor={"#da3282"}
                  bgcolor={"white"}
                  border={"none"}
                  bradius={"8px"}
                  fweight={"600"}
                />
              </Box>
            </Box>
          </LeftMintMox>
        </Box>
      </MintBox>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;

const MintBox = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 200px;
`;
const LeftMintMox = styled(Box)`
  display: flex;
  width: 70%;
  padding: 30px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  background-color: #da3282;
  border-radius: 8px;
  border: none;
  outline: none;
  color: white;
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 0px 20px white;
  }
  @media (max-width: 1600px) {
    width: 85% !important;
  }
  @media (max-width: 1200px) {
    width: 95% !important;
  }
`;

const RightMintBox = styled(Box)`
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: center;
  background-color: #da3282;
  border-radius: 8px;
  border: none;
  outline: none;
  color: white;
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 0px 20px white;
  }
  @media (max-width: 1600px) {
    width: 85% !important;
  }
  @media (max-width: 1200px) {
    width: 95% !important;
  }
`;

const TitleText01 = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
`;
const TitleText02 = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 400;
`;

const InputBox01 = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
`;
const Input01 = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: 1px solid #331393;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 400;
`;
const Input02 = styled(Box)`
  display: flex;
  width: 45%;
  margin-left: 5%;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: 1px solid #331393;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 400;
`;

const SupplyMintBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;

export default Content;
