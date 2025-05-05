export interface registerInterface {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface registerRes {
    status: boolean
    message: string
    data: {
        _id: string,
        name: string,
        email: string,
        verified: boolean
    }
}

export interface loginInterface {
    email: string,
    password: string
}

export interface IBlog {
    _id?: string;
    title: string;
    content: string;
    authorId?: {
        _id: string;
        name: string;
        email: string;
    };
    image?: File | null;
    createdAt?: string;
}