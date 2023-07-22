import * as React from 'react';

import { IPropertyFieldSitePickerControlProps } from './IPropertyFieldSitePickerControlProps';
import { SPService } from '../../../Service/SPService';
import { Label, Pivot, PivotItem } from 'office-ui-fabric-react';
import * as strings from 'PropertyFieldSitePickerControlWebPartStrings';
import { IPropertyFieldSitePickerControlState } from './IPropertyFieldSitePickerControlState';    

export default class PropertyFieldSitePickerControl extends React.Component<IPropertyFieldSitePickerControlProps, IPropertyFieldSitePickerControlState> {
  
  private _spService: SPService;    
    
  constructor(props: IPropertyFieldSitePickerControlProps) {    
    super(props);    
    this.state = {    
      siteUsres: [],    
      siteGroups: [],    
    }    
    this._spService = new SPService(this.props.context);    
  }    
    
  public componentDidMount() {   
    console.log(this.state.siteUsres); 
    this.getSiteGroups();    
    this.getSiteUsres();    
  }    
    
  public async getSiteUsres() {
    if (this.props.site && this.props.site.length) {
      let siteUrl: string = this.props.site[0].url ? this.props.site[0].url : "";
      let users = await this._spService.getCurrentSiteUsers(siteUrl);
      this.setState({ siteUsres: users }); // Corrected from 'siteUsres' to 'siteUsers'
    }
  }
  
  public async getSiteGroups() {    
    if (this.props.site && this.props.site.length) {    
      let siteUrl = (this.props.site[0].url)?this.props.site[0].url:"";    
      let groups = await this._spService.getCurrentSiteGroups(siteUrl);    
      this.setState({ siteGroups: groups });    
    }    
  }    
    
  public componentDidUpdate(prevProps: IPropertyFieldSitePickerControlProps) {    
    if (prevProps.site !== this.props.site) {    
      this.getSiteGroups();    
      this.getSiteUsres();    
    }    
  }    
    

  public render(): React.ReactElement<IPropertyFieldSitePickerControlProps> {
    return (    
      <React.Fragment>    
        {    
          this.props.site && this.props.site.length ?    
            <React.Fragment>    
              <Label>Selected Site: {this.props.site[0].title}</Label>    
              <Pivot aria-label="Count and Icon Pivot Example">    
                <PivotItem headerText={strings.SiteUserLabel}>    
                  {this.state.siteUsres.map((value) =>    
                    <Label>{value.Title}</Label>    
                  )}    
                </PivotItem>    
                <PivotItem headerText={strings.SiteUserLabel}>    
                  {this.state.siteGroups.map((value) =>    
                    <Label>{value.Title}</Label>    
                  )}    
                </PivotItem>    
              </Pivot>    
            </React.Fragment>    
            : <Label>{strings.ErrorMessageLabel}</Label>}    
      </React.Fragment>    
    );   
  }
}
