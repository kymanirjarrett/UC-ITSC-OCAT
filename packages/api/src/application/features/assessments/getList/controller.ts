import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { Assessment } from 'src/types';
import { BaseController } from '../../../../infrastructure/http/BaseController';
import { GetAssessmentListUseCase } from './useCase';

@injectable()
export class GetAssessmentListController extends BaseController {
  public constructor(
    private getAssessmentListUseCase: GetAssessmentListUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      const assessments = await this.getAssessmentListUseCase.execute();
      return assessments 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
