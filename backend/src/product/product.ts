export type Product = {
    productId: number;
    productName: string;
    productOwnerName: string;
    developers: string[];
    scrumMasterName: string;
    startDate: string;
    methodology: "agile" | "waterfall";
};