import { inject, injectable } from 'inversify';
import { IUseCase } from 'src/types/shared';
import { Assessment, CreateAssessmentDTO } from 'src/types';
import { IAssessmentRepository } from '../../../contracts';
import express from 'express';
import { create } from 'domain';


// import {CreateAssessmentUseCase} from './useCase';

// const router = express.Router();

// router.post('/assessments', async (req, res) => {
//   try {
//     const createAssessmentUseCase = container.get(CreateAssessmentUseCase);
//     const assessmentData = req.body;
//     const result = await createAssessmentUseCase.execute(assessmentData);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// export default router;
@injectable()
export class CreateAssessmentUseCase implements IUseCase<CreateAssessmentDTO, Assessment> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}



  public async execute(assessmentData: CreateAssessmentDTO): Promise<Assessment> {

    // TODO: Implement business validation logic here
    // HINT: Validate that the score is between 0 and 5
    // HINT: Validate that the risk level matches the score calculation

    if (assessmentData.score < 0 || assessmentData.score > 5) 
    {
      throw new Error('Score must be between 0 and 5');
    }

    const expectedRiskLevel = this.calculateRiskLevel(assessmentData.score);

    if (assessmentData.riskLevel !== expectedRiskLevel) 
    {
      throw new Error(`Risk level ${assessmentData.riskLevel} does not match calculated risk level ${expectedRiskLevel}`);
    }

    // TODO: Create the assessment using the repository
    // HINT: use this.assessmentRepository.create(assessmentData)

    const assessment = await this.assessmentRepository.create(assessmentData);

    return Promise.reject(new Error(`CreateAssessmentUseCase.execute() not implemented yet`));
  }

  // TODO: Add private helper methods for validation and risk level calculation

  private calculateRiskLevel(score: number): string {
    if 
    (score <= 2) {
      return 'low';
    } 
    else if (score <= 4) {
      return 'medium';
    } 
    else {
      return 'high';
    }
  }
}
