require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  process.env.MYMNEMONIC,
  'https://rinkeby.infura.io/v3/d6146e41bc2c4d95bc825772c9afa676'
);

const web3= new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account: ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello world!'] })
    .send({ from: accounts[0], gas: '1000000'});

  console.log('Contract deployed to: ', result.options.address);
}
deploy();

// https://rinkeby.infura.io/v3/d6146e41bc2c4d95bc825772c9afa676
