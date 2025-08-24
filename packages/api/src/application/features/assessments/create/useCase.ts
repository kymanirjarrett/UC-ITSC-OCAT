import { inject, injectable } from 'inversify';
import { IUseCase } from 'src/types/shared';
import { Assessment, CreateAssessmentDTO } from 'src/types';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class CreateAssessmentUseCase implements IUseCase<CreateAssessmentDTO, Assessment> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(assessmentData: CreateAssessmentDTO): Promise<Assessment> {

    // Validate that the score is between 0 and 5 and that the risk level matches the score calculation
    if (assessmentData.score < 0 || assessmentData.score > 5) 
    {
      throw new Error('Score must be between 0 and 5');
    }
    const expectedRiskLevel = this.calculateRiskLevel(assessmentData.score);
    if (assessmentData.riskLevel !== expectedRiskLevel) 
    {
      throw new Error(`Risk level ${assessmentData.riskLevel} does not match calculated risk level ${expectedRiskLevel}`);
    }

    // Creates the assessment using the repository
    const assessment = await this.assessmentRepository.create(assessmentData);
    return assessment;
  }

  // private helper methods for validation and risk level calculation

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
