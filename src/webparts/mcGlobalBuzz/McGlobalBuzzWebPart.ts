import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './components/McGlobalBuzzWebPart.module.scss';
import * as strings from 'McGlobalBuzzWebPartStrings';
import { IMcGlobalBuzzWebPartProps } from './IMcGlobalBuzzWebPartProps';
import { IMcGlobalBuzzProps } from './components/IMcGlobalBuzzProps';
import McGlobalBuzz from './components/McGlobalBuzz';
import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {McGlobalBuzzItems} from './components/McGlobalBuzzItems';

export default class McGlobalBuzzWebPartWebPart extends BaseClientSideWebPart<IMcGlobalBuzzWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMcGlobalBuzzProps > = React.createElement(
      McGlobalBuzz,
      {
       siteUrl: this.context.pageContext.web.absoluteUrl
      });    
    
    ReactDOM.render(element, this.domElement);
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
