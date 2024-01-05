import { MemberVO } from "../../member/vo/member.vo";
import { ProductVO } from "../../product/vo/product.vo";

export interface MypageVO extends MemberVO{
}
export interface CartMasterVO extends ProductVO{
    cartNo: number;
    optionNo: number;
    orderCnt: number;
    memNo: number;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string;   
}
