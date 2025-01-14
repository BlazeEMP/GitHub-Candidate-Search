interface Candidate {
    readonly id: number;
    readonly login: string;
    readonly name: string | null;
    readonly email: string | null;
    readonly avatar_url: string;
    readonly html_url: string;
    readonly company: string | null;
    readonly location: string | null;
}

export type { Candidate };