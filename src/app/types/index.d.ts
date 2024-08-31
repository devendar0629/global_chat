export interface ApiResponse {
    success: boolean;
    message?: string;
    error?: {
        message: string;
    };
}
