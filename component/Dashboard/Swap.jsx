import React, { useState, useEffect }  from 'react';
import { TextField, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getTokens } from '../../utils/hooks/getTokens';
import { getQuote } from '../../utils/hooks/getQuote';
import { getSwapAllowance } from '../../utils/hooks/getAllowance';
import { useMoralis } from 'react-moralis';

const SwapPage = () => {

    const [modal, setModal] = useState({
      show: false,
      activeTokenState: ''
    });
    const [tokens, setTokens] = useState();
    const [activeToken, setActiveToken] = useState({
      tokenA: '',
      tokenB: ''
    });
    const [values, setValues] = useState({
      tokenA: '',
      tokenB: '',
      estimatedGas: ''
    });
    const { Moralis, account: walletAddress } = useMoralis();

    const styles = useStyles();
    const currentTrade = {
      from : tokens && tokens[activeToken.tokenA],
      to: tokens && tokens[activeToken.tokenB],
      amount: '100'
    }
    
    
    const fetchAllTokens = async() => {
      const allTokens = await getTokens(Moralis);
      setTokens(allTokens)
    };
    
    useEffect(() => {
      fetchAllTokens()
    }, [ ]);
    
    const handleOnChange = (e, name) => {
      const { value } = e.target;
      setValues(prevState => ({ ...prevState, [name]: value }))
    };
    
    const handleOnBlur = async(e) => {
      const tokenQuote = getQuote(currentTrade, Moralis);
      const quoteData = await tokenQuote; 
      if(quoteData.error){
        console.log(quoteData);
      }else {
        setValues({
          tokenA: values.tokenA,
          tokenB: quoteData?.toTokenAmount / quoteData?.toToken?.decimals,
          estimatedGas: quoteData.estimatedGas
        })
      }
    };
    
    const swapHandle = async() => {
      const swapResponse = await getSwapAllowance(currentTrade, Moralis, walletAddress);
    }

    return (
      <div>
        <h2 className='text-2xl text-center'>Swap tokens</h2>
        <div className="p-4 w-2/5 mx-auto">
          <div className="flex justify-between items-center p-2 my-2 hover:bg-gray-100 rounded-md">
            <TextField
              name="token0Amount"
              placeholder="Enter amount"
              variant="outlined"
              type="number"
              size="small"
              color="primary"
              value={values.tokenA}
              className="mx-4"
              onBlur={(e) => handleOnBlur(e, 'tokenA')}
              onChange={(e) => handleOnChange(e, 'tokenA') }
              style={{ width: '70%' }}
            />
            <div
              onClick={() => { fetchAllTokens(); setModal({ show: true, activeTokenState: 'tokenA'}) }}
              className="p-2 border border-gray-200 rounded-md m-2 cursor-pointer text-center"
              style={{ width: '25%' }}
            >
              <p>{tokens && tokens[activeToken?.tokenA]?.symbol ? tokens[activeToken.tokenA]?.symbol: 'Select token' }</p>
            </div>
          </div>
          <div className="flex justify-between items-center p-2 my-2 hover:bg-gray-100 rounded-md">
            <TextField
              placeholder="Enter amount"
              name="token0Amount"
              onBlur={(e) => handleOnBlur(e, 'tokenB')}
              onChange={(e) => handleOnChange(e, 'tokenB') }
              variant="outlined"
              value={values.tokenB}
              color="primary"
              className="m-4"
              size="small"
              type="number"
              style={{ width: '70%' }}
              fullWidth
            />
            <div
              onClick={() => { fetchAllTokens(); setModal({ show: true, activeTokenState: 'tokenB'}) }}
              className="p-2 border border-gray-200 rounded-md m-2 cursor-pointer text-center"
              style={{ width: '25%' }}
            >
             <p>{tokens && tokens[activeToken?.tokenB]?.symbol ? tokens[activeToken.tokenB]?.symbol: 'Select token' }</p>
            </div>
          </div>
          <p className="mx-4 my-2 text-xs">Estimated Gas: {values.estimatedGas}</p>
          <Button variant="contained" color="secondary" fullWidth onClick={() => swapHandle()}>
            Swap
          </Button>
        </div>
        <Modal
          open={modal.show}
          onClose={() => setModal({ show: false })}
          className={styles.paper}
        >
          <div className="bg-gray-50 rounded-md">
            <div className="flex justify-between items-center p-2 m-4">
              <h3>Select Token</h3>
              <button onClick={() =>setModal({ show: false })} className="text-xs border border-gray-300 rounded-md p-1">close</button>
            </div>
            <hr />
            <div style={{ height: "600px", overflow: "scroll" }}>
              {tokens &&
                Object.keys(tokens).map((item) => {
                  const singleToken = tokens[item];
                  return (
                    <div className="flex justify-between gap-4 items-center p-2 m-2 hover:bg-gray-100 cursor-pointer"
                      key={tokens[item].symbol}
                      onClick={() => {
                        if(modal.activeTokenState === 'tokenA') {
                          setActiveToken({
                            tokenA: item,
                            tokenB: activeToken.tokenB
                          });
                          setModal({ show: false })
                        }else {
                          setActiveToken({
                            tokenA: activeToken.tokenA,
                            tokenB: item
                          });
                          setModal({ show: false })
                        }
                      }}
                    >
                      <img
                        src={singleToken.logoURI}
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: 100,
                        }}
                      />
                      <p className="text-left">{singleToken.name}</p>
                      <p>{singleToken.symbol}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </Modal>
      </div>
    );
};

const useStyles = makeStyles(theme => ({
    paper: {
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems :'center',
        position: 'relative',
        width: '50%',
    }
}))
export default SwapPage;
