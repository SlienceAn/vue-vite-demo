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
        grids: 'two' | 'four'
    };
    query: {
        isLoading: boolean
        data: T | null
        statusValue: string
        statusList: any[]
        form: {
            usersname: string,
            address: string,
            status: string,
            startDate: string,
            longitude: number,
            latitude: number,
            item: string[]
        }
    };
    inspect: {
        form: any[]
    }
}
