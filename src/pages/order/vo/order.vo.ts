import { List } from "lodash";
import { CartMasterVO } from "../../mypage/vo/mypage.vo";
import { ProductMasterVO, ProductVO } from "../../product/vo/product.vo";

export interface OrderVO extends OrderMasterVO { 

}

export interface OrderMasterVO extends CartMasterVO {
	orderNo: number;
	orderType: string;
	orderCnt: number;
	orderPrice: number;
	paymentType: string;
	paymentTotalPrice: number;
	addr: string;
	addrDetail: string;
	viewType: string;
	regUser: number;
	regDt: string;
	updUser: number;
	updDt: string;
	products: Array<OrderProductVO>;
    
}

export interface OrderProductVO extends ProductVO {
	seq: number;
	orderNo: number;
	optionNo: number;
	orderCnt: number;
	optionNm: string;
	productNm: string;
	discountPrice: number;
	discountRate: number;
	totalPrice: number;
	viewType: string;
	regUser: number;
	regDt: string;
	updUser: number;
	updDt: string;    
}