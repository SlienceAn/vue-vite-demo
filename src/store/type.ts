type ApiResponse = {
    success: boolean;
    message: string;
    [key: string]: unknown;
}
export type Store<T extends ApiResponse = ApiResponse> = {
    CountList: {
        title: string
        type: string
        message: number
        icon: string
        color: string
    };
    global: {
        menuCollapse: boolean
        city: string
        cityList: string[]
        countList: Store['CountList'][]
    };
    login: {
        loginForm: {
            [key: string]: string
        }
        success: boolean,
        userName: string,
        message: string,
        isPremission: boolean,
        data: T | null,
        token: string
    };
    information: {
        isLoading: boolean
        status: string
        data: T | null
        queryList: {
            [key: string]: string
        }
    };
    inspect: {
        form: any[]
    }
}
