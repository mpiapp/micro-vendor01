import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { companyDetailAddDTO } from './dto/company.detail.add.dto';
import { Company, CompanyDocument } from './schema/company.schema';
import { TextGenerator  } from '../utils/text.generator';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>) {}

    async addCompanyDetail(companyDetailAddDTO: companyDetailAddDTO): Promise<Company> {
        const companyDetail = companyDetailAddDTO;
        companyDetail.company_code = TextGenerator.companyCode(companyDetail.legal_name);
	
        try {
            return await this.companyModel.create(companyDetail);
        }
        catch(e) {
            return e;
        }
    }
}
