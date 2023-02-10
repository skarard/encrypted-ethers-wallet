# Encrypted Ethers Wallet

[![NPM version](https://img.shields.io/npm/v/encrypted-ethers-wallet.svg)](https://www.npmjs.com/package/encrypted-ethers-wallet)

Encrypted Ethers Wallet is a package for creating a password encrypted JSON wallet using [Ethers](https://github.com/ethers-io/ethers.js). It supports any EVM-based network and can be installed globally to easily interact with command line interactions, particularly contract deployment script, such as hardhat, but any EVM blockchain automation is supported.

## Installation

To install Encrypted Ethers Wallet, use the following command in your terminal:

```
npm install -g encrypted-ethers-wallet
```

## Usage

To use Encrypted Ethers Wallet, use the following command in your terminal:

```
encrypted-ethers-wallet
```

This will prompt you to enter a password to encrypt your wallet. Once your wallet is encrypted, you will be able to use it to interact with any EVM-based network.

## Import Wallet Example
```javascript

/* JavaScript Imports */
const readline = require('readline');
const ethers = require('ethers');

/* TypeScript Imports*/
import * as readline from 'readline';
import { Wallet } from 'ethers';


/* Example */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter your wallet password: ', (password) => {
  const wallet = new ethers.Wallet.fromEncryptedWallet('UTC--2023-02-10T21-49-28.0Z--0b8fe1fc7b6a012004669a9ea18467865722c852.json', password);
  console.log(`Wallet ${wallet.address} successfully imported!`);
  rl.close();
});
```

## Contributing

If you'd like to contribute to the development of Encrypted Ethers Wallet, please feel free to submit pull requests or open issues on the [GitHub repo](https://github.com/skarard/encrypted-ethers-wallet).

## License

Encrypted Ethers Wallet is released under the [MIT license](https://opensource.org/licenses/MIT).
