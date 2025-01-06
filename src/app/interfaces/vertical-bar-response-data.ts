export interface VerticalBarResponseData {
    status: string;
        message: string;
        data: VerticalBarData[]; // `data` is an array, not an object with `verticalBarData`
        errors: [];
}

export interface VerticalBarData {
    month_name: string,
    total_price: number
}

