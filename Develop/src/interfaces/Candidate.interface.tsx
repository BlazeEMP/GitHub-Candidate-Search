interface Candidate {
    // any null values are items not required to be public or entered at all on GitHub
    // using searchGithub from /api will also not provide the name, location, email, or company regardless of if they provide it in a user search,
    // meaning allowing these to be null will let this work with the searchGithub function without issue either without extending the interface to make them optional
    readonly login: string;
    readonly name: string | null;
    readonly email: string | null;
    readonly avatar_url: string;
    readonly html_url: string;
    readonly company: string | null;
    readonly location: string | null;
}

export type { Candidate };