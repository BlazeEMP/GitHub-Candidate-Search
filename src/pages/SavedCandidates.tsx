import type { Candidate } from "../interfaces/Candidate.interface";
import { useState, useEffect } from 'react';

const SavedCandidates = () => {
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const storedCandidates = localStorage.getItem('savedCandidates');
        console.log(storedCandidates);
        if (storedCandidates) {
            setSavedCandidates(JSON.parse(storedCandidates));
        }
    }, []);

    const removeOnClick = (username: string) => {
        // this will check if a username matches the username of the candidate we want to remove, ONLY if it matches will it not be included in the new mapped array
        const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== username);
        setSavedCandidates(updatedCandidates);
        localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    };

    return (
        <div>
            <h1>Saved Candidates</h1>
            <span>(Click the username to visit their GitHub profile)</span>
            {savedCandidates.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Bio</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedCandidates.map((candidate) => (
                            <tr key={candidate.login}>
                                <td><img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width="50" /></td>
                                <td>{candidate.name || 'No Name Provided'}<br />
                                <a href={candidate.html_url} target="_blank" rel="noreferrer">({candidate.login})</a></td>
                                <td>{candidate.location || 'No location provided'}</td>
                                <td>{candidate.email || 'No Email Provided'}</td>
                                <td>{candidate.company || 'Not Available'}</td>
                                <td>{candidate.bio}</td>
                                <td><button onClick={() => removeOnClick(candidate.login)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No saved candidates, get ing!</p>
            )}
        </div>
    );
};

export default SavedCandidates;