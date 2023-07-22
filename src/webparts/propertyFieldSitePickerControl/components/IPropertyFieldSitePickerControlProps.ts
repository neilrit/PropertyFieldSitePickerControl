import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyFieldSite } from "@pnp/spfx-property-controls";


export interface IPropertyFieldSitePickerControlProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  site: IPropertyFieldSite[];
  context:WebPartContext;
}
