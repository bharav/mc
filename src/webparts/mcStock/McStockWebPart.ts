import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './components/McStock';
import * as strings from 'McStockWebPartStrings';
import {IMcStockProps} from './components/IMcStockProps';
import { IMcStockWebPartProps } from './IMcStockWebPartProps';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import McStock from './components/McStock';


export default class McStockWebPart extends BaseClientSideWebPart<IMcStockWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMcStockProps> = React.createElement(McStock, 
        {
          description : this.properties.description
        }
      );
      ReactDOM.render(element, this.domElement);

    // this.domElement.innerHTML = `
    //   <div class="${styles.sampleWp}">
    //     <div class="${styles.container}">
    //       <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
    //         <div class="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
    //           <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
    //           <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
    //           <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
    //           <a href="https://aka.ms/spfx" class="${styles.button}">
    //             <span class="${styles.label}">Learn more</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
