import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';
import './Assessment.css';

export const NewAssessment = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    // Calculate score and riskLevel based on the form responses
    const scoreFields = [
      `prevContact`,
      `catAltercations`,
      `ownerAltercations`,
      `dogPlay`,
      `hissStranger`,
    ];

    let score = 0;
    scoreFields.forEach((field) => {
      if (data[field] === `yes`) {
        score += 1;
      }
    });

    let riskLevel = `low`;
    if (score >= 5) {
      riskLevel = `high`;
    } else if (score >= 3) {
      riskLevel = `medium`;
    }

    // Add score and riskLevel to the data sent to the backend
    const assessmentScore = {
      catDateOfBirth: data.catDateOfBirth,
      catName: data.catName,
      instrumentType: data.instrumentType,
      riskLevel,
      score,
    };

    console.log(`Form Data:`, assessmentScore);
    await AssessmentService.submit(assessmentScore);
  };

  return <Form className="assessmentForm mt-4" onSubmit={handleSubmit(onSubmit)}>

    <div style={{ marginLeft: `20px` }}>

      <Form.Group controlId="instrumentType" className="mt-3">
        <Form.Label className="fs-1" style={{ fontWeight: `bold` }}> Cat Behavioral Instrument </Form.Label>
        <Form.Control
          readOnly
          type="hidden"
          defaultValue={1}
          {...register(`instrumentType`, { required: true })}
        />
      </Form.Group>

      <div style={{ display: `flex` }}>

        <Form.Group controlId="catName" className="mt-3" style={{ width: `30%` }}>
          <Form.Label>Cat's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter cat's name"
            {...register(`catName`, { required: true })}
          />
        </Form.Group>

        <Form.Group controlId="catDateOfBirth" className="mt-3" style={{ marginLeft: `40px`, width: `30%` }}>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            {...register(`catDateOfBirth`, { required: true })}
          />
        </Form.Group>

      </div>

      <Form.Group controlId="prevContact" className="mt-4">
        <Form.Label>Previous Contact with the Cat Judicial System</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Yes"
            value="yes"
            {...register(`prevContact`, { required: true })}
          />
          <Form.Check
            type="radio"
            label="No"
            value="no"
            {...register(`prevContact`, { required: true })}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="catAltercations" className="mt-4">
        <Form.Label>Physical Altercations with other Cats</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="3+ Altercations"
            value="yes"
            {...register(`catAltercations`, { required: true })}
          />
          <Form.Check
            type="radio"
            label="0-3 Altercations"
            value="no"
            {...register(`catAltercations`, { required: true })}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="ownerAltercations" className="mt-4">
        <Form.Label>Physical Altercations with owner (scratching, biting, etc...)</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="10+ Altercations"
            value="yes"
            {...register(`ownerAltercations`, { required: true })}
          />
          <Form.Check
            type="radio"
            label="0-10 Altercations"
            value="no"
            {...register(`ownerAltercations`, { required: true })}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="dogPlay" className="mt-4">
        <Form.Label>Plays well with dogs</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="No"
            value="yes"
            {...register(`dogPlay`, { required: true })}
          />
          <Form.Check
            type="radio"
            label="Yes"
            value="no"
            {...register(`dogPlay`, { required: true })}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="hissStranger" className="mt-4">
        <Form.Label>Hisses at strangers</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Yes"
            value="yes"
            {...register(`hissStranger`, { required: true })}
          />
          <Form.Check
            type="radio"
            label="No"
            value="no"
            {...register(`hissStranger`, { required: true })}
          />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" className=" assessmentSubmit mt-4" style={{ marginBottom: `10px`, padding: `10px 20px` }}>
        Submit
      </Button>

    </div>

  </Form>;
};
