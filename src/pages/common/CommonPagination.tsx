import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DataTableOVO } from "./vo/DataTableOVO.vo";
import axios from "axios";
import _ from "lodash";
import { Button, Pagination } from "@mui/material";

export interface Props {
    dataUrl?: string;
    dataParams?: any;
    pageLength?: number;
    noDataMessage?: string;
    content: JSX.Element;
    updateItem: any;
}

const CommonPagination =forwardRef(
    ({
        dataUrl,
        dataParams,
        pageLength = 10,
        noDataMessage = "없성",
        content,
        updateItem        
      }: Props,ref
    ) => {
    useImperativeHandle(ref, () => ({
        // 부모 컴포넌트에서 사용할 함수를 선언
        reset
      }))
     
    const [data, setData] = useState({ items: [] as Array<any>, recordsTotal: 0, pageNum: 0 } as DataTableOVO<any>);
    const reset =()  => {
        data.pageNum =0;
        data.recordsTotal =0;
        getData();
    }
    
    const getData = (readmore = false) =>{
        if(!dataUrl) {
            return;
        }
        const params = _.clone(dataParams) || {};
        params.pageStart = data.pageNum + 1;
        params.pageLength = pageLength || 20;

        axios.get(dataUrl, { params: params }).then((r) => {
            console.log(r)
            setData({items:r.data.items, recordsTotal: r.data.recordsTotal, pageNum: r.data.pageNum});
            updateItem(r.data.items) ;
        })
    }
    useEffect(()=>{
        // setData({...data, recordsTotal: 0,pageNum: 0});
        getData();
    },[dataUrl,dataParams])   

    return (
            <div>
                
                {
                    data && data.items && data.items.length?
                    <>
                        { content }
                        {
                            <Pagination count={10} /> 
                        }
                    </>:
                    <>
                        { noDataMessage }
                    </>
                }
            </div>
    )
})
export default CommonPagination;
