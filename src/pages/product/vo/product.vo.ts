export interface ProductVO extends ProductMasterVO{

}
export interface ProductMasterVO {
    productNo: number;
    productTypeCd: string;
    productNm: string ;
    price: number;
    brandNo: number;
    minProductCount: number;
    maxProductCount: number;
    salePrice: number;
    salePercent: number;
    totalPrice: number;
    
    viewType: string;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string;      
}

export interface BrandMasterVO {
    brandNo: number;
    brandTypeCd: string;
    brandNm: string;

    viewType: string;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string; 
}