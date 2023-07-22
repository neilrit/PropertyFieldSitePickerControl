import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from '@pnp/sp';

export class SPService {
    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }

    public async getCurrentSiteUsers(siteUrl: string): Promise<any[]> {
        try {
            sp.setup({
                spfxContext: this.context,
                sp: {
                    baseUrl: siteUrl // Set the siteUrl as the baseUrl directly
                }
            });

            const currentWeb = sp.web;
            const users: any[] = await currentWeb.siteUsers.get();
            return users;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async getCurrentSiteGroups(siteUrl: string): Promise<any[]> {
        try {
            sp.setup({
                spfxContext: this.context,
                sp: {
                    baseUrl: siteUrl // Set the siteUrl as the baseUrl directly
                }
            });

            const currentWeb = sp.web;
            const groups: any[] = await currentWeb.siteGroups.get();
            return groups;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
