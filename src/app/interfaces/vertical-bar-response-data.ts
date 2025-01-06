export interface VerticalBarResponseData {
    status: string;
        message: string;
        data: {
            verticalBarData: VerticalBarData[]
        };
        errors: [];
}

export interface VerticalBarData {
    month_name: string,
    total_price: number
}

