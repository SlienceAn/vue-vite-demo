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
        cityList: any[]
        data: any[]
        id: string
        countList?: Store['CountList'][]
    };
    login: {
        loginForm: {
            [key: string]: string
        }
        data: any,
        token: string
        isLoading: boolean
    };
    information: {
        isLoading: boolean
        month: string | Date
        data: T | null
    };
    query:{
        isLoading: boolean
        data: T | null
    };
    inspect: {
        form: any[]
    }
}
