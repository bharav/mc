import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from 'office-ui-fabric-react'; 
import styles from './McGlobalBuzzWebPart.module.scss';
import {IMcGlobalBuzzProps} from './IMcGlobalBuzzProps';
import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
import * as jquery from 'jquery';
import {McGlobalBuzzItems} from './McGlobalBuzzItems';

export interface IMcGlobalBuzzState{
        items: McGlobalBuzzItems[];
}

export default class McGlobalBuzz extends React.Component<IMcGlobalBuzzProps, IMcGlobalBuzzState>{
    public constructor(props: IMcGlobalBuzzProps, state: IMcGlobalBuzzState){
        super(props);
        this.state={
            items: []
        };
    }

    public componentDidMount(){
        debugger;
        var reacthandler = this;
        jquery.ajax({
            type: "GET",
            url: `${this.props.siteUrl}/_api/search/query?querytext=%27ContentTypeId:0x01100059FA0D78CBE0804585D556912997D01C%27&selectproperties=%27Title,Author,PublishedDate%27`,
            headers:{'Accept': 'application/json; odata=verbose;'},    
            success: function (resultData){
                debugger;
                var primaryResult = resultData.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;               
                //  debugger;
                //     if (!jquery.trim(resultData)){   
                //         alert("What follows is blank: " + resultData);
                //     }
                //     else{ 
                //         alert("What follows is not blank: " + resultData);  
                //         alert("What follows is not blank: " + resultData);
                //     }
                reacthandler.setState({
                    items: primaryResult
                });                
            },
            error : function(jqXHR, textStatus, errorThrown){

            }
        });      
    }

    public render():React.ReactElement<IMcGlobalBuzzProps>{

        return (   
            <div className={styles.listItemsForm}>  
                <div className={styles.Table}>  
                    <ul>  
                        {this.state.items.map(function(item,key){  
                            return (<li className={styles.Row} key={key}> 
                               <div className={styles.Cell}>
                                   <td>{item["Cells"].results[2].Value}</td><br/>
                                   <td>{item["Cells"].results[3].Value}</td>
                               </div>
                              
                                </li>);                           
                            })}  
                    </ul>            
                </div>      
            </div>       
        );
    }

}

