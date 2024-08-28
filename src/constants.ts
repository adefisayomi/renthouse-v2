
export const __dev = process.env.NODE_ENV === 'development'

export const errorMessage = (message: string) => {
    const payload = {
        success: false,
        data: null,
        message
    }
    if (__dev) console.log(payload)
    return payload
}

export const FLUTTERWAVE_PUBLIC_KEY= process.env.FLUTTERWAVE_PUBLIC_KEY!
export const auth_token = "auth-token"