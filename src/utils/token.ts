class Token {
    token = ''
    clearToken() {
        sessionStorage.removeItem('token')
    }

    setToken(newToken: string) {
        sessionStorage.setItem('token', newToken)
    }

    getToken() {
        return sessionStorage.getItem('token') || ''
    }
}

export const token = new Token()