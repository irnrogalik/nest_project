export interface AccessToken {
    // eslint-disable-next-line camelcase
    access_token: string;
}

export interface JwtUserPayload {
    id: string;
    role: string;
}
