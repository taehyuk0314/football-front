import { CartMasterVO } from "../../mypage/vo/mypage.vo";
import { ProductVO } from "../../product/vo/product.vo";

export interface OrderMasterVO extends CartMasterVO {
    orderNo: number;
    orderCnt: number;
}