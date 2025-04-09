import { arrayModulMock, Module } from "../../domain/module";

class ModuleService {
    async getModules() : Promise<Module[]>  {
        return arrayModulMock
    }
}

export const moduleService = new ModuleService()