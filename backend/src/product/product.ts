import { Matches, IsDefined, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class Product {
    productId: number;
    productName: string;
    productOwnerName: string;
    developers: string[];
    scrumMasterName: string;
    startDate: string;
    methodology: 'agile' | 'waterfall';

    constructor(
        productId: number,
        productName: string,
        productOwnerName: string,
        developers: string[],
        scrumMasterName: string,
        startDate: string,
        methodology: 'agile' | 'waterfall'
    ) {
        this.productId = productId;
        this.productName = productName;
        this.productOwnerName = productOwnerName;
        this.developers = developers;
        this.scrumMasterName = scrumMasterName;
        this.startDate = startDate;
        this.methodology = methodology;
    }
}

export class ProductDetails {
    @IsDefined()
    @IsString()
    @MinLength(1)
    @Expose()
    productName: string;
    @IsDefined()
    @IsString()
    @MinLength(1)
    @Expose()
    productOwnerName: string;
    @IsDefined()
    @MinLength(1, {
        each: true,
    })
    @Expose()
    developers: string[];
    @IsDefined()
    @MinLength(1)
    @IsString()
    @Expose()
    scrumMasterName: string;
    @IsDefined()
    @IsString()
    @MinLength(1)
    @Expose()
    @Matches(RegExp(/^\d{4}\/\d{2}\/\d{2}$/))
    startDate: string;
    @IsDefined()
    @IsString()
    @MinLength(1)
    @Expose()
    @Matches(RegExp('agile|waterfall'))
    methodology: 'agile' | 'waterfall';

    constructor(
        productName: string,
        productOwnerName: string,
        developers: string[],
        scrumMasterName: string,
        startDate: string,
        methodology: 'agile' | 'waterfall'
    ) {
        this.productName = productName;
        this.productOwnerName = productOwnerName;
        this.developers = developers;
        this.scrumMasterName = scrumMasterName;
        this.startDate = startDate;
        this.methodology = methodology;
    }
}
