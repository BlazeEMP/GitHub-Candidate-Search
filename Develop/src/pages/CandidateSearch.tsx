import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = ({ savedCandidates, setSavedCandidates }: CandidateProps) => {
    const [users, setUsers] = useState<Candidate[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);


    // Fetch the initial set of candidates when the component mounts
    useEffect(() => {
        const searchCandidates = async () => {
            try {
                const response = await searchGithub(); // Fetch random users
                if (response && response.length > 0) {
                    setUsers(response);
                } else {
                    console.log('No candidates found.');
                }
            } catch (error) {
                console.error('Error getting users from GitHub:', error);
            }
        };

        searchCandidates();
    }, []);
  
    // Save the current candidate and move to the next one
    const saveProfile = () => {
      const candidate = users[currentIndex];
      if (!savedCandidates.some((saved: Candidate) => saved.login === candidate.login)) {
        setSavedCandidates([...savedCandidates, candidate]);
      }
      setCurrentIndex((prev) => (prev +1) % users.length);
    };

    return (
        <>
            <h1>Candidate Search</h1>;
        </>
    );
};

export default CandidateSearch;
