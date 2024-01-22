import { useEffect, useState } from "react";
import { DataTableOVO } from "./vo/DataTableOVO.vo";
import axios from "axios";
import _ from "lodash";
import { Button } from "@mui/material";

export interface Props {
    dataUrl?: string;
    dataParams?: any;
    pageLength?: number;
    noDataMessage?: string;
    content: JSX.Element;
    updateItem: any;
}
const CommonReadMore =(
    {
        dataUrl,
        dataParams,
        pageLength = 20,
        noDataMessage = "없성",
        content,
        updateItem        
      }: Props
) => {
    const [data, setData] = useState({ items: [] as Array<any>, recordsTotal: 0, pageNum: 0 } as DataTableOVO<any>);
    const reset =()  => {
        setData({ items: [] as Array<any>, recordsTotal: 0, pageNum: 0 });
    }
    
    const getData = (readmore = false) =>{
        if(!dataUrl) {
            return;
        }
        const params = _.clone(dataParams) || {};
        params.pageStart = data.pageNum + 1;
        params.pageLength = pageLength || 20;

        axios.get(dataUrl, { params: params }).then((r) => {
            let items = r.data.items;
            if (readmore) {
                items = data.items.concat(r.data.items);
            }
            setData({items:items, recordsTotal: r.data.recordsTotal, pageNum: r.data.pageNum});
            updateItem(items) ;
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
                            data.recordsTotal > data.items.length &&
                            <div>
                                <Button onClick={()=>{getData(true)}}>
                                <span>더보기</span>
                                </Button>
                            </div>
                        }
                    </>:
                    <>
                        { noDataMessage }
                    </>
                }
            </div>
    )
}
export default CommonReadMore;
