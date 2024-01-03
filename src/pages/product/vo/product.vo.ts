import { LikeMasterVO } from "../../member/vo/member.vo";

export interface ProductVO extends ProductOptionVO {
    options: Array<ProductOptionVO>;
}
export interface ProductMasterVO extends BrandMasterVO {
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
    
    likeCnt: number;
}

export interface BrandMasterVO extends LikeMasterVO {
    brandNo: number;
    brandTypeCd: string;
    brandNm: string;

    viewType: string;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string; 
}

export interface ProductOptionVO extends ProductMasterVO {
    optionNo: number;
    optionNm: string;
    optionCnt: number;
    viewType: string;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string;
    productNo: number;
}
export interface OrderMasterVO extends ProductVO {
    orderNo: number;
    orderCnt: number;
}