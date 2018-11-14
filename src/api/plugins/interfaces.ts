import * as Hapi from 'hapi';

export interface IPlugin {
    register(server : Hapi.Server) : Promise < void >;
    info() : IPluginInfo;
}

export interface IPluginInfo {
    name : string;
    version : string;
}