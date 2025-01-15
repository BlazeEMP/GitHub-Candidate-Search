import type { Candidate } from "../interfaces/Candidate.interface";
import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  // this will allow us to access the savedCandidates dynamically 
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
      setSavedCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
    </>
  );
};

export default SavedCandidates;
