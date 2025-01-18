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

    return (
        <div>
            <h1>Saved Candidates</h1>
            {savedCandidates.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Visit Page</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedCandidates.map((candidate) => (
                            <tr key={candidate.login}>
                                <td><img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width="50" /></td>
                                <td>{candidate.name || 'No Name Provided'}<br />
                                    ({candidate.login})</td>
                                <td>{candidate.location || 'No location provided'}</td>
                                <td>{candidate.email || 'No Email Provided'}</td>
                                <td>{candidate.company || 'Not Available'}</td>
                                <td><a href={candidate.html_url} target="_blank" rel="noreferrer">Visit GitHub</a></td>
                                <td><button onClick={() => removeOnClick(candidate.login)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No saved candidates, get browsing!</p>
            )}
        </div>
    );
};

export default SavedCandidates;