import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const { register, handleSubmit } = useForm();


  const onSubmit = async (data) => {

    // Calculate score and riskLevel based on the form responses
    const scoreFields = [
      'prevContact',
      'catAltercations',
      'ownerAltercations',
      'dogPlay',
      'hissStranger',
    ];

    let score = 0;
    scoreFields.forEach((field) => {
      if (data[field] === 'yes') {
        score += 1;
      }
    });

    let riskLevel = 'low';
    if (score >= 5) {
      riskLevel = 'high';
    } else if (score >= 3) {
      riskLevel = 'medium';
    }

    // Add score and riskLevel to the data sent to the backend
    const assessmentScore = {
      catName: data.catName,
      catDateOfBirth: data.catDateOfBirth,
      instrumentType: data.instrumentType,
      score,
      riskLevel,
    };

    console.log('Form Data:', assessmentScore);
    await AssessmentService.submit(assessmentScore);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      
      <Form.Group controlId="instrumentType" className="mt-3">
        <Form.Label className='fs-1'> Cat Behavioral Instrument </Form.Label>
        <Form.Control
          readOnly
          type="hidden"
          defaultValue={1}
          {...register('instrumentType', { required: true })}
        />
      </Form.Group>

      <Form.Group controlId="catName" className="mt-3">
        <Form.Label>Cat's Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter cat's name"
          {...register('catName', { required: true })}
        />
      </Form.Group>

      <Form.Group controlId="catDateOfBirth" className="mt-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          {...register('catDateOfBirth', { required: true })}
        />
      </Form.Group>

      <Form.Group controlId="prevContact" className="mt-3">
        <Form.Label>Previous Contact with the Cat Judicial System</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Yes (Score = 1)"
            value="yes"
            {...register('prevContact', { required: true })}
          />
          <Form.Check
            type="radio"
            label="No (Score = 0)"
            value="no"
            {...register('prevContact', { required: true })}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="catAltercations" className="mt-3">
        <Form.Label>Physical Altercations with other Cats</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="3+ Altercations (Score = 1)"
            value="yes"
            {...register('catAltercations', { required: true })}
          />
          <Form.Check
            type="radio"
            label="0-3 Altercations (Score = 0)"
            value="no"
            {...register('catAltercations', { required: true })}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="ownerAltercations" className="mt-3">
        <Form.Label>Physical Altercations with owner (scratching, biting, etc...)</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="10+ Altercations (Score = 1)"
            value="yes"
            {...register('ownerAltercations', { required: true })}
          />
          <Form.Check
            type="radio"
            label="0-10 Altercations (Score = 0)"
            value="no"
            {...register('ownerAltercations', { required: true })}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="dogPlay" className="mt-3">
        <Form.Label>Plays well with dogs</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="No (Score = 1)"
            value="yes"
            {...register('dogPlay', { required: true })}
          />
          <Form.Check
            type="radio"
            label="Yes (Score = 0)"
            value="no"
            {...register('dogPlay', { required: true })}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="hissStranger" className="mt-3">
        <Form.Label>Hisses at strangers</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Yes (Score = 1)"
            value="yes"
            {...register('hissStranger', { required: true })}
          />
          <Form.Check
            type="radio"
            label="No (Score = 0)"
            value="no"
            {...register('hissStranger', { required: true })}
          />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        Submit
      </Button>

    </Form>
  );
};