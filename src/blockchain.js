import Web3 from 'web3';
import VotingContract from './Voting.json';

let web3;
let votingInstance;

export const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  return web3;
};

export const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = VotingContract.networks[networkId];
  votingInstance = new web3.eth.Contract(
    VotingContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
  return votingInstance;
};

export const getCandidates = async () => {
  const count = await votingInstance.methods.candidatesCount().call();
  const candidates = [];
  for (let i = 1; i <= count; i++) {
    const candidate = await votingInstance.methods.candidates(i).call();
    candidates.push(candidate);
  }
  return candidates;
};

export const vote = async (candidateId, account) => {
  return await votingInstance.methods.vote(candidateId).send({ from: account });
};
