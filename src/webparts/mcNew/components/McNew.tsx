import * as React from 'react';
import { IMcReactGetItemsProps } from './IMcReactGetItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery'; 
import { IMcGetListItem } from './IMcGetListItem';
import { IMcGetListItemstate } from './IMcGetListItemstate';
import './style.css'; 

interface ImagePath {
  Url?: string ;
}

interface itest{
  Url: string ;
  Description: string ;
 }

export default class McNew extends React.Component<IMcReactGetItemsProps,IMcGetListItemstate> {
  private listItemEntityTypeName: string = undefined;
  
    constructor(props: IMcReactGetItemsProps, state: IMcGetListItemstate) {
      super(props);
   
      this.state = {
        status: this.listNotConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
        items: []
      };
    }
    public componentDidMount() {
    this.readItems();
   }
    public render(): React.ReactElement<IMcReactGetItemsProps> {
      var comp1;var comp2;var comp3;var comp4;
      var com1; var com2;var com3;var com4;
      const items: JSX.Element[] = this.state.items.map((item: IMcGetListItem, i: number): JSX.Element => {
        if(item.Page_x0020_Image != null){
        const test = item.Page_x0020_Image as itest;
        var itemID=item.Id;
        var tabID="tab" +itemID;
        switch (i) {
          case 0:
        com1=item.Comments
        {comp1=(<div id="tab1" className="tabcontent">
         <img src={ test.Url } id="img"/>
        </div>  ) }
         case 1:
         {
          com2=item.Comments
          comp2=(<div id="tab2" className="tabcontent" style={{display:'none'}}>
          <img src={ test.Url } id="img"/>
          </div>  ) ;
          break ;
        }
         case 2:
          {
            com3=item.Comments
            comp3=(<div id="tab3" className="tabcontent" style={{display:'none'}}>
            <img src={ test.Url } id="img"/>
            </div>  ) ;
             break ;
          }
          case 3:
          {
            com4=item.Comments
            comp4=(<div id="tab4" className="tabcontent" style={{display:'none'}}>
            <img src={ test.Url } id="img"/>
            </div>  ) ;
           return (
             <div>
               {comp1}
               {comp2}
               {comp3}
               {comp4}
            <div className="tab">
            <button type="button" className="tablinks tab1 active" onClick={()=>this.openNewsTab(event, 'tab1')}>{com1}</button>
            <button type="button" className="tablinks tab2" onClick={()=>this.openNewsTab(event, 'tab2')}>{com2}</button>
            <button type="button" className="tablinks tab3" onClick={()=>this.openNewsTab(event, 'tab3')}>{com3}</button>
            <button type="button" className="tablinks tab4" onClick={()=>this.openNewsTab(event, 'tab4')}>{com4}</button>
          </div>

           </div>
          );  
        } 
      }  
      }
      });
  
    return (
      <div>
                {items}
          </div>
    );
  }

  openNewsTab(evt, newsName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
       
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(newsName).style.display = "block";

    var selectedTab = document.getElementsByClassName(newsName);
    for(var j = 0; j < selectedTab.length; j++)
    {
      selectedTab[j].className += " active";
    }

}

  private readItems(): void {
    this.setState({
      status: 'Loading all items...',
      items: []
    });
       var reactHandler = this;    
       jquery.ajax({    
        url: `${this.props.siteUrl}/_api/web/lists/getbytitle('TestList')/items`,    
        type: "GET",    
        headers:{'Accept': 'application/json; odata=verbose;'},    
        success: function(resultData) {    
          reactHandler.setState({    
            items: resultData.d.results   
          });
        },    
        error : function(jqXHR, textStatus, errorThrown) {  
          this.setState({
            status: 'Loading all items failed with error: ' ,
            items: []  
          });
        }
    });    
      
  }
  public listNotConfigured(props: IMcReactGetItemsProps): boolean {
    return props.listName === undefined ||
      props.listName === null ||
      props.listName.length === 0;
  }
}