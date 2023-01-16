import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "src/app.module";
import { SWAGGER_NAME } from "src/common/swagger/constant";
const INITIAL_PATTERN = '/\.';
const FINAL_PATTERN = '.$/';
const DOMAIN_NAME = SWAGGER_NAME.toLowerCase() + '.com';
class CustomConfigs {
    config: ConfigService;
    origin: RegExp;
    constructor(private app: NestExpressApplication) {
        this.config = app.get(ConfigService);
        this.origin = new RegExp(INITIAL_PATTERN + DOMAIN_NAME + FINAL_PATTERN);

    }
    get port(): number {
        return this.config.get<number>('PORT')
    }
    get baseUrl(): string {
        return this.config.get<string>('BASE_URL')
    }
}

export default CustomConfigs;