import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from 'office-ui-fabric-react'; 
import styles from './McStock.module.scss'; 
import * as jquery from 'jquery';
import {IMcStockProps} from './IMcStockProps';

export interface IMcStockState{
    items: [
        {
            "AssetName":string,
            "todaysPrice": number,
            "priceDifference":number,
            "priceIncrease": boolean
        }
    ];
}

export default class McStock extends React.Component<IMcStockProps, IMcStockState>{
    public constructor(props: IMcStockProps, state: IMcStockState){
        debugger;
        super(props);
        this.state = { 
        items: [
            {
                "AssetName":'',
                "todaysPrice": null,
                "priceDifference":null,
                "priceIncrease": null
            }
        ]};
    }

    public componentDidMount(){
        var reacthandler = this;
        jquery.ajax({
            url: `http://localhost:3000/stockDetails?`,
            type: "GET",
            headers: {'Accept': 'application/json; odata=verbose;'},
            success: function (resultData){
                //  debugger;
                //     if (!jquery.trim(resultData)){   
                //         alert("What follows is blank: " + resultData);
                //     }
                //     else{ 
                //         alert("What follows is not blank: " + resultData);  
                //         alert("What follows is not blank: " + resultData);
                //     }
                reacthandler.setState({
                    items: resultData
                });
                
                ///POST QUERY
                // jquery.ajax({
                // url: `https://m365x620367.sharepoint.com/_api/web/lists/GetByTitle('StockList')/items`,
                // type:'POST',
                // data: JSON.stringify
                // ({
                //     _metadata:
                //     {
                //         type: "SP.Data.TestListItem"
                //     },
                //     AssetName: resultData.AssetName,
                //     todaysPrice:resultData.todaysPrice,
                //     priceDifference:resultData.priceDifference
                // }),
                // headers:
                // {
                //     "Accept": "application/json;odata=verbose",  
                //     "Content-Type": "application/json;odata=verbose",  
                //     "X-RequestDigest": jquery("#__REQUESTDIGEST").val(),  
                //     "X-HTTP-Method": "POST" 
                // },
                // success: function()
                // {
                //     debugger;
                //     console.log("Items added");
                // },
                // error: function(jqXHR, textStatus, errorThrown){

                // }
                // });
            },
            error : function(jqXHR, textStatus, errorThrown){

            }
        });

        
    }

    public render(): React.ReactElement <IMcStockProps>{
    return (   
            <div className={styles.listItemsForm}>  
                <div className={styles.Table}>  
                    <ul>  
                            {this.state.items.map(function(item,key){  
                            if(item.priceIncrease){
                                debugger;
                            return (<li className={styles.Row} key={key}>  
                                <div className={styles.Cell}>{item.AssetName}</div> 
                                <div className={styles.Cell}>{item.todaysPrice}</div> 
                                <div className={styles.highColor}>+{item.priceDifference}%</div></li>);  
                            }
                            else {
                            return (<li className={styles.Row} key={key}>  
                                <div className={styles.Cell}>{item.AssetName}</div> 
                                <div className={styles.Cell}>{item.todaysPrice}</div> 
                                <div className={styles.lowColor}>-{item.priceDifference}%</div></li>);  
                            }
                            })}  
                    </ul>            
                </div>      
            </div>       
        );
    }
}



