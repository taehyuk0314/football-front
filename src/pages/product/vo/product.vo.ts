import { LikeMasterVO } from "../../member/vo/member.vo";

export interface ProductVO extends ProductMasterVO{
    isLiked: boolean;
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