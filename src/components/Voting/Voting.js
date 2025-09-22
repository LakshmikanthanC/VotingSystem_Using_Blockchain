import React, { useState, useEffect } from 'react';
import { initWeb3, initContract, getCandidates, vote } from '../../blockchain';

function Voting() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = await initWeb3();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const contract = await initContract();
      const candidates = await getCandidates();
      setCandidates(candidates);
    };
    loadBlockchainData();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) {
      alert('Please select a candidate before voting.');
      return;
    }
    try {
      const receipt = await vote(selectedCandidate, account);
      setTransactionHash(receipt.transactionHash);
      setVoteConfirmed(true);
    } catch (error) {
      alert('Voting failed: ' + error.message);
    }
  };

  return (
    <div className="voting-container" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Cast Your Vote</h2>
      {!voteConfirmed ? (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {candidates.map((candidate) => (
              <li key={candidate.id} style={{ marginBottom: '1rem' }}>
                <label>
                  <input
                    type="radio"
                    name="candidate"
                    value={candidate.id}
                    onChange={() => setSelectedCandidate(candidate.id)}
                  />
                  {' '}{candidate.name}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleVote} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
            Submit Vote
          </button>
        </>
      ) : (
        <div>
          <h3>Thank you for voting!</h3>
          <p>Your transaction hash:</p>
          <code style={{ wordBreak: 'break-all' }}>{transactionHash}</code>
        </div>
      )}
    </div>
  );
}

export default Voting;
