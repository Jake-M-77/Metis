

export const successResponse = <T>(data: T) => {
    return {
        success: true,
        data,
        error: null
    }
}

export const errorResponse = (message: string) => {
    return {
        success: false,
        data: null,
        error: message
    }
}