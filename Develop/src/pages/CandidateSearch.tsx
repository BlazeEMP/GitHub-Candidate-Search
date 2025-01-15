import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
    // use this to store our list of candidates from searchGithub function as an array to cycle through
    const [users, setUsers] = useState<string[]>([]);
    // use this to dynamcially access the current candidate and load the next candidate from the user array loaded above
    const [userIndex, setUserIndex] = useState(0);
    const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

    // get the list of candidates from github, this data will be missing name, location, email, company
    // we will use this data to get the complete data of the candidate by searching by login
    const listCandidates = async () => {
        try {
            const response = await searchGithub();
            if (!response) {
                console.warn('No candidates found during initial search.');
                return;
            }
            setUsers(response.map((user: Candidate) => user.login as string));
            const firstCandidate = await searchGithubUser(response[0].login);
            setCurrentCandidate(firstCandidate);
        } catch (error) {
            console.error('Error getting users from GitHub:', error);
        }
    };

    useEffect(() => {
        console.log('use effect for listCandidates')
        listCandidates();
        console.log('Users:', users); // --------------------------------------------------------------------------------
    }, [window.onbeforeunload]);

    // use the userIndex to get the next candidate from the list of candidates so we can search them by login to display all of their information
    useEffect(() => {
        const getNextUser = async () => {
            try {
                const getUser = await searchGithubUser(users[userIndex]);

                if (getUser.message === "Not Found") {
                    console.warn('No user found in getUser useEffect:', users[userIndex]);
                    return;
                }
                setCurrentCandidate(getUser);
            } catch (error) {
                console.error('Error fetching user in searchGithubHuser():', error);
            }
        };
        getNextUser();
        //console.log(users); // --------------------------------------------------------------------------------
    }, [userIndex]);

    // we're saving to local storage so we can access the candidates later on another page, 
    // we're also iterating the userIndex to get the next candidate since a decision was made here
    const saveOnClick = () => {
        const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
        const newCandidateList = [...storedCandidates, currentCandidate];
        localStorage.setItem('savedCandidates', JSON.stringify(newCandidateList));
        setUserIndex(userIndex + 1);
        //console.log(users); // --------------------------------------------------------------------------------
    };

    // when denying we don't need to save so we can just progress to the next candidate by iterating the userIndex
    const denyOnClick = () => {
        setUserIndex(userIndex + 1);
        //console.log(users); // --------------------------------------------------------------------------------
    };

    return (
        <div>
            <h1>Candidate Search</h1>
            {currentCandidate ? (
                <div className="candidate-card">
                    {/* if the current candidate can't be searched by user they may have no info available, 
                    we can display an error to differentiate finishing the list and having a possibly deleted user */}
                    {currentCandidate.login ? (
                        <>
                            <img src={currentCandidate.avatar_url} alt={`${currentCandidate.name}'s avatar`} />
                            <h2>Current Candidate: {currentCandidate.login}</h2>
                            <h3>{currentCandidate.name || 'No Name Provided'}</h3>
                            <p>Location: {currentCandidate.location || 'Unknown'}</p>
                            <p>Email: {currentCandidate.email || 'No email provided'}</p>
                            <p>Company: {currentCandidate.company || 'Not Available'}</p>
                            <a href={currentCandidate.html_url} target="_blank" rel="noreferrer">
                                Visit GitHub Profile
                            </a>
                        </>
                    ) : (
                        <p>No candidate data found at users URL, user may not exist anymore :(</p>
                    )}
                    <div className='two-buttons'>
                        <button onClick={saveOnClick}>+</button>
                        <button onClick={denyOnClick}>-</button>
                    </div>
                </div>
            ) : (
                <p>No more candidates to display. Try a new search.</p>
            )}
        </div>
    );
};

export default CandidateSearch;